"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import authService from "@/services/auth.service";

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("JWT parse error:", e);
    return null;
  }
}

export function useAuth() {
  const router = useRouter();
  const { isAuthenticated, user, token, role, login, logout } = useUserStore();

  // Unified send-OTP: calls register-by-phone which handles both new users (register + OTP)
  // and existing users (auto-login or send OTP). Safe JSON parsing guards against empty bodies.
  const sendLoginOtp = useCallback(async (phone: string, isCustomer: boolean) => {
    try {
      const cleaned = phone.replace(/\s+/g, "").replace(/^\+/, "");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/User/register-by-phone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: cleaned, isCustomer }),
      });

      // Safely parse JSON — empty bodies (405/500) would otherwise crash
      let data: any = {};
      const text = await res.text();
      if (text) {
        try { data = JSON.parse(text); } catch { /* ignore parse error */ }
      }

      if (!res.ok) {
        return { success: false, error: data.messages?.[0] ?? `Server error (${res.status})` };
      }
      if (data.succeeded === false) {
        return { success: false, error: data.messages?.[0] ?? "Failed to send OTP" };
      }
      return { success: true, message: data.messages?.[0] ?? "OTP sent successfully!" };
    } catch (err: any) {
      return { success: false, error: "Could not reach server. Is the backend running?" };
    }
  }, []);

  const resendOtp = useCallback(async (phone: string, isCustomer: boolean) => {
    try {
      const cleaned = phone.replace(/\s+/g, "").replace(/^\+/, "");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/User/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: cleaned, isCustomer }),
      });

      let data: any = {};
      const text = await res.text();
      if (text) {
        try { data = JSON.parse(text); } catch { /* ignore parse error */ }
      }

      if (!res.ok) {
        return { success: false, error: data.messages?.[0] ?? `Server error (${res.status})` };
      }
      if (data.succeeded === false) {
        return { success: false, error: data.messages?.[0] ?? "Failed to resend OTP" };
      }
      return { success: true, message: data.messages?.[0] ?? "OTP resent successfully!" };
    } catch (err: any) {
      return { success: false, error: "Could not reach server. Is the backend running?" };
    }
  }, []);

  const verifyLoginOtp = useCallback(
    async (phone: string, otp: string, isCustomer: boolean, redirectTo?: string) => {
      try {
        const cleaned = phone.replace(/\s+/g, "").replace(/^\+/, "");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/User/verify-phone-registration-otp`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber: cleaned, otp: parseInt(otp, 10), isCustomer }),
          }
        );
        const text = await res.text();
        let data: any = {};
        if (text) {
          try { data = JSON.parse(text); } catch { /* ignore */ }
        }

        if (!res.ok) {
          return { success: false, error: data.messages?.[0] ?? `Server error (${res.status})` };
        }
        if (data.succeeded === false) {
          return { success: false, error: data.messages?.[0] ?? "Invalid OTP" };
        }

        // Backend may return token either nested (Result<T> wrapper) or at root level (direct AuthResponse)
        const authData = data.data ?? data;
        const accessToken = authData?.token ?? authData?.accessToken;
        if (!accessToken) {
          return { success: false, error: "Access token not received from server." };
        }

        const decoded = parseJwt(accessToken);
        const userId =
          decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ??
          decoded?.sub;
        const email =
          decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ??
          decoded?.email;
        const name =
          decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ??
          decoded?.unique_name ??
          "User";
        const rolesClaim =
          decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
          decoded?.role;
        const roles = Array.isArray(rolesClaim) ? rolesClaim : rolesClaim ? [rolesClaim] : [];

        const userRole = roles.includes("Worker") ? "Worker" : "Customer";

        login(
          accessToken,
          {
            id: userId ?? "unknown",
            name: name,
            email: email ?? "",
            phone: cleaned,
            location: "",
            avatar:
              authData?.userImageURL ??
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
          },
          userRole
        );

        router.push(redirectTo || "/dashboard");
        return { success: true };
      } catch (err: any) {
        return { success: false, error: "Could not reach server. Is the backend running?" };
      }
    },
    [login, router]
  );

  /** Initiate phone-based registration — sends OTP to the given number. */
  const registerByPhone = useCallback(
    (phoneNumber: string, isCustomer: boolean) =>
      authService.registerByPhone({ phoneNumber, isCustomer }),
    []
  );

  /** Verify the OTP and complete phone-based registration. */
  const verifyPhoneOtp = useCallback(
    (phoneNumber: string, otp: number) => authService.verifyPhoneOtp({ phoneNumber, otp }),
    []
  );

  const signOut = useCallback(() => {
    logout();
    router.push("/");
  }, [logout, router]);

  return {
    isAuthenticated,
    user,
    token,
    role,
    sendLoginOtp,
    verifyLoginOtp,
    resendOtp,
    signOut,
    registerByPhone,
    verifyPhoneOtp,
  };
}
