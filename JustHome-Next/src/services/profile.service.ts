import { apiClient, ServiceResult } from "./api.client";
import { useUserStore } from "@/store";

function isValidGuid(id?: string): boolean {
  if (!id) return false;
  const emptyGuid = "00000000-0000-0000-0000-000000000000";
  return id !== emptyGuid && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
}

export interface CustomerProfileDto {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;         // ISO date string
  gender?: number;             // 0=Male,1=Female,2=Other
  referralCode?: string;
  profileImageUrl?: string;
  email?: string;
  phoneNumber?: string;
}

export interface WorkerProfileDto {
  id?: string;
  firstName: string;
  lastName: string;
  workerCode: string;
  profileImageUrl?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  bankAccountNumber?: string;
  bankIfscCode?: string;
  healthInsurancePolicyNo?: string;
  accidentInsurancePolicyNo?: string;
  primaryServiceCategoryId: string;
  workerSkillId?: string;
  isAvailable: boolean;
  address?: {
    houseNo: string;
    floor: string;
    landmark: string;
    fullAddress: string;
    latitude?: number;
    longitude?: number;
  };
}

export interface WorkerDocumentDto {
  id: string;
  documentType: number; // enum WorkerDocumentType
  documentTypeName?: string;
  fileUrl: string;
  expiresOn?: string;
  verificationStatus: number; // enum DocumentVerificationStatus
  verificationStatusName?: string;
  rejectionReason?: string;
}

export interface WorkerEarningDto {
  id: string;
  bookingId: string;
  bookingNumber?: string;
  amount: number;
  payoutDate?: string;
  status: string; // Pending, Paid, Cancelled
}

export interface WorkerEarningStatsDto {
  totalEarnings: number;
  pendingEarnings: number;
  completedEarnings: number;
}

export const profileService = {
  // --- Customer Profile ---
  async getCustomerProfile(): Promise<ServiceResult<CustomerProfileDto>> {
    return apiClient.get<CustomerProfileDto>("/api/customer-profile/me");
  },

  async saveCustomerProfile(data: CustomerProfileDto): Promise<ServiceResult<string>> {
    if (isValidGuid(data.id)) {
      return apiClient.put<CustomerProfileDto, string>(`/api/customer-profile/update/${data.id}`, data);
    } else {
      return apiClient.post<CustomerProfileDto, string>("/api/customer-profile/create", data);
    }
  },

  // --- Worker Profile ---
  async getWorkerProfile(): Promise<ServiceResult<WorkerProfileDto>> {
    return apiClient.get<WorkerProfileDto>("/api/worker-profile/me");
  },

  async saveWorkerProfile(data: WorkerProfileDto): Promise<ServiceResult<string>> {
    if (isValidGuid(data.id)) {
      return apiClient.put<WorkerProfileDto, string>(`/api/worker-profile/update/${data.id}`, data);
    } else {
      return apiClient.post<WorkerProfileDto, string>("/api/worker-profile/create", data);
    }
  },

  // --- Worker Skills Catalog — GET /api/worker-skill returns all without pagination body
  async getSkills(): Promise<ServiceResult<any>> {
    return apiClient.get<any>("/api/worker-skill");
  },

  // --- Service Categories (public, no auth) ---
  async getServiceCategories(): Promise<ServiceResult<any>> {
    return apiClient.get<any>("/api/ServiceCategory/public/categories");
  },

  // --- File Upload ---
  async uploadProfileImage(file: File): Promise<ServiceResult<{ success: boolean; url: string }>> {
    const formData = new FormData();
    formData.append("file", file);

    // Upload through the Next.js API proxy to avoid CORS and backend route issues
    const headers: Record<string, string> = {};
    const token = useUserStore.getState().token;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch("/api/upload?prefix=avatars", {
        method: "POST",
        headers,
        body: formData,
      });

      const text = await response.text();
      let data: any = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }

      if (!response.ok) {
        return {
          success: false,
          error: data?.error ?? data?.messages?.[0] ?? `Upload failed (${response.status})`,
        };
      }

      return { success: true, data: data?.data ?? data };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Network error" };
    }
  },

  // --- Worker Documents ---
  async getWorkerDocuments(workerId: string): Promise<ServiceResult<WorkerDocumentDto[]>> {
    return apiClient.get<WorkerDocumentDto[]>(`/api/worker-document/getbyworker/${workerId}`);
  },

  async uploadWorkerDocument(
    documentType: number,
    file: File,
    expiresOn?: string,
    workerId?: string
  ): Promise<ServiceResult<any>> {
    const formData = new FormData();
    formData.append("documentType", documentType.toString());
    formData.append("file", file);
    if (expiresOn) formData.append("expiresOn", expiresOn);
    if (workerId) formData.append("workerId", workerId);

    return apiClient.postMultipart<any>("/api/worker-document/upload", formData);
  },

  async replaceWorkerDocument(
    id: string,
    documentType: number,
    file: File
  ): Promise<ServiceResult<any>> {
    const formData = new FormData();
    formData.append("documentType", documentType.toString());
    formData.append("file", file);

    return apiClient.putMultipart<any>(`/api/worker-document/replace/${id}`, formData);
  },

  async deleteWorkerDocument(id: string): Promise<ServiceResult<any>> {
    return apiClient.delete<any>(`/api/worker-document/delete/${id}`);
  },

  async downloadWorkerDocument(id: string): Promise<Blob> {
    const token = useUserStore.getState().token;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/worker-document/download/${id}`, {
      headers: token ? { "Authorization": `Bearer ${token}` } : {},
    });
    if (!response.ok) throw new Error("Failed to download document");
    return response.blob();
  },

  // --- Worker Earnings ---
  async getWorkerEarnings(workerId: string): Promise<ServiceResult<any>> {
    const payload = { pageNumber: 1, pageSize: 1000, workerId };
    return apiClient.post<any, any>("/api/worker-earning/get-all", payload);
  },

  async getWorkerEarningsStats(workerId: string): Promise<ServiceResult<WorkerEarningStatsDto>> {
    return apiClient.get<WorkerEarningStatsDto>(`/api/worker-earning/stats/${workerId}`);
  },

  // --- Customer Saved Addresses ---
  async getMyAddresses(): Promise<ServiceResult<any[]>> {
    return apiClient.get<any[]>("/api/address/my-addresses");
  },

  async createAddress(data: any): Promise<ServiceResult<string>> {
    return apiClient.post<any, string>("/api/address", data);
  },

  async updateAddress(id: string, data: any): Promise<ServiceResult<string>> {
    return apiClient.put<any, string>(`/api/address/${id}`, data);
  },

  async deleteAddress(id: string): Promise<ServiceResult<boolean>> {
    return apiClient.delete<boolean>(`/api/address/${id}`);
  }
};
