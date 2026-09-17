import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/use-auth";
import { locationService, DetectedServiceZone } from "@/services/location.service";
import { profileService } from "@/services/profile.service";

const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface LocalStorageZone {
  user_latitude?: number;
  user_longitude?: number;
  service_zone_id?: string;
  service_zone_name?: string;
  service_zone_slug?: string;
  last_location_updated?: string;
}

export function useCurrentServiceZone() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { isAuthenticated, token, role } = useAuth();

  const [currentZone, setCurrentZone] = useState<DetectedServiceZone | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isNotServiceable, setIsNotServiceable] = useState(false);

  // Helper to read zone from local storage
  const getStoredZone = useCallback((): LocalStorageZone | null => {
    if (typeof window === "undefined") return null;
    try {
      const id = localStorage.getItem("service_zone_id");
      const name = localStorage.getItem("service_zone_name");
      const slug = localStorage.getItem("service_zone_slug");
      const lat = localStorage.getItem("user_latitude");
      const lng = localStorage.getItem("user_longitude");
      const updated = localStorage.getItem("last_location_updated");

      if (id && name && slug) {
        return {
          service_zone_id: id,
          service_zone_name: name,
          service_zone_slug: slug,
          user_latitude: lat ? parseFloat(lat) : undefined,
          user_longitude: lng ? parseFloat(lng) : undefined,
          last_location_updated: updated || undefined,
        };
      }
    } catch (e) {
      console.error("Failed to read from localStorage", e);
    }
    return null;
  }, []);

  // Helper to save zone to local storage
  const saveZoneToStorage = useCallback((zone: DetectedServiceZone, lat?: number, lng?: number) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("service_zone_id", zone.id);
      localStorage.setItem("service_zone_name", zone.name);
      localStorage.setItem("service_zone_slug", zone.slug);
      localStorage.setItem("last_location_updated", new Date().toISOString());
      if (lat !== undefined) localStorage.setItem("user_latitude", lat.toString());
      if (lng !== undefined) localStorage.setItem("user_longitude", lng.toString());
    } catch (e) {
      console.error("Failed to write to localStorage", e);
    }
  }, []);

  // Set zone manually
  const setManualZone = useCallback((zone: { id: string; name: string; slug: string }) => {
    const newZone: DetectedServiceZone = {
      id: zone.id,
      name: zone.name,
      slug: zone.slug,
      city: zone.name,
    };
    setCurrentZone(newZone);
    saveZoneToStorage(newZone);
    setIsNotServiceable(false);

    // Redirect to the new zone page if we are on root or another zone path
    const targetPath = `/${zone.slug}`;
    if (pathname === "/" || (pathname.startsWith("/") && pathname.split("/")[1] !== zone.slug && !["profile", "booking", "cart", "auth", "settings"].includes(pathname.split("/")[1]))) {
      router.push(targetPath);
    }
  }, [pathname, router, saveZoneToStorage]);

  // Main detection routine
  const detectLocation = useCallback(async (forceGPS = false) => {
    setIsLoading(true);
    try {
      // 1. Check Local Storage first if not forced
      if (!forceGPS) {
        const stored = getStoredZone();
        if (stored) {
          const cacheAge = stored.last_location_updated
            ? Date.now() - new Date(stored.last_location_updated).getTime()
            : CACHE_DURATION_MS + 100;

          if (cacheAge < CACHE_DURATION_MS) {
            const zone: DetectedServiceZone = {
              id: stored.service_zone_id!,
              name: stored.service_zone_name!,
              slug: stored.service_zone_slug!,
              city: stored.service_zone_name!,
            };
            setCurrentZone(zone);
            setIsLoading(false);
            return;
          }
        }
      }

      // 2. Logged-in user address coordinate check
      if (isAuthenticated && token) {
        try {
          if (role === "Customer") {
            const addrRes = await profileService.getMyAddresses();
            if (addrRes.success && addrRes.data && addrRes.data.length > 0) {
              const defaultAddr = addrRes.data.find(a => a.isDefault) || addrRes.data[0];
              if (defaultAddr.latitude && defaultAddr.longitude) {
                const detectRes = await locationService.detectServiceZone(defaultAddr.latitude, defaultAddr.longitude);
                if (detectRes.success && detectRes.data) {
                  setCurrentZone(detectRes.data);
                  setIsNotServiceable(false);
                  saveZoneToStorage(detectRes.data, defaultAddr.latitude, defaultAddr.longitude);
                  setIsLoading(false);
                  return;
                } else if (detectRes.error?.includes("not available")) {
                  setIsNotServiceable(true);
                }
              }
            }
          } else if (role === "Worker") {
            const profileRes = await profileService.getWorkerProfile();
            if (profileRes.success && profileRes.data?.address) {
              const { latitude, longitude } = profileRes.data.address;
              if (latitude && longitude) {
                const detectRes = await locationService.detectServiceZone(latitude, longitude);
                if (detectRes.success && detectRes.data) {
                  setCurrentZone(detectRes.data);
                  setIsNotServiceable(false);
                  saveZoneToStorage(detectRes.data, latitude, longitude);
                  setIsLoading(false);
                  return;
                } else if (detectRes.error?.includes("not available")) {
                  setIsNotServiceable(true);
                }
              }
            }
          }
        } catch (err) {
          console.warn("Failed to check logged-in profile coordinates", err);
        }
      }

      // 3. Request GPS from browser Geolocation API
      if (!navigator.geolocation) {
        setShowLocationModal(true);
        setIsLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const detectRes = await locationService.detectServiceZone(lat, lng);
          if (detectRes.success && detectRes.data) {
            setCurrentZone(detectRes.data);
            setIsNotServiceable(false);
            saveZoneToStorage(detectRes.data, lat, lng);
          } else {
            if (detectRes.error?.includes("not available")) {
              setIsNotServiceable(true);
            }
            setShowLocationModal(true);
          }
          setIsLoading(false);
        },
        (error) => {
          console.warn("GPS Permission denied or geolocation failed", error);
          const stored = getStoredZone();
          if (stored) {
            setCurrentZone({
              id: stored.service_zone_id!,
              name: stored.service_zone_name!,
              slug: stored.service_zone_slug!,
              city: stored.service_zone_name!,
            });
          } else {
            setShowLocationModal(true);
          }
          setIsLoading(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } catch (e) {
      console.error("Error in location detection", e);
      setShowLocationModal(true);
      setIsLoading(false);
    }
  }, [isAuthenticated, token, role, getStoredZone, saveZoneToStorage]);

  // Initial trigger
  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  // Auto redirect handling based on active zone slug
  useEffect(() => {
    if (isNotServiceable) {
      router.push("/not-available");
      return;
    }

    if (!currentZone || isLoading) return;

    const pathSegments = pathname.split("/").filter(Boolean);
    const currentSlugInUrl = pathSegments[0];

    // List of static paths we should NEVER redirect from
    const staticPaths = ["profile", "booking", "cart", "auth", "settings", "worker", "dashboard", "not-available", "checkout"];

    if (currentSlugInUrl && staticPaths.includes(currentSlugInUrl)) {
      return; // Do not redirect on dashboard/profile/booking/etc
    }

    if (pathname === "/") {
      router.push(`/${currentZone.slug}`);
    } else if (currentSlugInUrl && currentSlugInUrl !== currentZone.slug) {
      // If they are on a path like '/delhi' but active zone is 'hisar', redirect them
      router.push(`/${currentZone.slug}`);
    }
  }, [currentZone, pathname, router, isLoading, isNotServiceable]);

  return {
    currentZone,
    isLoading,
    detectLocation: () => detectLocation(true),
    setManualZone,
    showLocationModal,
    setShowLocationModal,
    isNotServiceable,
  };
}
