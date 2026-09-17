import { apiClient, ServiceResult } from "./api.client";

export interface BookingItemRequest {
  serviceId: string;
  serviceVariantId?: string;
  quantity: number;
}

export interface CreateBookingCommand {
  customerId: string;
  serviceId: string;
  addressId: string;
  serviceZoneId: string;
  orgUnitId: string;
  bookingType: number; // enum BookingType (Scheduled = 1)
  scheduledAt: string;  // ISO string
  internalNotes?: string;
  bookingItems: BookingItemRequest[];
}

export interface BookingResponse {
  id: string;
  bookingNumber: string;
  customerId: string;
  serviceId: string;
  addressId: string;
  serviceZoneId: string;
  scheduledAt: string;
  totalAmount: number;
  taxAmount: number;
  baseAmount: number;
  discountAmount: number;
  visitCharge: number;
  snapshotFullAddress: string;
}

export const bookingService = {
  async createBooking(command: CreateBookingCommand): Promise<ServiceResult<string>> {
    return apiClient.post<CreateBookingCommand, string>("/api/Booking/create", command);
  },

  async getBookingById(id: string): Promise<ServiceResult<BookingResponse>> {
    return apiClient.get<BookingResponse>(`/api/Booking/get-by-id/${id}`);
  },

  async getOrganizations(): Promise<ServiceResult<any>> {
    return apiClient.post<any, any>("/api/Organization/get-all", {
      pageSize: 100,
      pageNumber: 1,
    });
  },

  async getBookings(query: {
    customerId?: string;
    status?: number;
    pageSize?: number;
    pageNumber?: number;
  }): Promise<ServiceResult<any>> {
    return apiClient.post<any, any>("/api/Booking/get-all", query);
  },

  async createOrganization(payload: {
    name: string;
    orgUnitType: number;
  }): Promise<ServiceResult<string>> {
    return apiClient.post<any, string>("/api/Organization/create", {
      ...payload,
      isActive: true,
      canAccessAllChildUnits: true,
    });
  },
};
