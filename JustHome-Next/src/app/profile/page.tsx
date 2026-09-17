"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/features/auth/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { profileService, CustomerProfileDto, WorkerProfileDto } from "@/services/profile.service";
import { Upload, CheckCircle2, User, Briefcase, FileText, IndianRupee, MapPin } from "lucide-react";
import { AddressStep } from "@/components/booking/address-step";

export default function ProfilePage() {
  const { user, token, role, signOut, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Customer Profile State
  const [customerProfile, setCustomerProfile] = useState<CustomerProfileDto>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: 0,
    referralCode: "",
    profileImageUrl: "",
  });

  // Worker Profile State
  const [workerProfile, setWorkerProfile] = useState<WorkerProfileDto>({
    firstName: "",
    lastName: "",
    workerCode: "",
    profileImageUrl: "",
    aadhaarNumber: "",
    panNumber: "",
    bankAccountNumber: "",
    bankIfscCode: "",
    healthInsurancePolicyNo: "",
    accidentInsurancePolicyNo: "",
    primaryServiceCategoryId: "",
    workerSkillId: "",
    isAvailable: true,
    address: {
      houseNo: "",
      floor: "",
      landmark: "",
      fullAddress: "",
      latitude: undefined,
      longitude: undefined,
    },
  });

  // Skill Dropdown list
  const [skills, setSkills] = useState<any[]>([]);
  const [serviceCategories, setServiceCategories] = useState<any[]>([]);

  // Filter skills by the selected primary service category
  const filteredSkills = workerProfile.primaryServiceCategoryId
    ? skills.filter((s) => s.serviceCategoryId === workerProfile.primaryServiceCategoryId)
    : skills;

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    async function loadData() {
      setIsLoading(true);
      setErrorMsg("");
      try {
        if (role === "Customer") {
          const res = await profileService.getCustomerProfile();
          if (res.success && res.data) {
            setCustomerProfile(res.data);
          } else {
            // Profile does not exist yet - default to user name
            const nameParts = (user?.name ?? "").trim().split(/\s+/);
            setCustomerProfile({
              firstName: nameParts[0] ?? "",
              lastName: nameParts.slice(1).join(" ") ?? "",
              profileImageUrl: user?.avatar ?? "",
            });
          }
        } else if (role === "Worker") {
          // Load Profile
          const profileRes = await profileService.getWorkerProfile();
          if (profileRes.success && profileRes.data) {
            setWorkerProfile({
              ...profileRes.data,
              address: profileRes.data.address ?? {
                houseNo: "",
                floor: "",
                landmark: "",
                fullAddress: "",
              },
            });
          } else {
            // Worker profile does not exist yet
            const nameParts = (user?.name ?? "").trim().split(/\s+/);
            setWorkerProfile((prev) => ({
              ...prev,
              firstName: nameParts[0] ?? "",
              lastName: nameParts.slice(1).join(" ") ?? "",
              profileImageUrl: user?.avatar ?? "",
            }));
          }

          // Load Skills
          const skillsRes = await profileService.getSkills();
          if (skillsRes.success && skillsRes.data) {
            const raw = skillsRes.data;
            const list = Array.isArray(raw) ? raw : raw.data ?? [];
            setSkills(list);
          } else {
            console.error("Failed to load worker skills:", skillsRes.error);
          }

          // Load Categories via service
          const catsRes = await profileService.getServiceCategories();
          if (catsRes.success && catsRes.data) {
            const raw = catsRes.data;
            const list = Array.isArray(raw) ? raw : raw.data ?? [];
            setServiceCategories(list);
          } else {
            console.error("Failed to load service categories:", catsRes.error);
          }
        }
      } catch (err: any) {
        setErrorMsg("Failed to load profile data.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [isAuthenticated, token, role, user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File size exceeds 10MB limit.");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await profileService.uploadProfileImage(file);
      if (res.success && res.data?.url) {
        // If the server returns a relative path (/uploads/...) prefix the API base URL
        const raw = res.data.url;
        const imageUrl = raw.startsWith("/")
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${raw}`
          : raw;
        if (role === "Customer") {
          setCustomerProfile((prev) => ({ ...prev, profileImageUrl: imageUrl }));
        } else {
          setWorkerProfile((prev) => ({ ...prev, profileImageUrl: imageUrl }));
        }
        setSuccessMsg("Image uploaded! Click Save Changes to update your profile.");
      } else {
        setErrorMsg(res.error ?? "Failed to upload image.");
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Image upload failed.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await profileService.saveCustomerProfile(customerProfile);
      if (res.success) {
        setSuccessMsg("Profile saved successfully!");
        if (res.data) {
          setCustomerProfile((prev) => ({ ...prev, id: res.data }));
        }
      } else {
        setErrorMsg(res.error ?? "Failed to save profile.");
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Save failed.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Basic client-side validation
    if (!workerProfile.workerCode.trim()) {
      setErrorMsg("Worker Code is required.");
      return;
    }
    if (workerProfile.aadhaarNumber && !/^\d{12}$/.test(workerProfile.aadhaarNumber)) {
      setErrorMsg("Aadhaar Number must be exactly 12 digits.");
      return;
    }
    if (workerProfile.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(workerProfile.panNumber)) {
      setErrorMsg("PAN Number must be 10 characters in format ABCDE1234F.");
      return;
    }
    if (workerProfile.bankIfscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(workerProfile.bankIfscCode)) {
      setErrorMsg("Invalid IFSC Code format.");
      return;
    }
    if (!workerProfile.address?.fullAddress.trim()) {
      setErrorMsg("Full Address is required.");
      return;
    }

    setIsSaving(true);
    try {
      let lat = workerProfile.address?.latitude;
      let lng = workerProfile.address?.longitude;

      if ((!lat || !lng) && typeof window !== "undefined" && window.google?.maps) {
        const geocoder = new window.google.maps.Geocoder();
        try {
          const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode({ address: workerProfile.address!.fullAddress }, (res, status) => {
              if (status === "OK" && res && res.length > 0) resolve(res);
              else reject(new Error(`Geocoding status: ${status}`));
            });
          });
          if (results && results[0]) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
          }
        } catch (err) {
          console.warn("Worker address geocoding failed", err);
        }
      }

      const payload = {
        ...workerProfile,
        address: {
          ...workerProfile.address,
          latitude: lat,
          longitude: lng,
        }
      };

      const res = await profileService.saveWorkerProfile(payload);
      if (res.success) {
        setSuccessMsg("Profile saved successfully!");
        if (res.data) {
          setWorkerProfile((prev) => ({
            ...prev,
            id: res.data,
            address: {
              ...prev.address!,
              latitude: lat,
              longitude: lng,
            }
          }));
        }
      } else {
        setErrorMsg(res.error ?? "Failed to save profile.");
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Save failed.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <h1 className="font-display text-2xl font-semibold">Please sign in</h1>
        <Link href="/auth" className="inline-block mt-4">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent mx-auto" />
        <p className="text-sm text-muted-foreground mt-4">Loading your profile details…</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 mb-8">
          <div>
            <h1 className="font-display text-4xl font-semibold text-primary dark:text-foreground">
              Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal and business details
            </p>
          </div>
          <div className="flex items-center gap-2">
            {role === "Customer" && (
              <Link href="/profile/addresses">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  My Addresses
                </Button>
              </Link>
            )}
            {role === "Worker" && (
              <>
                <Link href="/profile/documents">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Documents
                  </Button>
                </Link>
                <Link href="/profile/earnings">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    Earnings
                  </Button>
                </Link>
              </>
            )}
            <Button variant="outline" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Messaging */}
        {successMsg && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm px-4 py-3 rounded-xl mb-6">
            <CheckCircle2 className="h-5 w-5" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
            {errorMsg}
          </div>
        )}

        <Card hover={false} className="p-8">
          {/* Avatar Upload Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative h-24 w-24 rounded-2xl overflow-hidden group border-2 border-accent/20">
              {/* Use plain <img> to avoid Next.js Image optimizer rejecting the self-signed localhost cert */}
              <img
                src={
                  (role === "Customer"
                    ? customerProfile.profileImageUrl
                    : workerProfile.profileImageUrl) ||
                  user.avatar ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                }
                alt="Profile Avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop";
                }}
                className="object-cover w-full h-full"
              />
              <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                <Upload className="h-5 w-5" />
                <span className="text-[10px] mt-1">Upload</span>
                <input
                  type="file"
                  accept="image/jpg,image/jpeg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-primary dark:text-foreground">
                {role === "Customer"
                  ? `${customerProfile.firstName} ${customerProfile.lastName}`.trim() || user.name
                  : `${workerProfile.firstName} ${workerProfile.lastName}`.trim() || user.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">{user.email || user.phone}</p>
              <div className="flex items-center gap-2 mt-2 px-2.5 py-1 rounded-lg bg-accent/10 border border-accent/20 w-fit">
                {role === "Customer" ? (
                  <User className="h-3.5 w-3.5 text-accent" />
                ) : (
                  <Briefcase className="h-3.5 w-3.5 text-accent" />
                )}
                <span className="text-xs font-semibold text-accent">{role} Account</span>
              </div>
            </div>
          </div>

          {/* Form */}
          {role === "Customer" ? (
            <form onSubmit={handleSaveCustomer} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={customerProfile.firstName}
                  onChange={(e) =>
                    setCustomerProfile((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                  required
                />
                <Input
                  label="Last Name"
                  value={customerProfile.lastName}
                  onChange={(e) =>
                    setCustomerProfile((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                  required
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Date of Birth</label>
                  <input
                    type="date"
                    value={customerProfile.dateOfBirth?.split("T")[0] ?? ""}
                    onChange={(e) =>
                      setCustomerProfile((prev) => ({ ...prev, dateOfBirth: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Gender</label>
                  <select
                    value={customerProfile.gender ?? 0}
                    onChange={(e) =>
                      setCustomerProfile((prev) => ({ ...prev, gender: parseInt(e.target.value) }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                  >
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                    <option value={2}>Other</option>
                  </select>
                </div>
                <Input
                  label="Referral Code (optional)"
                  value={customerProfile.referralCode ?? ""}
                  onChange={(e) =>
                    setCustomerProfile((prev) => ({ ...prev, referralCode: e.target.value }))
                  }
                  placeholder="Enter referral code if you have one"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <Button type="submit" disabled={isSaving} className="px-8">
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSaveWorker} className="space-y-6">
              <h3 className="font-semibold text-lg text-primary dark:text-foreground">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={workerProfile.firstName}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                  required
                />
                <Input
                  label="Last Name"
                  value={workerProfile.lastName}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                  required
                />
                <Input
                  label="Worker Code"
                  value={workerProfile.workerCode}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({ ...prev, workerCode: e.target.value }))
                  }
                  placeholder="Unique worker code"
                  required
                />
                <Input
                  label="Aadhaar Card Number"
                  value={workerProfile.aadhaarNumber || ""}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({
                      ...prev,
                      aadhaarNumber: e.target.value.replace(/\D/g, "").slice(0, 12),
                    }))
                  }
                  placeholder="12-digit Aadhaar"
                  maxLength={12}
                  required
                />
                <Input
                  label="PAN Card Number"
                  value={workerProfile.panNumber || ""}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({
                      ...prev,
                      panNumber: e.target.value.toUpperCase().slice(0, 10),
                    }))
                  }
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  required
                />
              </div>

              <h3 className="font-semibold text-lg text-primary dark:text-foreground pt-4">
                Service & Skill Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Primary Service Category
                  </label>
                  <select
                    value={workerProfile.primaryServiceCategoryId}
                    onChange={(e) =>
                      setWorkerProfile((prev) => ({
                        ...prev,
                        primaryServiceCategoryId: e.target.value,
                        // Clear assigned skill when category changes
                        workerSkillId: "",
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    required
                  >
                    <option value="">Select Category</option>
                    {serviceCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skill Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Assigned Worker Skill
                  </label>
                  <select
                    value={workerProfile.workerSkillId || ""}
                    onChange={(e) =>
                      setWorkerProfile((prev) => ({ ...prev, workerSkillId: e.target.value }))
                    }
                    disabled={!workerProfile.primaryServiceCategoryId}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {workerProfile.primaryServiceCategoryId ? "Select Skill" : "Select Category First"}
                    </option>
                    {filteredSkills.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h3 className="font-semibold text-lg text-primary dark:text-foreground pt-4">
                Bank Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Bank Account Number"
                  value={workerProfile.bankAccountNumber || ""}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({ ...prev, bankAccountNumber: e.target.value }))
                  }
                  required
                />
                <Input
                  label="Bank IFSC Code"
                  value={workerProfile.bankIfscCode || ""}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({
                      ...prev,
                      bankIfscCode: e.target.value.toUpperCase().slice(0, 11),
                    }))
                  }
                  placeholder="ABCD0EF1234"
                  maxLength={11}
                  required
                />
              </div>

              <h3 className="font-semibold text-lg text-primary dark:text-foreground pt-4">
                Insurance Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Health Insurance Policy No"
                  value={workerProfile.healthInsurancePolicyNo || ""}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({
                      ...prev,
                      healthInsurancePolicyNo: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Accident Insurance Policy No"
                  value={workerProfile.accidentInsurancePolicyNo || ""}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({
                      ...prev,
                      accidentInsurancePolicyNo: e.target.value,
                    }))
                  }
                />
              </div>

              <AddressStep
                address={{
                  line1: workerProfile.address?.houseNo || "",
                  line2: workerProfile.address?.landmark || "",
                  city: "",
                  pincode: "",
                  latitude: workerProfile.address?.latitude,
                  longitude: workerProfile.address?.longitude,
                }}
                onChange={(data) => {
                  setWorkerProfile((prev) => {
                    const currentAddress = prev.address || { houseNo: "", floor: "", landmark: "", fullAddress: "" };
                    const updatedAddress = {
                      ...currentAddress,
                      latitude: data.latitude !== undefined ? data.latitude : currentAddress.latitude,
                      longitude: data.longitude !== undefined ? data.longitude : currentAddress.longitude,
                    };
                    if (data.line1 !== undefined) updatedAddress.houseNo = data.line1;
                    if (data.line2 !== undefined) updatedAddress.landmark = data.line2;

                    const parts = [
                      updatedAddress.houseNo,
                      currentAddress.floor,
                      updatedAddress.landmark,
                      data.city,
                      data.pincode
                    ].filter(Boolean);

                    updatedAddress.fullAddress = parts.join(", ").replace(/,\s*,/g, ",").trim();

                    return {
                      ...prev,
                      address: updatedAddress,
                    };
                  });
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Floor"
                  value={workerProfile.address?.floor || ""}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({
                      ...prev,
                      address: { ...prev.address!, floor: e.target.value },
                    }))
                  }
                />
                <Input
                  label="Full Address Preview"
                  value={workerProfile.address?.fullAddress || ""}
                  onChange={(e) =>
                    setWorkerProfile((prev) => ({
                      ...prev,
                      address: { ...prev.address!, fullAddress: e.target.value },
                    }))
                  }
                  required
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <Button type="submit" disabled={isSaving} className="px-8">
                  {isSaving ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
