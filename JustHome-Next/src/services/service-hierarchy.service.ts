import { apiClient, ServiceResult } from "./api.client";
import { PaginatedResult } from "./location.service";
import {
  ServiceCategory,
  SubCategory,
  ServiceType,
  ServiceItem,
  ServiceContent,
  ServiceFaq,
  ServiceProcess,
  ServiceReview,
  ServiceVariant,
  ServiceVariantCityPricing,
} from "@/types/service-hierarchy";

export const serviceHierarchyService = {
  async getCategories(): Promise<ServiceResult<PaginatedResult<ServiceCategory>>> {
    return apiClient.get<PaginatedResult<ServiceCategory>>("/api/ServiceCategory/public/categories");
  },

  async getSubCategories(categoryId: string): Promise<ServiceResult<PaginatedResult<SubCategory>>> {
    return apiClient.get<PaginatedResult<SubCategory>>(`/api/SubCategory/public/by-category/${categoryId}`);
  },

  async getServiceTypes(subCategoryId: string): Promise<ServiceResult<PaginatedResult<ServiceType>>> {
    return apiClient.get<PaginatedResult<ServiceType>>(`/api/ServiceType/public/by-subcategory/${subCategoryId}`);
  },

  async getServices(serviceTypeId: string): Promise<ServiceResult<PaginatedResult<ServiceItem>>> {
    return apiClient.get<PaginatedResult<ServiceItem>>(`/api/Service/public/by-servicetype/${serviceTypeId}`);
  },

  async getServiceDetails(serviceId: string): Promise<ServiceResult<ServiceItem>> {
    return apiClient.get<ServiceItem>(`/api/Service/public/details/${serviceId}`);
  },

  async getServiceContent(serviceId: string): Promise<ServiceResult<PaginatedResult<ServiceContent>>> {
    return apiClient.get<PaginatedResult<ServiceContent>>(`/api/ServiceContent/public/by-service/${serviceId}`);
  },

  async getServiceFaq(serviceId: string): Promise<ServiceResult<PaginatedResult<ServiceFaq>>> {
    return apiClient.get<PaginatedResult<ServiceFaq>>(`/api/ServiceFaq/public/by-service/${serviceId}`);
  },

  async getServiceProcess(serviceId: string): Promise<ServiceResult<PaginatedResult<ServiceProcess>>> {
    return apiClient.get<PaginatedResult<ServiceProcess>>(`/api/ServiceProcess/public/by-service/${serviceId}`);
  },

  async getServiceReview(serviceId: string): Promise<ServiceResult<PaginatedResult<ServiceReview>>> {
    return apiClient.get<PaginatedResult<ServiceReview>>(`/api/ServiceReview/public/by-service/${serviceId}`);
  },

  async getServiceVariant(serviceId: string): Promise<ServiceResult<PaginatedResult<ServiceVariant>>> {
    return apiClient.get<PaginatedResult<ServiceVariant>>(`/api/ServiceVariant/public/by-service/${serviceId}`);
  },

  async getVariantPricing(variantId: string, cityId: string): Promise<ServiceResult<ServiceVariantCityPricing>> {
    return apiClient.get<ServiceVariantCityPricing>(
      `/api/ServiceVariantCityPricing/public/by-variant/${variantId}/city/${cityId}`
    );
  },
};
