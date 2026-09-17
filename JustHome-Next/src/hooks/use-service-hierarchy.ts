import { useQuery } from "@tanstack/react-query";
import { serviceHierarchyService } from "@/services/service-hierarchy.service";
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
} from "@/types/service-hierarchy";

export function useCategories() {
  return useQuery<ServiceCategory[], Error>({
    queryKey: ["public-categories"],
    queryFn: async () => {
      const res = await serviceHierarchyService.getCategories();
      if (!res.success) throw new Error(res.error || "Failed to fetch categories");
      return res.data?.data || [];
    },
  });
}

export function useSubCategories(categoryId?: string) {
  return useQuery<SubCategory[], Error>({
    queryKey: ["public-subcategories", categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      const res = await serviceHierarchyService.getSubCategories(categoryId);
      if (!res.success) throw new Error(res.error || "Failed to fetch subcategories");
      return res.data?.data || [];
    },
    enabled: !!categoryId,
  });
}

export function useServiceTypes(subCategoryId?: string) {
  return useQuery<ServiceType[], Error>({
    queryKey: ["public-servicetypes", subCategoryId],
    queryFn: async () => {
      if (!subCategoryId) return [];
      const res = await serviceHierarchyService.getServiceTypes(subCategoryId);
      if (!res.success) throw new Error(res.error || "Failed to fetch service types");
      return res.data?.data || [];
    },
    enabled: !!subCategoryId,
  });
}

export function useServices(serviceTypeId?: string) {
  return useQuery<ServiceItem[], Error>({
    queryKey: ["public-services", serviceTypeId],
    queryFn: async () => {
      if (!serviceTypeId) return [];
      const res = await serviceHierarchyService.getServices(serviceTypeId);
      if (!res.success) throw new Error(res.error || "Failed to fetch services");
      return res.data?.data || [];
    },
    enabled: !!serviceTypeId,
  });
}

export function useServiceDetails(serviceId?: string) {
  return useQuery<ServiceItem | null, Error>({
    queryKey: ["public-service-details", serviceId],
    queryFn: async () => {
      if (!serviceId) return null;
      const res = await serviceHierarchyService.getServiceDetails(serviceId);
      if (!res.success) throw new Error(res.error || "Failed to fetch service details");
      return res.data || null;
    },
    enabled: !!serviceId,
  });
}

export function useServiceContent(serviceId?: string) {
  return useQuery<ServiceContent[], Error>({
    queryKey: ["public-service-content", serviceId],
    queryFn: async () => {
      if (!serviceId) return [];
      const res = await serviceHierarchyService.getServiceContent(serviceId);
      if (!res.success) throw new Error(res.error || "Failed to fetch service content");
      return res.data?.data || [];
    },
    enabled: !!serviceId,
  });
}

export function useServiceFaq(serviceId?: string) {
  return useQuery<ServiceFaq[], Error>({
    queryKey: ["public-service-faq", serviceId],
    queryFn: async () => {
      if (!serviceId) return [];
      const res = await serviceHierarchyService.getServiceFaq(serviceId);
      if (!res.success) throw new Error(res.error || "Failed to fetch service FAQs");
      return res.data?.data || [];
    },
    enabled: !!serviceId,
  });
}

export function useServiceProcess(serviceId?: string) {
  return useQuery<ServiceProcess[], Error>({
    queryKey: ["public-service-process", serviceId],
    queryFn: async () => {
      if (!serviceId) return [];
      const res = await serviceHierarchyService.getServiceProcess(serviceId);
      if (!res.success) throw new Error(res.error || "Failed to fetch service process");
      return res.data?.data || [];
    },
    enabled: !!serviceId,
  });
}

export function useServiceReview(serviceId?: string) {
  return useQuery<ServiceReview[], Error>({
    queryKey: ["public-service-review", serviceId],
    queryFn: async () => {
      if (!serviceId) return [];
      const res = await serviceHierarchyService.getServiceReview(serviceId);
      if (!res.success) throw new Error(res.error || "Failed to fetch reviews");
      return res.data?.data || [];
    },
    enabled: !!serviceId,
  });
}

export function useServiceVariant(serviceId?: string) {
  return useQuery<ServiceVariant[], Error>({
    queryKey: ["public-service-variant", serviceId],
    queryFn: async () => {
      if (!serviceId) return [];
      const res = await serviceHierarchyService.getServiceVariant(serviceId);
      if (!res.success) throw new Error(res.error || "Failed to fetch variants");
      return res.data?.data || [];
    },
    enabled: !!serviceId,
  });
}

export function useVariantPricing(variantId?: string, cityId?: string) {
  return useQuery({
    queryKey: ["public-variant-pricing", variantId, cityId],
    queryFn: async () => {
      if (!variantId || !cityId) return null;
      const res = await serviceHierarchyService.getVariantPricing(variantId, cityId);
      if (!res.success) throw new Error(res.error || "Failed to fetch variant pricing");
      return res.data || null;
    },
    enabled: !!variantId && !!cityId,
  });
}
