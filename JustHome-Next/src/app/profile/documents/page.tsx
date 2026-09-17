"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { profileService, WorkerDocumentDto, WorkerProfileDto } from "@/services/profile.service";
import { FileText, Upload, RefreshCw, Trash2, ArrowLeft, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const docTypes = [
  { value: 0, label: "Aadhaar Card" },
  { value: 1, label: "PAN Card" },
  { value: 2, label: "Police Verification" },
  { value: 3, label: "Skill Certificate" },
  { value: 4, label: "Other Document" },
];

export default function WorkerDocumentsPage() {
  const { user, token, role, isAuthenticated } = useAuth();
  const [workerProfile, setWorkerProfile] = useState<WorkerProfileDto | null>(null);
  const [documents, setDocuments] = useState<WorkerDocumentDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState<number | null>(null); // maps type
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isPreviewing, setIsPreviewing] = useState<string | null>(null);

  const loadDocuments = async (workerId: string) => {
    setIsLoading(true);
    try {
      const res = await profileService.getWorkerDocuments(workerId);
      if (res.success && res.data) {
        setDocuments(res.data);
      }
    } catch (err: any) {
      setErrorMsg("Failed to load documents.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !token || role !== "Worker") return;

    async function loadProfileAndDocs() {
      try {
        const res = await profileService.getWorkerProfile();
        if (res.success && res.data) {
          setWorkerProfile(res.data);
          if (res.data.id) {
            await loadDocuments(res.data.id);
          }
        } else {
          setErrorMsg("Please create your worker profile first before managing documents.");
          setIsLoading(false);
        }
      } catch (err: any) {
        setErrorMsg("Failed to load worker profile.");
        setIsLoading(false);
      }
    }

    loadProfileAndDocs();
  }, [isAuthenticated, token, role]);

  const handleUpload = async (documentType: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !workerProfile?.id) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File exceeds 10MB size limit.");
      return;
    }

    setIsUploading(documentType);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await profileService.uploadWorkerDocument(documentType, file, undefined, workerProfile.id);
      if (res.success) {
        setSuccessMsg("Document uploaded successfully for verification!");
        await loadDocuments(workerProfile.id);
      } else {
        setErrorMsg(res.error ?? "Failed to upload document.");
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Upload failed.");
    } finally {
      setIsUploading(null);
    }
  };

  const handleReplace = async (docId: string, documentType: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !workerProfile?.id) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File exceeds 10MB size limit.");
      return;
    }

    setIsUploading(documentType);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await profileService.replaceWorkerDocument(docId, documentType, file);
      if (res.success) {
        setSuccessMsg("Document replaced successfully!");
        await loadDocuments(workerProfile.id);
      } else {
        setErrorMsg(res.error ?? "Failed to replace document.");
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Replace failed.");
    } finally {
      setIsUploading(null);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    if (!workerProfile?.id) return;

    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await profileService.deleteWorkerDocument(docId);
      if (res.success) {
        setSuccessMsg("Document deleted successfully.");
        await loadDocuments(workerProfile.id);
      } else {
        setErrorMsg(res.error ?? "Failed to delete document.");
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Delete failed.");
    }
  };

  const handlePreview = async (docId: string) => {
    setIsPreviewing(docId);
    setErrorMsg("");
    try {
      const blob = await profileService.downloadWorkerDocument(docId);
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err: any) {
      setErrorMsg("Failed to load document preview.");
    } finally {
      setIsPreviewing(null);
    }
  };

  if (!isAuthenticated || role !== "Worker") {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <h1 className="font-display text-2xl font-semibold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">Only worker accounts can access this screen.</p>
        <Link href="/" className="inline-block mt-4"><Button>Go Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* Back navigation */}
        <Link href="/profile" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Profile
        </Link>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-semibold text-primary dark:text-foreground">Worker Documents</h1>
          <p className="text-muted-foreground mt-1">Upload and manage verification credentials (Aadhaar, PAN, Police checks)</p>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm px-4 py-3 rounded-xl mb-6">
            <CheckCircle2 className="h-5 w-5 animate-pulse" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
            {errorMsg}
          </div>
        )}

        {/* Documents Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent mx-auto" />
            <p className="text-sm text-muted-foreground mt-4">Loading your documents...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {docTypes.map((type) => {
              // Find if document already exists
              const doc = documents.find((d) => d.documentType === type.value);

              return (
                <Card key={type.value} hover={false} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary dark:text-foreground text-lg">{type.label}</h3>
                        {doc ? (
                          <div className="mt-2 flex flex-wrap items-center gap-3">
                            {/* Verification Status Badge */}
                            {doc.verificationStatus === 0 && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-yellow-600 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-md">
                                <Clock className="h-3 w-3" /> Pending Verification
                              </span>
                            )}
                            {doc.verificationStatus === 1 && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                                <CheckCircle2 className="h-3 w-3" /> Verified / Approved
                              </span>
                            )}
                            {doc.verificationStatus === 2 && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md">
                                <AlertCircle className="h-3 w-3" /> Rejected
                              </span>
                            )}

                            {/* View File Link */}
                            <button
                              onClick={() => handlePreview(doc.id)}
                              disabled={isPreviewing !== null}
                              className="text-xs text-accent hover:underline disabled:opacity-50"
                            >
                              {isPreviewing === doc.id ? "Loading..." : "Download / Preview"}
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-1">Not uploaded yet. Required for profile verification.</p>
                        )}
                        {/* Rejection reason */}
                        {doc?.rejectionReason && (
                          <div className="mt-3 text-xs text-red-500 bg-red-500/5 border border-red-500/10 px-3 py-2 rounded-lg">
                            <strong>Rejection Reason:</strong> {doc.rejectionReason}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {doc ? (
                        <>
                          {/* Replace Action */}
                          <label className={`inline-flex items-center justify-center gap-2 border border-border bg-background text-foreground hover:bg-muted font-medium text-xs py-2 px-3 rounded-lg cursor-pointer transition-colors ${isUploading === type.value ? "opacity-50 pointer-events-none" : ""}`}>
                            <RefreshCw className="h-3.5 w-3.5" />
                            Replace
                            <input type="file" accept="image/jpg,image/jpeg,image/png,application/pdf" className="hidden" onChange={(e) => handleReplace(doc.id, type.value, e)} disabled={isUploading !== null} />
                          </label>

                          {/* Delete Action */}
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(doc.id)} disabled={isUploading !== null}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      ) : (
                        /* Upload Action */
                        <label className={`inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground shadow-glow hover:bg-accent/90 font-medium text-xs py-2 px-4 rounded-lg cursor-pointer transition-colors ${isUploading === type.value ? "opacity-50 pointer-events-none" : ""}`}>
                          <Upload className="h-3.5 w-3.5" />
                          {isUploading === type.value ? "Uploading..." : "Upload File"}
                          <input type="file" accept="image/jpg,image/jpeg,image/png,application/pdf" className="hidden" onChange={(e) => handleUpload(type.value, e)} disabled={isUploading !== null || !workerProfile?.id} />
                        </label>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
