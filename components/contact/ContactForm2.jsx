"use client";
import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";

// ── Static data ───────────────────────────────────────────────────────────────
const INSURANCE_TYPES = [
  { value: "health",  label: "Health Insurance" },
  { value: "life",    label: "Life Insurance" },
  { value: "motor",   label: "Motor / Vehicle Insurance" },
  { value: "home",    label: "Home Insurance" },
  { value: "travel",  label: "Travel Insurance" },
  { value: "other",   label: "Other" },
];

const COMPLAINT_TYPES = [
  { value: "claim_rejection",    label: "Claim Rejection" },
  { value: "delayed_claim",      label: "Delayed Claim Processing" },
  { value: "short_settlement",   label: "Short / Partial Settlement" },
  { value: "mis_selling",        label: "Mis-selling of Policy" },
  { value: "policy_cancellation",label: "Policy Cancellation / Refund" },
  { value: "non_disclosure",     label: "Non-disclosure Rejection" },
  { value: "other",              label: "Other" },
];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli","Daman & Diu",
  "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry",
];

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const INITIAL_FORM = {
  fullName: "", mobile: "", email: "", city: "", state: "",
  insurerName: "", policyNumber: "", insuranceType: "", complaintType: "",
  claimAmount: "", description: "", consent: false,
};

// ── Field wrapper — defined at MODULE level so its identity never changes
// between renders. Receives errors as an explicit prop.
// (Defining components inside another component causes them to be treated as
//  a new type on every render, forcing unmount/remount and losing focus.)
function Field({ name, label, required, children, errors }) {
  return (
    <div className="input-group-meta form-group mb-25">
      <label className="d-block">
        {label}
        {required && <span style={{ color: "#dc3545" }}> *</span>}
      </label>
      {children}
      {errors[name] && (
        <p
          className="field-error"
          style={{ margin: "5px 0 0", fontSize: "12px", color: "#dc3545" }}
        >
          {errors[name]}
        </p>
      )}
    </div>
  );
}

// ── inputStyle — module-level pure function, no closure over state
function inputStyle(name, errors) {
  return { borderColor: errors[name] ? "#dc3545" : undefined };
}

