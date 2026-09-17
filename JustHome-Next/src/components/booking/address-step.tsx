"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Navigation, Loader2 } from "lucide-react";
import type { Address } from "@/types";

interface AddressStepProps {
  address: Address;
  onChange: (data: Partial<Address>) => void;
}

// Default map options
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India Center
const mapContainerStyle = {
  width: "100%",
  height: "280px",
};
const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

export function AddressStep({ address, onChange }: AddressStepProps) {
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(
    address.latitude && address.longitude
      ? { lat: address.latitude, lng: address.longitude }
      : defaultCenter
  );
  const [mapZoom, setMapZoom] = useState(address.latitude ? 16 : 5);
  const [isLocating, setIsLocating] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Load Google Maps API Key
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  // Places Autocomplete Hook
  const {
    ready,
    value: searchValue,
    suggestions: { status, data: suggestionsData },
    setValue: setSearchValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "in" },
    },
    debounce: 300,
    callbackName: "initMap",
  });

  // Save map reference
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Update center when address coordinates exist
  useEffect(() => {
    if (address.latitude && address.longitude) {
      setMapCenter({ lat: address.latitude, lng: address.longitude });
    }
  }, [address.latitude, address.longitude]);

  // Geocode coords to get details (City, Pincode, Area)
  const reverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      if (!isLoaded || typeof window === "undefined" || !window.google) return;
      setAddressLoading(true);

      // Save coordinates immediately so they are not lost if reverse geocoding fails
      onChange({
        latitude: lat,
        longitude: lng,
      });

      try {
        const geocoder = new window.google.maps.Geocoder();
        const response = await geocoder.geocode({ location: { lat, lng } });

        if (response.results && response.results.length > 0) {
          let route = "";
          let sublocality = "";
          let city = "";
          let state = "";
          let pincode = "";

          // Populate search value with the formatted address of the most precise result
          setSearchValue(response.results[0].formatted_address, false);

          for (const res of response.results) {
            const comps = res.address_components;
            if (!route) {
              route = comps.find((c) => c.types.includes("route"))?.long_name || "";
            }
            if (!sublocality) {
              sublocality =
                comps.find((c) => c.types.includes("sublocality_level_1"))?.long_name ||
                comps.find((c) => c.types.includes("sublocality"))?.long_name ||
                "";
            }
            if (!city) {
              city =
                comps.find((c) => c.types.includes("locality"))?.long_name ||
                comps.find((c) => c.types.includes("administrative_area_level_2"))?.long_name ||
                "";
            }
            if (!state) {
              state = comps.find((c) => c.types.includes("administrative_area_level_1"))?.long_name || "";
            }
            if (!pincode) {
              pincode = comps.find((c) => c.types.includes("postal_code"))?.long_name || "";
            }
          }

          const line2Val =
            route && sublocality ? `${route}, ${sublocality}` : route || sublocality || "";

          onChange({
            line2: line2Val,
            city: city,
            state: state,
            pincode: pincode,
            latitude: lat,
            longitude: lng,
          });
        }
      } catch (err) {
        console.error("Geocoding failed:", err);
      } finally {
        setAddressLoading(false);
      }
    },
    [isLoaded, onChange]
  );

  // Triggered when marker drag ends
  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMapCenter({ lat, lng });
    reverseGeocode(lat, lng);
  };

  // Triggered when search option is selected
  const handleSelectSuggestion = async (description: string) => {
    setSearchValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = getLatLng(results[0]);

      setMapCenter({ lat, lng });
      setMapZoom(17);
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });
      }

      // Scan all results to collect address parts
      let route = "";
      let sublocality = "";
      let city = "";
      let state = "";
      let pincode = "";

      for (const res of results) {
        const comps = res.address_components;
        if (!route) {
          route = comps.find((c) => c.types.includes("route"))?.long_name || "";
        }
        if (!sublocality) {
          sublocality =
            comps.find((c) => c.types.includes("sublocality_level_1"))?.long_name ||
            comps.find((c) => c.types.includes("sublocality"))?.long_name ||
            "";
        }
        if (!city) {
          city =
            comps.find((c) => c.types.includes("locality"))?.long_name ||
            comps.find((c) => c.types.includes("administrative_area_level_2"))?.long_name ||
            "";
        }
        if (!state) {
          state = comps.find((c) => c.types.includes("administrative_area_level_1"))?.long_name || "";
        }
        if (!pincode) {
          pincode = comps.find((c) => c.types.includes("postal_code"))?.long_name || "";
        }
      }

      const line2Val =
        route && sublocality ? `${route}, ${sublocality}` : route || sublocality || "";

      onChange({
        line2: line2Val,
        city: city,
        state: state,
        pincode: pincode,
        latitude: lat,
        longitude: lng,
      });
    } catch (error) {
      console.error("Error selecting suggestion:", error);
    }
  };

  // Get current GPS Location of user
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const coords = { lat, lng };

        setMapCenter(coords);
        setMapZoom(17);
        if (mapRef.current) {
          mapRef.current.panTo(coords);
        }

        reverseGeocode(lat, lng);
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to access your location. Please check your browser permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="space-y-5 pb-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-lg text-primary dark:text-foreground">Service Address</h2>
        <p className="text-xs text-muted-foreground">
          Pinpoint your location using Google Maps to help our professionals reach you quickly.
        </p>
      </div>

      {isLoaded ? (
        <div className="space-y-4">
          {/* Autocomplete Search input */}
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                disabled={!ready}
                placeholder="Search your building, society, or locality..."
                className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleLocateMe}
                disabled={isLocating}
                className="absolute right-1.5 h-8 gap-1.5 rounded-lg px-2 text-xs font-medium text-accent hover:text-accent-hover hover:bg-accent/5"
              >
                {isLocating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Navigation className="h-3.5 w-3.5" />
                )}
                Locate Me
              </Button>
            </div>

            {/* Places Suggestions Dropdown */}
            {status === "OK" && (
              <div className="absolute z-50 w-full mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-border bg-popover text-popover-foreground shadow-lg p-1.5">
                {suggestionsData.map(({ place_id, description }) => (
                  <button
                    key={place_id}
                    onClick={() => handleSelectSuggestion(description)}
                    className="w-full flex items-start gap-2.5 px-3 py-2 text-left text-sm rounded-lg hover:bg-accent/5 hover:text-accent transition-colors duration-150"
                  >
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground group-hover:text-accent" />
                    <span className="truncate">{description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Google Map */}
          <div className="relative rounded-2xl overflow-hidden border border-border bg-muted shadow-sm">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={mapZoom}
              onLoad={onMapLoad}
              onUnmount={onMapUnmount}
              options={mapOptions}
            >
              <Marker
                position={mapCenter}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
                label={{
                  text: "🏠 Pin Location",
                  className: "bg-background text-foreground px-2 py-0.5 rounded border border-border text-[10px] font-semibold -mt-10 inline-block shadow-sm",
                }}
              />
            </GoogleMap>

            {addressLoading && (
              <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                <div className="bg-popover/80 border border-border px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 text-xs">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
                  Updating location details...
                </div>
              </div>
            )}

            {/* LatLng indicator */}
            {address.latitude && address.longitude && (
              <div className="absolute bottom-2.5 left-2.5 px-2 py-1 rounded bg-background/85 border border-border text-[9px] font-mono text-muted-foreground shadow-sm">
                LatLng: {address.latitude.toFixed(6)}, {address.longitude.toFixed(6)}
              </div>
            )}
          </div>
        </div>
      ) : loadError ? (
        <div className="p-4 border border-destructive/20 bg-destructive/5 text-destructive rounded-xl text-sm text-center">
          Failed to load Google Maps interface. Fallback address fields can be edited below.
        </div>
      ) : (
        <div className="h-[280px] w-full rounded-2xl border border-border bg-muted flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
          <span className="text-xs text-muted-foreground">Loading interactive map...</span>
        </div>
      )}

      {/* Structured Address Form Inputs */}
      <div className="space-y-4 pt-2">
        <Input
          label="House / Flat / Block No."
          placeholder="e.g. Apartment 4B, Sector 3"
          value={address.line1}
          onChange={(e) => onChange({ line1: e.target.value })}
          required
        />
        <Input
          label="Street / Area / Landmark"
          placeholder="e.g. Opposite Main Park, Dwarka"
          value={address.line2}
          onChange={(e) => onChange({ line2: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            placeholder="e.g. New Delhi"
            value={address.city}
            onChange={(e) => onChange({ city: e.target.value })}
            required
          />
          <Input
            label="Pincode"
            placeholder="e.g. 110075"
            value={address.pincode}
            onChange={(e) => onChange({ pincode: e.target.value })}
            required
          />
        </div>
      </div>
    </div>
  );
}
