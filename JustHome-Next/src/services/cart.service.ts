import { apiClient, ServiceResult } from "./api.client";
import { PaginatedResult } from "./location.service";

export interface CustomerProfileResponse {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
}

export interface CartItemResponse {
  id: string;
  cartId: string;
  serviceId: string;
  serviceName: string;
  serviceVariantId: string;
  serviceVariantName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  finalPrice: number;
  estimatedDurationMinutes: number;
  remarks?: string;
}

export interface CartResponse {
  id: string;
  customerId: string;
  cityId: string;
  status: number;
  subtotal: decimal;
  membershipDiscount: decimal;
  platformFee: decimal;
  tax: decimal;
  grandTotal: decimal;
  cartItems: CartItemResponse[];
}

type decimal = number;

export const cartService = {
  async getMyProfile(): Promise<ServiceResult<CustomerProfileResponse>> {
    return apiClient.get<CustomerProfileResponse>("/api/customer-profile/me");
  },

  async getCarts(customerId: string): Promise<ServiceResult<PaginatedResult<CartResponse>>> {
    return apiClient.post<any, PaginatedResult<CartResponse>>("/api/Cart/get-all", {
      customerId,
      pageSize: 1,
      pageNumber: 1,
    });
  },

  async createCart(payload: {
    customerId: string;
    cityId: string;
    subtotal: number;
    grandTotal: number;
    cartItems: {
      serviceId: string;
      serviceVariantId: string;
      quantity: number;
      unitPrice: number;
      finalPrice: number;
      estimatedDurationMinutes: number;
    }[];
  }): Promise<ServiceResult<string>> {
    return apiClient.post<{
      customerId: string;
      cityId: string;
      status: number;
      subtotal: number;
      grandTotal: number;
      cartItems: {
        serviceId: string;
        serviceVariantId: string;
        quantity: number;
        unitPrice: number;
        finalPrice: number;
        estimatedDurationMinutes: number;
      }[];
    }, string>("/api/Cart/create", {
      ...payload,
      status: 0, // CartStatus.Active
    });
  },

  async deleteCart(cartId: string): Promise<ServiceResult<any>> {
    return apiClient.delete<any>(`/api/Cart/delete/${cartId}`);
  },
};