// ── File Upload Box sub-component ─────────────────────────────────────────────
function FileUploadBox({ label, subLabel, docType, required, multiple, files, onSelect, onRemove, error }) {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = multiple
      ? Array.from(e.dataTransfer.files)
      : [e.dataTransfer.files[0]];
    onSelect(dropped, docType);
  };

  const handleChange = (e) => {
    const selected = multiple
      ? Array.from(e.target.files)
      : [e.target.files[0]];
    onSelect(selected, docType);
    e.target.value = "";
  };

  const fileList = Array.isArray(files) ? files : (files ? [files] : []);

  return (
    <div className="mb-30">
      <label className="d-block fw-500 mb-10" style={{ fontSize: "14px", color: "#1a1a2e" }}>
        {label} {required && <span style={{ color: "#dc3545" }}>*</span>}
      </label>
      {subLabel && (
        <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px", marginTop: "-4px" }}>
          {subLabel}
        </p>
      )}

      {/* Drop Zone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${error ? "#dc3545" : "#c5d5f0"}`,
          borderRadius: "10px",
          padding: "20px 16px",
          textAlign: "center",
          cursor: "pointer",
          background: "#f8faff",
          transition: "border-color 0.2s",
        }}
        onMouseEnter={(e) => { if (!error) e.currentTarget.style.borderColor = "#0d6efd"; }}
        onMouseLeave={(e) => { if (!error) e.currentTarget.style.borderColor = "#c5d5f0"; }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" strokeWidth="1.5" style={{ marginBottom: "8px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#374151", fontWeight: 500 }}>
          Click to upload or drag &amp; drop
        </p>
        <p style={{ margin: 0, fontSize: "11px", color: "#9ca3af" }}>
          PDF, JPG or PNG — max 10 MB {multiple ? "(multiple files allowed)" : ""}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        multiple={multiple}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {error && (
        <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#dc3545" }}>{error}</p>
      )}

      {/* Selected files list */}
      {fileList.length > 0 && (
        <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {fileList.map((file, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px",
                padding: "8px 12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d6efd">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                  <polyline points="14 2 14 8 20 8" fill="none" stroke="#0d6efd" strokeWidth="2"/>
                </svg>
                <span style={{ fontSize: "12px", color: "#1e40af", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}
                </span>
                <span style={{ fontSize: "11px", color: "#6b7280", whiteSpace: "nowrap" }}>
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(docType, i)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#dc3545", flexShrink: 0 }}
                aria-label="Remove file"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Success Screen ─────────────────────────────────────────────────────────────
function SuccessScreen({ referenceNo }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{
        width: "72px", height: "72px", borderRadius: "50%",
        background: "#d1fae5", margin: "0 auto 20px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3 style={{ color: "#1a1a2e", fontWeight: 700, marginBottom: "8px", fontSize: "22px" }}>
        Case Submitted Successfully!
      </h3>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px", lineHeight: "1.6" }}>
        Thank you for reaching out. Our expert team will review your case and contact you within <strong>24 hours</strong>.
      </p>

      {/* Reference Number */}
      <div style={{
        background: "#eff6ff", border: "2px solid #bfdbfe", borderRadius: "12px",
        padding: "20px 24px", marginBottom: "24px", display: "inline-block", minWidth: "260px",
      }}>
        <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>
          Your Reference Number
        </p>
        <p style={{ margin: "0", fontSize: "26px", fontWeight: 700, color: "#0d6efd", letterSpacing: "1px" }}>
          {referenceNo}
        </p>
        <p style={{ margin: "6px 0 0", fontSize: "11px", color: "#6b7280" }}>
          Save this for tracking your case
        </p>
      </div>

      <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "20px" }}>
        A confirmation email has been sent to your inbox.
      </p>

      {/* WhatsApp CTA */}
      <a
        href={`https://wa.me/91XXXXXXXXXX?text=Hi, I just submitted my case. Reference: ${referenceNo}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "#25d366", color: "#fff", padding: "12px 24px",
          borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "14px",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.549 4.11 1.512 5.84L.057 23.569a.75.75 0 00.914.914l5.729-1.455A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.731 9.731 0 01-4.908-1.321l-.352-.209-3.652.928.944-3.535-.23-.366A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
        Chat with us on WhatsApp
      </a>
    </div>
  );
}

// ── Main Form Component ────────────────────────────────────────────────────────
const ContactForm2 = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [filesByType, setFilesByType] = useState({
    rejection_letter: [],
    policy_doc: [],
    other: [],
  });
  const [errors, setErrors] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStep, setUploadStep] = useState("");
  const [serverError, setServerError] = useState("");
  const [uploadWarning, setUploadWarning] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState("");

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFilesSelect = (newFiles, docType) => {
    const errs = {};
    const valid = [];

    for (const file of newFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        errs[docType] = "Only PDF, JPG or PNG files are allowed.";
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        errs[docType] = `${file.name} exceeds the 10 MB limit.`;
        continue;
      }
      valid.push(file);
    }

    setFileErrors((prev) => ({ ...prev, [docType]: errs[docType] || "" }));

    if (valid.length === 0) return;

    setFilesByType((prev) => {
      if (docType === "rejection_letter" || docType === "policy_doc") {
        return { ...prev, [docType]: [valid[0]] };
      }
      return { ...prev, [docType]: [...prev[docType], ...valid] };
    });
  };

  const handleFileRemove = (docType, index) => {
    setFilesByType((prev) => ({
      ...prev,
      [docType]: prev[docType].filter((_, i) => i !== index),
    }));
  };

  // ── Validate ─────────────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim())      newErrors.fullName    = "Full name is required";
    if (!formData.mobile.trim())        newErrors.mobile      = "Mobile number is required";
    else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, "")))
                                        newErrors.mobile      = "Enter a valid 10-digit mobile number";
    if (!formData.email.trim())         newErrors.email       = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                        newErrors.email       = "Enter a valid email address";
    if (!formData.city.trim())          newErrors.city        = "City is required";
    if (!formData.state)                newErrors.state       = "State is required";
    if (!formData.insurerName.trim())   newErrors.insurerName = "Insurance company is required";
    if (!formData.insuranceType)        newErrors.insuranceType = "Please select insurance type";
    if (!formData.complaintType)        newErrors.complaintType = "Please select nature of complaint";
    if (!formData.description.trim())   newErrors.description = "Please describe your issue";
    else if (formData.description.trim().length < 20)
                                        newErrors.description = "Please provide at least 20 characters";
    if (!formData.consent)              newErrors.consent     = "You must agree to be contacted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Upload a single file to Vercel Blob ───────────────────────────────────────
  const uploadFile = async (file, docType) => {
    const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `claims/${docType}/${Date.now()}-${sanitized}`;

    const blob = await upload(filename, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });

    return {
      type: docType,
      name: file.name,
      url: blob.url,
      size: file.size,
    };
  };

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      const firstErr = document.querySelector(".field-error");
      if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsLoading(true);
    setUploadWarning("");

    // ── Phase 1: Upload files (graceful — failure warns but does not block) ─
    const allFiles = [
      ...filesByType.rejection_letter.map((f) => ({ file: f, type: "rejection_letter" })),
      ...filesByType.policy_doc.map((f)       => ({ file: f, type: "policy_doc" })),
      ...filesByType.other.map((f)            => ({ file: f, type: "other" })),
    ];

    const uploadedDocs = [];

    if (allFiles.length > 0) {
      try {
        for (let i = 0; i < allFiles.length; i++) {
          setUploadStep(`Uploading document ${i + 1} of ${allFiles.length}…`);
          const result = await uploadFile(allFiles[i].file, allFiles[i].type);
          uploadedDocs.push(result);
        }
      } catch (uploadErr) {
        console.error("File upload error:", uploadErr);
        // Do NOT block submission — warn and continue without docs
        setUploadWarning(
          "Documents could not be uploaded and will not be attached to your case. " +
          "Your case will still be submitted. You can send documents separately to support@getclaims.in."
        );
        // uploadedDocs stays empty; submission proceeds below
      }
    }

    // ── Phase 2: Submit form data + blob URLs ────────────────────────────────
    try {
      setUploadStep("Saving your case…");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, documents: uploadedDocs }),
      });

      // Safely parse JSON — Vercel may return an HTML error page on hard crashes
      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error(`Server error (HTTP ${response.status}). Please try again in a moment.`);
      }

      if (result.success) {
        setReferenceNo(result.referenceNo);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (result.errors) {
        setErrors(result.errors);
      } else {
        setServerError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setServerError(err.message || "Unable to submit. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
      setUploadStep("");
    }
  };

  // ── Render Success ────────────────────────────────────────────────────────────
  if (submitted) return <SuccessScreen referenceNo={referenceNo} />;

  // ── Render Form ───────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* ── Section: Personal Details ─────────────────────────────────────── */}
      <div style={{ marginBottom: "28px" }}>
        <h5 style={{
          fontSize: "13px", fontWeight: 700, color: "#0d6efd",
          textTransform: "uppercase", letterSpacing: "1px",
          borderBottom: "2px solid #e8f0fe", paddingBottom: "8px", marginBottom: "20px",
        }}>
          Personal Details
        </h5>

        <div className="row">
          <div className="col-md-6">
            <Field name="fullName" label="Full Name" required errors={errors}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Rajesh Kumar"
                style={inputStyle("fullName", errors)}
              />
            </Field>
          </div>
          <div className="col-md-6">
            <Field name="mobile" label="Mobile Number" required errors={errors}>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                style={inputStyle("mobile", errors)}
              />
            </Field>
          </div>
          <div className="col-md-6">
            <Field name="email" label="Email Address" required errors={errors}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="yourname@email.com"
                style={inputStyle("email", errors)}
              />
            </Field>
          </div>
          <div className="col-md-6">
            <Field name="city" label="City" required errors={errors}>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai"
                style={inputStyle("city", errors)}
              />
            </Field>
          </div>
          <div className="col-md-6">
            <Field name="state" label="State" required errors={errors}>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={{
                  width: "100%", height: "55px", padding: "0 16px", borderRadius: "8px",
                  border: `1px solid ${errors.state ? "#dc3545" : "#d1d5db"}`,
                  fontSize: "14px", color: formData.state ? "#1a1a2e" : "#9ca3af", background: "#fff",
                }}
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      </div>

      {/* ── Section: Claim Details ────────────────────────────────────────── */}
      <div style={{ marginBottom: "28px" }}>
        <h5 style={{
          fontSize: "13px", fontWeight: 700, color: "#0d6efd",
          textTransform: "uppercase", letterSpacing: "1px",
          borderBottom: "2px solid #e8f0fe", paddingBottom: "8px", marginBottom: "20px",
        }}>
          Claim Details
        </h5>

        <div className="row">
          <div className="col-md-6">
            <Field name="insurerName" label="Insurance Company Name" required errors={errors}>
              <input
                type="text"
                name="insurerName"
                value={formData.insurerName}
                onChange={handleChange}
                placeholder="e.g. Star Health Insurance"
                style={inputStyle("insurerName", errors)}
              />
            </Field>
          </div>
          <div className="col-md-6">
            <Field name="policyNumber" label="Policy Number" errors={errors}>
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                placeholder="e.g. P/211111/01/2024/001234"
              />
            </Field>
          </div>
          <div className="col-md-6">
            <Field name="insuranceType" label="Type of Insurance" required errors={errors}>
              <select
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleChange}
                style={{
                  width: "100%", height: "55px", padding: "0 16px", borderRadius: "8px",
                  border: `1px solid ${errors.insuranceType ? "#dc3545" : "#d1d5db"}`,
                  fontSize: "14px", color: formData.insuranceType ? "#1a1a2e" : "#9ca3af", background: "#fff",
                }}
              >
                <option value="">Select Type</option>
                {INSURANCE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="col-md-6">
            <Field name="complaintType" label="Nature of Complaint" required errors={errors}>
              <select
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                style={{
                  width: "100%", height: "55px", padding: "0 16px", borderRadius: "8px",
                  border: `1px solid ${errors.complaintType ? "#dc3545" : "#d1d5db"}`,
                  fontSize: "14px", color: formData.complaintType ? "#1a1a2e" : "#9ca3af", background: "#fff",
                }}
              >
                <option value="">Select Complaint Type</option>
                {COMPLAINT_TYPES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="col-md-6">
            <Field name="claimAmount" label="Claim Amount (₹)" errors={errors}>
              <input
                type="number"
                name="claimAmount"
                value={formData.claimAmount}
                onChange={handleChange}
                placeholder="e.g. 250000"
                min="0"
              />
            </Field>
          </div>
        </div>

        <Field name="description" label="Briefly Describe Your Issue" required errors={errors}>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Please describe what happened — when was the claim filed, why was it rejected or delayed, and any other relevant details…"
            style={{
              resize: "vertical", minHeight: "110px", width: "100%",
              padding: "14px 16px", borderRadius: "8px",
              border: `1px solid ${errors.description ? "#dc3545" : "#d1d5db"}`,
              fontSize: "14px", fontFamily: "inherit",
            }}
          />
        </Field>
      </div>

      {/* ── Section: Document Upload ─────────────────────────────────────── */}
      <div style={{ marginBottom: "28px" }}>
        <h5 style={{
          fontSize: "13px", fontWeight: 700, color: "#0d6efd",
          textTransform: "uppercase", letterSpacing: "1px",
          borderBottom: "2px solid #e8f0fe", paddingBottom: "8px", marginBottom: "6px",
        }}>
          Upload Documents
        </h5>
        <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "20px" }}>
          Attach supporting documents to speed up your case review. Accepted: PDF, JPG, PNG — max 10 MB each.
        </p>

        <FileUploadBox
          label="Claim Rejection Letter"
          subLabel="The letter from your insurer rejecting your claim"
          docType="rejection_letter"
          required={false}
          multiple={false}
          files={filesByType.rejection_letter}
          onSelect={handleFilesSelect}
          onRemove={handleFileRemove}
          error={fileErrors.rejection_letter}
        />

        <FileUploadBox
          label="Policy Document"
          subLabel="Your insurance policy schedule or certificate"
          docType="policy_doc"
          required={false}
          multiple={false}
          files={filesByType.policy_doc}
          onSelect={handleFilesSelect}
          onRemove={handleFileRemove}
          error={fileErrors.policy_doc}
        />

        <FileUploadBox
          label="Discharge Summary / Other Claim Related Documents"
          subLabel="Hospital discharge summary, bills, correspondence with insurer, or any other supporting documents"
          docType="other"
          required={false}
          multiple={true}
          files={filesByType.other}
          onSelect={handleFilesSelect}
          onRemove={handleFileRemove}
          error={fileErrors.other}
        />
      </div>

      {/* ── Consent ───────────────────────────────────────────────────────── */}
      <div className="mb-25">
        <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            style={{ marginTop: "3px", accentColor: "#0d6efd", width: "16px", height: "16px", flexShrink: 0 }}
          />
          <span style={{ fontSize: "13px", color: "#374151", lineHeight: "1.5" }}>
            I agree to be contacted by the GetClaims team regarding my case via call, WhatsApp, or email.
            I understand that initial consultation is <strong>free of charge</strong>.{" "}
            <span style={{ color: "#dc3545" }}>*</span>
          </span>
        </label>
        {errors.consent && (
          <p className="field-error" style={{ margin: "6px 0 0 26px", fontSize: "12px", color: "#dc3545" }}>
            {errors.consent}
          </p>
        )}
      </div>

      {/* ── Upload Warning (amber) ────────────────────────────────────────── */}
      {uploadWarning && (
        <div style={{
          background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "8px",
          padding: "12px 16px", marginBottom: "16px",
        }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#92400e" }}>⚠ {uploadWarning}</p>
        </div>
      )}

      {/* ── Server Error ──────────────────────────────────────────────────── */}
      {serverError && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px",
          padding: "12px 16px", marginBottom: "20px",
        }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#dc2626" }}>⚠ {serverError}</p>
        </div>
      )}

      {/* ── Submit ────────────────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-one fw-500 w-100 text-uppercase fs-14 d-block"
        style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
      >
        {isLoading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
              <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            {uploadStep || "Submitting…"}
          </span>
        ) : (
          "Submit Your Case — Free Consultation"
        )}
      </button>

      <p style={{ textAlign: "center", fontSize: "11px", color: "#9ca3af", marginTop: "12px" }}>
        🔒 Your information is secure and will never be shared with third parties.
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </form>
  );
};

export default ContactForm2;
