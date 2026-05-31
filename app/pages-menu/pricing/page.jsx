import Link from "next/link";
import Header from "@/components/home-page/home-10/Header";
import Footer from "@/components/home-page/home-10/Footer";
import CallToActions from "@/components/services/CallToActions";

export const metadata = {
  title: "Pricing | GetClaims — No Win, No Fee",
  description:
    "GetClaims charges zero upfront fees. We work on a No Win, No Fee basis — you only pay a success fee when your insurance claim is resolved in your favour.",
};

const steps = [
  {
    num: "01",
    title: "Free Consultation",
    desc: "Submit your case details online or call us. Our expert reviews your claim documents and gives you an honest assessment — completely free.",
    highlight: "₹0 — No charge",
    color: "#0d6efd",
  },
  {
    num: "02",
    title: "Case Filing & Follow-up",
    desc: "We prepare and file your complaint with the insurance company, IRDAI Grievance Cell, or Insurance Ombudsman and handle all correspondence on your behalf.",
    highlight: "No upfront cost",
    color: "#0d6efd",
  },
  {
    num: "03",
    title: "Resolution & Success Fee",
    desc: "Once your claim is successfully settled, a pre-agreed success fee (percentage of the settled amount) is charged. If we don't win, you pay nothing.",
    highlight: "Pay only on success",
    color: "#059669",
  },
];

const included = [
  "Free initial case assessment",
  "Document review and gap analysis",
  "Drafting of complaint letters",
  "IRDAI Grievance Cell filing",
  "Insurance Ombudsman representation",
  "Insurer follow-up and negotiations",
  "Regular case status updates",
  "Legal escalation support (if required)",
  "No hidden charges at any stage",
];

const faqs = [
  {
    q: "What is the 'No Win, No Fee' model?",
    a: "It means you pay us nothing upfront. We only charge a success fee — a percentage of the claim amount that is ultimately settled or awarded in your favour. If your case is not resolved, you owe us nothing.",
  },
  {
    q: "How much is the success fee?",
    a: "The success fee depends on the complexity and value of your case. It typically ranges between 10% and 20% of the settled amount. The exact percentage is agreed with you transparently before we begin work — no surprises.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No. There are zero hidden charges. The initial consultation, document review, case filing, and all follow-up activities are included at no cost. You only pay the agreed success fee on a positive outcome.",
  },
  {
    q: "What types of claims do you handle?",
    a: "We handle all types of insurance disputes — health, life, motor, home, and travel insurance — including claim rejections, delayed settlements, short settlements, mis-selling, and policy cancellation refunds.",
  },
  {
    q: "How long does the process take?",
    a: "Simple cases resolved at the insurer level typically take 4–8 weeks. IRDAI Grievance Cell complaints are resolved within 30–45 days. Insurance Ombudsman cases may take 2–4 months. We keep you updated throughout.",
  },
  {
    q: "What if my case requires legal action?",
    a: "If escalation to consumer courts or civil courts is required, we will advise you on the process. Legal fees in such cases are discussed and agreed separately before proceeding.",
  },
];

