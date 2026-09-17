"use client";

import { useEffect, useRef } from "react";
import { useUserStore } from "@/store/use-user-store";
import { useCartStore } from "@/store/use-cart-store";
import { useCurrentServiceZone } from "@/hooks/use-current-service-zone";
import { cartService } from "@/services/cart.service";

export function CartInitializer() {
  const { isAuthenticated, token } = useUserStore();
  const { currentZone } = useCurrentServiceZone();
  const { initializeUserCart, logoutCart, customerId } = useCartStore();
  
  // Track last processed credentials to prevent duplicate calls
  const lastAuthTokenRef = useRef<string | null>(null);
  const lastZoneIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      if (customerId || lastAuthTokenRef.current) {
        logoutCart();
        lastAuthTokenRef.current = null;
        lastZoneIdRef.current = null;
      }
      return;
    }

    const zoneId = currentZone?.id;
    if (!token || !zoneId) return;

    // Skip if we already initialized for this exact token + zone combination AND we have a valid customerId
    if (lastAuthTokenRef.current === token && lastZoneIdRef.current === zoneId && customerId) {
      return;
    }

    const initCart = async () => {
      try {
        lastAuthTokenRef.current = token;
        lastZoneIdRef.current = zoneId;

        const profileRes = await cartService.getMyProfile();
        if (profileRes.success && profileRes.data) {
          const profileId = profileRes.data.id;
          if (profileId) {
            await initializeUserCart(profileId, zoneId);
          }
        }
      } catch (err) {
        console.error("Cart sync initialization failed:", err);
      }
    };

    initCart();
  }, [isAuthenticated, token, currentZone?.id, initializeUserCart, logoutCart, customerId]);

  return null;
}
export default CartInitializer;
