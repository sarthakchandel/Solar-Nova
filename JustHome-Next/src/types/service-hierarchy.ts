export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface SubCategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  iconUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ServiceType {
  id: string;
  subCategoryId: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ServiceItem {
  id: string;
  serviceTypeId: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  durationMinutes: number;
  warrantyDays: number;
  requiresInspection: boolean;
  isInstantBookable: boolean;
  isEmergencyAvailable: boolean;
  displayOrder: number;
  isActive: boolean;
  basePrice: number;
}

export interface ServiceContent {
  id: string;
  serviceId: string;
  contentType: number; // 1 = About, 2 = Highlights, 3 = Included, 4 = Excluded, 5 = Terms
  title: string;
  description: string;
  iconUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ServiceFaq {
  id: string;
  serviceId: string;
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ServiceProcess {
  id: string;
  serviceId: string;
  stepNumber: number;
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}

export interface ServiceReview {
  id: string;
  serviceId: string;
  customerId: string;
  customerName?: string;
  rating: number;
  reviewText: string;
  isVerified: boolean;
  createdAt?: string;
}

export interface ServiceVariant {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  sellingPrice: number;
  durationMinutes: number;
  displayOrder: number;
  isActive: boolean;
}

export interface ServiceVariantCityPricing {
  id: string;
  serviceVariantId: string;
  cityId: string;
  price: number;
  discountPercent: number;
  isActive: boolean;
}