const PricingPage = () => {
  return (
    <>
      <Header />

      {/* ── Banner ───────────────────────────────────────────────────── */}
      <div className="inner-banner-three text-center p-30">
        <div
          className="bg-wrapper text-center"
          style={{ backgroundImage: "url(/images/assets/bg-17.svg)" }}
        >
          <div className="container">
            <div className="title-style-five">
              <h2 className="main-title tx-dark fw-bold">
                Simple, Transparent Pricing
              </h2>
            </div>
            <p className="fs-20 mt-30 lg-mt-20">
              Zero upfront cost. We only get paid when you win.
            </p>
          </div>
        </div>
      </div>

      {/* ── No Win No Fee Hero ──────────────────────────────────────── */}
      <div className="pt-80 pb-60 lg-pt-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 text-center">
              <div
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
                  borderRadius: "20px",
                  padding: "48px 40px",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: "#059669",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "6px 18px",
                    borderRadius: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Our Pricing Model
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 5vw, 48px)",
                    fontWeight: 800,
                    marginBottom: "16px",
                    color: "#fff",
                  }}
                >
                  No Win,{" "}
                  <span style={{ color: "#60a5fa" }}>No Fee</span>
                </h2>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#cbd5e1",
                    lineHeight: "1.7",
                    maxWidth: "560px",
                    margin: "0 auto 32px",
                  }}
                >
                  We bear the cost of pursuing your claim. You pay absolutely
                  nothing unless we successfully resolve your case.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  {["₹0 Upfront", "No Hidden Fees", "Pay Only on Success"].map(
                    (tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "rgba(255,255,255,0.12)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "#fff",
                          padding: "8px 20px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      >
                        ✓ {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── How It Works (3 Steps) ──────────────────────────────────── */}
      <div className="pt-60 pb-60 lg-pt-40">
        <div className="container">
          <div className="text-center mb-60 lg-mb-40">
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#0d6efd",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "12px",
              }}
            >
              How We Charge
            </div>
            <h2
              className="main-title fw-bold tx-dark"
              style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
            >
              Three Simple Stages
            </h2>
          </div>

          <div className="row gx-4 gy-4">
            {steps.map((step) => (
              <div className="col-lg-4" key={step.num}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "16px",
                    padding: "36px 28px",
                    height: "100%",
                    position: "relative",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: 800,
                      color: "#f1f5f9",
                      lineHeight: 1,
                      marginBottom: "16px",
                    }}
                  >
                    {step.num}
                  </div>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#1a1a2e",
                      marginBottom: "12px",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      lineHeight: "1.7",
                      marginBottom: "20px",
                    }}
                  >
                    {step.desc}
                  </p>
                  <div
                    style={{
                      display: "inline-block",
                      background: step.color === "#059669" ? "#d1fae5" : "#eff6ff",
                      color: step.color,
                      fontSize: "13px",
                      fontWeight: 700,
                      padding: "6px 16px",
                      borderRadius: "20px",
                    }}
                  >
                    {step.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What's Included ────────────────────────────────────────── */}
      <div
        className="pt-80 pb-80 lg-pt-60 lg-pb-60"
        style={{ background: "#f8faff" }}
      >
        <div className="container">
          <div className="row align-items-center gx-5 gy-5">
            <div className="col-lg-5">
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#0d6efd",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "12px",
                }}
              >
                Everything Included
              </div>
              <h2
                className="main-title fw-bold tx-dark"
                style={{ fontSize: "clamp(22px, 3.5vw, 34px)", marginBottom: "20px" }}
              >
                All services covered under our{" "}
                <span style={{ color: "#0d6efd" }}>No Win, No Fee</span> model
              </h2>
              <p style={{ color: "#6b7280", fontSize: "15px", lineHeight: "1.7" }}>
                From the first consultation to the final settlement, every step
                is handled by our team at no upfront cost to you. You focus on
                recovery — we focus on your claim.
              </p>
              <Link
                href="/contact/contact-v2"
                className="btn-one fw-500 mt-30 d-inline-block"
              >
                Start Your Free Consultation
              </Link>
            </div>

            <div className="col-lg-6 ms-auto">
              <div
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "36px 32px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                }}
              >
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {included.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "10px 0",
                        borderBottom: i < included.length - 1 ? "1px solid #f3f4f6" : "none",
                        fontSize: "14px",
                        color: "#374151",
                      }}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: "#d1fae5",
                          color: "#059669",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "12px",
                          fontWeight: 700,
                          marginTop: "1px",
                        }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Success Fee Info ────────────────────────────────────────── */}
      <div className="pt-80 pb-80 lg-pt-60 lg-pb-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-11">
              <div
                style={{
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "16px",
                  padding: "40px 36px",
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "#0d6efd",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: "240px" }}>
                  <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px" }}>
                    About the Success Fee
                  </h4>
                  <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7", margin: 0 }}>
                    Our success fee typically ranges between <strong>10% – 20%</strong> of
                    the claim amount that is finally settled or awarded in your favour.
                    The exact percentage is agreed with you in writing before we begin
                    work — completely transparent, no surprises. For complex cases
                    requiring legal proceedings, additional terms will be discussed
                    and agreed separately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <div
        className="pt-80 pb-80 lg-pt-60 lg-pb-60"
        style={{ background: "#f8faff" }}
      >
        <div className="container">
          <div className="text-center mb-60 lg-mb-40">
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#0d6efd",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "12px",
              }}
            >
              Got Questions?
            </div>
            <h2
              className="main-title fw-bold tx-dark"
              style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "24px 28px",
                    marginBottom: "16px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1a1a2e",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: "#0d6efd",
                        fontWeight: 800,
                        flexShrink: 0,
                        fontSize: "16px",
                      }}
                    >
                      Q.
                    </span>
                    {faq.q}
                  </h5>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      lineHeight: "1.7",
                      margin: "0 0 0 26px",
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <CallToActions />

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <div className="footer-style-one theme-basic-footer position-relative">
        <div className="shapes shape-one" />
        <div className="container">
          <div className="inner-wrapper">
            <Footer />
            <div className="bottom-footer">
              <p className="copyright text-center m0">
                © {new Date().getFullYear()}{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://getclaims.in"
                >
                  GetClaims
                </a>
                . All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
