import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartService } from "@/services/cart.service";

export interface CartItem {
  serviceId: string; // unique variant ID (keeps compatibility with existing screens)
  parentServiceId?: string; // parent service ID for DB sync
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  customerId: string | null;
  cityId: string | null;
  backendCartId: string | null;
  isLoading: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  initializeUserCart: (customerId: string, cityId: string) => Promise<void>;
  logoutCart: () => void;
  syncCartToBackend: (items: CartItem[]) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      customerId: null,
      cityId: null,
      backendCartId: null,
      isLoading: false,

      addItem: (newItem) => {
        const existingItem = get().items.find((item) => item.serviceId === newItem.serviceId);
        let newItems: CartItem[] = [];
        if (existingItem) {
          newItems = get().items.map((item) =>
            item.serviceId === newItem.serviceId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newItems = [...get().items, { ...newItem, quantity: 1 }];
        }
        
        set({ items: newItems });
        get().syncCartToBackend(newItems);
      },

      removeItem: (serviceId) => {
        const newItems = get().items.filter((item) => item.serviceId !== serviceId);
        set({ items: newItems });
        get().syncCartToBackend(newItems);
      },

      updateQuantity: (serviceId, quantity) => {
        let newItems: CartItem[] = [];
        if (quantity <= 0) {
          newItems = get().items.filter((item) => item.serviceId !== serviceId);
        } else {
          newItems = get().items.map((item) =>
            item.serviceId === serviceId ? { ...item, quantity } : item
          );
        }
        
        set({ items: newItems });
        get().syncCartToBackend(newItems);
      },

      clearCart: () => {
        set({ items: [] });
        get().syncCartToBackend([]);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      initializeUserCart: async (customerId: string, cityId: string) => {
        set({ customerId, cityId, isLoading: true });
        try {
          const res = await cartService.getCarts(customerId);
          if (res.success && res.data && res.data.data && res.data.data.length > 0) {
            const backendCart = res.data.data[0];
            const backendItems: CartItem[] = backendCart.cartItems.map((item) => ({
              serviceId: item.serviceVariantId,
              parentServiceId: item.serviceId,
              title: `${item.serviceName} - ${item.serviceVariantName}`,
              price: Math.round(item.unitPrice),
              image: "",
              quantity: item.quantity,
            }));

            // Sync/Merge local items with backend items
            const localItems = get().items;
            const mergedItems = [...backendItems];
            let changed = false;

            for (const localItem of localItems) {
              const exists = mergedItems.find((i) => i.serviceId === localItem.serviceId);
              if (!exists) {
                mergedItems.push(localItem);
                changed = true;
              } else if (exists.quantity < localItem.quantity) {
                exists.quantity = localItem.quantity;
                changed = true;
              }
            }

            set({ items: mergedItems, backendCartId: backendCart.id });

            if (changed) {
              await cartService.deleteCart(backendCart.id);
              const newCartRes = await cartService.createCart({
                customerId,
                cityId,
                subtotal: get().getSubtotal(),
                grandTotal: get().getSubtotal(),
                cartItems: mergedItems.map((item) => ({
                  serviceId: item.parentServiceId || item.serviceId,
                  serviceVariantId: item.serviceId,
                  quantity: item.quantity,
                  unitPrice: item.price,
                  finalPrice: item.price * item.quantity,
                  estimatedDurationMinutes: 0,
                })),
              });
              if (newCartRes.success && newCartRes.data) {
                set({ backendCartId: newCartRes.data });
              }
            }
          } else {
            const localItems = get().items;
            if (localItems.length > 0) {
              const newCartRes = await cartService.createCart({
                customerId,
                cityId,
                subtotal: get().getSubtotal(),
                grandTotal: get().getSubtotal(),
                cartItems: localItems.map((item) => ({
                  serviceId: item.parentServiceId || item.serviceId,
                  serviceVariantId: item.serviceId,
                  quantity: item.quantity,
                  unitPrice: item.price,
                  finalPrice: item.price * item.quantity,
                  estimatedDurationMinutes: 0,
                })),
              });
              if (newCartRes.success && newCartRes.data) {
                set({ backendCartId: newCartRes.data });
              }
            }
          }
        } catch (err) {
          console.error("Failed to initialize user cart:", err);
        } finally {
          set({ isLoading: false });
        }
      },

      logoutCart: () => {
        set({ items: [], customerId: null, cityId: null, backendCartId: null });
      },

      syncCartToBackend: async (items: CartItem[]) => {
        const { customerId, cityId, backendCartId } = get();
        if (!customerId || !cityId) return;

        try {
          if (backendCartId) {
            await cartService.deleteCart(backendCartId);
            set({ backendCartId: null });
          }

          if (items.length > 0) {
            const res = await cartService.createCart({
              customerId,
              cityId,
              subtotal: get().getSubtotal(),
              grandTotal: get().getSubtotal(),
              cartItems: items.map((item) => ({
                serviceId: item.parentServiceId || item.serviceId,
                serviceVariantId: item.serviceId,
                quantity: item.quantity,
                unitPrice: item.price,
                finalPrice: item.price * item.quantity,
                estimatedDurationMinutes: 0,
              })),
            });
            if (res.success && res.data) {
              set({ backendCartId: res.data });
            }
          }
        } catch (err) {
          console.error("Failed to sync cart to backend:", err);
        }
      },
    }),
    {
      name: "justhome-cart-storage",
      partialize: (state) => ({ items: state.items, customerId: state.customerId, cityId: state.cityId }),
    }
  )
);
