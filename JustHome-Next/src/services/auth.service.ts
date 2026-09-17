/**
 * Auth / User Service
 *
 * All HTTP calls to the backend Auth & User API endpoints are centralised here.
 * The base URL is read from the NEXT_PUBLIC_API_BASE_URL environment variable
 * (set in .env.local) so no hard-coded URLs exist anywhere else in the codebase.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Generic API response shape returned by this service. */
export interface ServiceResult<T = undefined> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

/** Parse an error response body and return a human-readable message. */
async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const text = await response.text();
    const obj = JSON.parse(text);
    return obj.messages?.[0] ?? `Error ${response.status}: ${response.statusText}`;
  } catch {
    return `Error ${response.status}: ${response.statusText}`;
  }
}

/** Thin fetch wrapper that always sends JSON. */
async function apiPost<TBody>(endpoint: string, body: TBody): Promise<Response> {
  return fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ─── Request / Response types ─────────────────────────────────────────────────

export interface RegisterByPhoneRequest {
  phoneNumber: string;
  isCustomer: boolean;
}

export interface VerifyPhoneOtpRequest {
  phoneNumber: string;
  otp: number;
}

export interface LegacyRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
  isActive: boolean;
  password: string;
  phoneNumber: string;
  isCustomer: boolean;
}

// ─── Auth Service ─────────────────────────────────────────────────────────────

const authService = {
  /**
   * POST /api/User/register-by-phone
   * Initiates phone-based registration and triggers an OTP to be sent.
   */
  async registerByPhone(payload: RegisterByPhoneRequest): Promise<ServiceResult> {
    try {
      const response = await apiPost("/api/User/register-by-phone", payload);

      if (!response.ok) {
        return { success: false, error: await parseErrorMessage(response) };
      }

      const result = await response.json();

      if (result.succeeded === false) {
        return { success: false, error: result.messages?.[0] ?? "Registration failed" };
      }

      return { success: true, message: result.messages?.[0] ?? "OTP sent successfully!" };
    } catch (err) {
      console.error("[authService.registerByPhone]", err);
      return {
        success: false,
        error: "Failed to connect to the backend server. Make sure it is running.",
      };
    }
  },

  /**
   * POST /api/User/verify-phone-registration-otp
   * Verifies the OTP and completes the phone registration.
   */
  async verifyPhoneOtp(payload: VerifyPhoneOtpRequest): Promise<ServiceResult> {
    try {
      const response = await apiPost("/api/User/verify-phone-registration-otp", payload);

      if (!response.ok) {
        return { success: false, error: await parseErrorMessage(response) };
      }

      const result = await response.json();

      if (result.succeeded === false) {
        return { success: false, error: result.messages?.[0] ?? "OTP verification failed" };
      }

      return { success: true, message: result.messages?.[0] ?? "Registration complete!" };
    } catch (err) {
      console.error("[authService.verifyPhoneOtp]", err);
      return {
        success: false,
        error: "Failed to connect to the backend server. Make sure it is running.",
      };
    }
  },

  /**
   * POST /api/Auth/register  (legacy full-form signup)
   * Kept for backward compatibility with older parts of the UI.
   */
  async register(payload: LegacyRegisterRequest): Promise<ServiceResult> {
    try {
      const response = await apiPost("/api/Auth/register", payload);

      if (!response.ok) {
        return { success: false, error: await parseErrorMessage(response) };
      }

      const result = await response.json();

      if (result.succeeded) {
        return { success: true, message: result.messages?.[0] ?? "Registration successful!" };
      }

      return { success: false, error: result.messages?.[0] ?? "Registration failed" };
    } catch (err) {
      console.error("[authService.register]", err);
      return {
        success: false,
        error: "Failed to connect to the backend server. Make sure it is running.",
      };
    }
  },
};

export default authService;
