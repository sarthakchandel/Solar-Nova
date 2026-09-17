import { apiClient, ServiceResult } from "./api.client";

export interface DetectedServiceZone {
  id: string;
  name: string;
  slug: string;
  city: string;
}

export interface ServiceZoneDto {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  isServiceable: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const locationService = {
  async detectServiceZone(latitude: number, longitude: number): Promise<ServiceResult<DetectedServiceZone>> {
    const res = await apiClient.get<any>(`/api/service-zones/detect?latitude=${latitude}&longitude=${longitude}`);
    if (res.success && res.data) {
      if (res.data.succeeded === false) {
        return {
          success: false,
          error: res.data.messages?.[0] ?? "We are not available at your place currently."
        };
      }
      return {
        success: true,
        data: res.data.data ?? res.data
      };
    }
    return res;
  },

  async getActiveServiceZones(): Promise<ServiceResult<PaginatedResult<ServiceZoneDto>>> {
    return apiClient.get<PaginatedResult<ServiceZoneDto>>("/api/service-zone?pageSize=100&isActive=true&isServiceable=true");
  }
};
