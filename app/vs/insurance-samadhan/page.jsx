import Link from "next/link";
import Header from "@/components/home-page/home-10/Header";
import Footer from "@/components/home-page/home-10/Footer";
import CallToActions from "@/components/services/CallToActions";

export const metadata = {
  title: "GetClaims vs Insurance Samadhan: Fees & Process Compared (2026)",
  description:
    "Comparing GetClaims and Insurance Samadhan for insurance claim rejection, delay, and dispute resolution in India — fees, process, and coverage, as of August 2026.",
  alternates: {
    canonical: "/vs/insurance-samadhan",
  },
  openGraph: {
    title: "GetClaims vs Insurance Samadhan: Fees & Process Compared (2026)",
    description:
      "Comparing GetClaims and Insurance Samadhan for insurance claim rejection, delay, and dispute resolution in India — fees, process, and coverage, as of August 2026.",
    url: "https://getclaims.in/vs/insurance-samadhan",
    siteName: "GetClaims",
    type: "website",
    images: [
      {
        url: "https://getclaims.in/images/assets/og.jpg",
        width: 1731,
        height: 909,
        alt: "GetClaims — Insurance Claims Not Settled? We Can Help.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetClaims vs Insurance Samadhan: Fees & Process Compared (2026)",
    description:
      "Comparing GetClaims and Insurance Samadhan for insurance claim rejection, delay, and dispute resolution in India — fees, process, and coverage, as of August 2026.",
    images: ["https://getclaims.in/images/assets/twitter.jpg"],
  },
};

const sectionLabel = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#0d6efd",
  textTransform: "uppercase",
  letterSpacing: "2px",
  marginBottom: "12px",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "32px 28px",
  height: "100%",
  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
};

const matrix = [
  {
    feature: "Registration / upfront fee",
    getclaims: "₹5,000 case acceptance fee (adjusted against final payment)",
    competitor: "₹999 one-time registration fee",
  },
  {
    feature: "Success fee",
    getclaims: "10–20% of settled amount (agreed upfront, pay only on success)",
    competitor: "20% + GST (company/ombudsman level); 22% + GST for legal escalation",
  },
  {
    feature: "Free initial consultation",
    getclaims: "✅ Yes",
    competitor: "✅ Yes",
  },
  {
    feature: "Early withdrawal fee",
    getclaims: "Not publicly available",
    competitor: "10–15% depending on escalation stage",
  },
  {
    feature: "Insurance types covered",
    getclaims: "Health, life, motor, home, travel",
    competitor: "Life, health, term, motor, travel, general",
  },
  {
    feature: "Insurance Ombudsman representation",
    getclaims: "✅ Yes",
    competitor: "✅ Yes",
  },
  {
    feature: "Legal escalation support",
    getclaims: "✅ Advised on request, fees agreed separately",
    competitor: "✅ Included, at 22% + GST success fee tier",
  },
  {
    feature: "Policy document / portfolio tracking app",
    getclaims: "Not publicly available",
    competitor: "✅ Polifyx app",
  },
  {
    feature: "Disclosed track record",
    getclaims: "New platform — public case-volume data not yet available",
    competitor: "20,000+ claims resolved, ₹220+ crore recovered (self-reported)",
  },
];

const faqs = [
  {
    q: "Is GetClaims cheaper than Insurance Samadhan?",
    a: "It depends on your claim size. GetClaims charges a flat ₹5,000 case acceptance fee (adjusted against your final payment) plus a 10–20% success fee. Insurance Samadhan charges a lower ₹999 registration fee but a higher, fixed 20% + GST success fee (22% + GST if the case goes to legal escalation). For larger claims, GetClaims' lower success-fee ceiling can work out cheaper; for smaller claims, Insurance Samadhan's lower upfront fee may be preferable. Compare the numbers against your specific claim amount before deciding.",
  },
  {
    q: "Do both platforms work on a No Win, No Fee basis?",
    a: "Both charge their success fee only if your claim is resolved in your favour. GetClaims also charges a nominal case acceptance fee once your case is accepted, which is adjusted against the final payment. Insurance Samadhan charges its ₹999 registration fee upfront after case acceptance, separate from the success fee.",
  },
  {
    q: "Which one has a longer track record?",
    a: "Insurance Samadhan is the more established platform, self-reporting over 20,000 resolved claims and ₹220+ crore recovered as of 2026. GetClaims is a newer entrant; if a long public track record is your primary decision factor, weigh that into your choice.",
  },
  {
    q: "What types of insurance claims does each platform handle?",
    a: "Both handle health, life, motor, and travel insurance disputes, including claim rejections, delays, short settlements, and mis-selling. Insurance Samadhan additionally lists general insurance and term insurance as explicit categories.",
  },
  {
    q: "Can I get a free consultation before committing?",
    a: "Yes — both GetClaims and Insurance Samadhan offer a free initial review of your case before any fees apply.",
  },
];

const ComparisonPage = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getclaims.in" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://getclaims.in/vs" },
      {
        "@type": "ListItem",
        position: 3,
        name: "GetClaims vs Insurance Samadhan",
        item: "https://getclaims.in/vs/insurance-samadhan",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      {/* ── Banner ───────────────────────────────────────────────────── */}
      <div className="inner-banner-three text-center p-30">
        <div
          className="bg-wrapper text-center"
          style={{ backgroundImage: "url(/images/assets/bg-17.svg)" }}
        >
          <div className="container">
            <div className="title-style-five">
              <h1 className="main-title tx-dark fw-bold">
                GetClaims vs Insurance Samadhan
              </h1>
            </div>
            <p className="fs-20 mt-30 lg-mt-20">
              A fee-by-fee, process-by-process comparison for policyholders
              deciding who to trust with a rejected, delayed, or disputed
              insurance claim in India.
            </p>
            <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "14px" }}>
              Last updated: August 5, 2026 · Pricing figures as of August 2026
            </p>
          </div>
        </div>
      </div>

      {/* ── Disclosure ──────────────────────────────────────────────── */}
      <div className="pt-20 pb-20">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <p style={{ fontSize: "13px", color: "#6b7280", textAlign: "center" }}>
                GetClaims is the operator of this page. Figures for Insurance
                Samadhan are drawn from their public website and pricing
                disclosures; we link sources where available and mark data we
                could not independently verify.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Verdict ───────────────────────────────────────────── */}
      <div className="pt-40 pb-60 lg-pt-20">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-11">
              <div
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
                  borderRadius: "20px",
                  padding: "40px 36px",
                  color: "#fff",
                }}
              >
                <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 800, marginBottom: "16px", color: "#fff" }}>
                  The short answer
                </h2>
                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#e5e7eb", marginBottom: 0 }}>
                  Both platforms work on a pay-on-success model and handle
                  claim rejections, delays, and disputes across health, life,
                  motor, and travel insurance. Insurance Samadhan has a
                  longer public track record and a lower upfront fee (₹999
                  vs. ₹5,000); GetClaims has a lower success-fee ceiling
                  (10–20% vs. a flat 20–22% + GST). If your claim value is
                  high, run both fee structures against your numbers before
                  choosing — the cheaper option flips depending on claim size.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Comparison Table ────────────────────────────────────────── */}
      <div className="pt-40 pb-80 lg-pt-20 lg-pb-60">
        <div className="container">
          <div className="text-center mb-50 lg-mb-30">
            <div style={sectionLabel}>Feature Matrix</div>
            <h2 className="main-title fw-bold tx-dark" style={{ fontSize: "clamp(22px, 4vw, 34px)" }}>
              GetClaims vs Insurance Samadhan, side by side
            </h2>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                minWidth: "720px",
                borderCollapse: "collapse",
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <thead>
                <tr style={{ background: "#f8faff" }}>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: "13px", color: "#374151", borderBottom: "1px solid #e5e7eb" }}>
                    Feature
                  </th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: "13px", color: "#0d6efd", fontWeight: 700, borderBottom: "1px solid #e5e7eb" }}>
                    GetClaims
                  </th>
                  <th style={{ textAlign: "left", padding: "16px 20px", fontSize: "13px", color: "#374151", fontWeight: 700, borderBottom: "1px solid #e5e7eb" }}>
                    Insurance Samadhan
                  </th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < matrix.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                    <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 600, color: "#1a1a2e" }}>
                      {row.feature}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "#374151" }}>
                      {row.getclaims}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "#374151" }}>
                      {row.competitor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "16px" }}>
            Sources: GetClaims{" "}
            <Link href="/pricing" style={{ color: "#0d6efd" }}>
              pricing page
            </Link>
            ; Insurance Samadhan{" "}
            <a
              href="https://www.insurancesamadhan.com/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{ color: "#0d6efd" }}
            >
              public website
            </a>
            . Insurance Samadhan case-volume figures are self-reported and
            not independently audited by GetClaims.
          </p>
        </div>
      </div>

      {/* ── Pricing Deep Dive ───────────────────────────────────────── */}
      <div className="pt-80 pb-80 lg-pt-60 lg-pb-60" style={{ background: "#f8faff" }}>
        <div className="container">
          <div className="text-center mb-50 lg-mb-30">
            <div style={sectionLabel}>Pricing Breakdown</div>
            <h2 className="main-title fw-bold tx-dark" style={{ fontSize: "clamp(22px, 4vw, 34px)" }}>
              How the fees actually work
            </h2>
          </div>

          <div className="row gx-4 gy-4">
            <div className="col-lg-6">
              <div style={cardStyle}>
                <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#0d6efd", marginBottom: "16px" }}>
                  GetClaims
                </h4>
                <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "#374151", lineHeight: "1.9" }}>
                  <li>Free case assessment and document review</li>
                  <li>₹5,000 case acceptance fee once your case is accepted, adjusted against your final payment</li>
                  <li>10–20% success fee, agreed transparently before work begins</li>
                  <li>Nothing owed if your case is not resolved</li>
                </ul>
                <Link href="/pricing" className="btn-one fw-500 mt-20 d-inline-block">
                  See full pricing
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={cardStyle}>
                <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#374151", marginBottom: "16px" }}>
                  Insurance Samadhan
                </h4>
                <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "#374151", lineHeight: "1.9" }}>
                  <li>Free initial complaint registration</li>
                  <li>₹999 one-time registration fee after case acceptance</li>
                  <li>20% + GST success fee at company/ombudsman level; 22% + GST if escalated to legal action</li>
                  <li>10–15% early withdrawal fee if you exit before resolution</li>
                </ul>
                <a
                  href="https://www.insurancesamadhan.com/register"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  style={{ fontSize: "13px", color: "#9ca3af", marginTop: "20px", display: "inline-block" }}
                >
                  Source: insurancesamadhan.com/register ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Who Should Choose Which ─────────────────────────────────── */}
      <div className="pt-80 pb-80 lg-pt-60 lg-pb-60">
        <div className="container">
          <div className="text-center mb-50 lg-mb-30">
            <div style={sectionLabel}>Verdict</div>
            <h2 className="main-title fw-bold tx-dark" style={{ fontSize: "clamp(22px, 4vw, 34px)" }}>
              Which should you choose?
            </h2>
          </div>
          <div className="row gx-4 gy-4">
            <div className="col-lg-6">
              <div style={{ ...cardStyle, borderTop: "4px solid #0d6efd" }}>
                <h4 style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>
                  Consider GetClaims if:
                </h4>
                <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "#374151", lineHeight: "1.9" }}>
                  <li>Your claim value is large enough that a lower success-fee ceiling (10–20% vs. 20–22% + GST) outweighs a higher upfront fee</li>
                  <li>You want a pre-agreed, negotiated success fee rather than a fixed rate</li>
                  <li>You're comfortable working with a newer platform without a long public case history</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ ...cardStyle, borderTop: "4px solid #6b7280" }}>
                <h4 style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>
                  Consider Insurance Samadhan if:
                </h4>
                <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "#374151", lineHeight: "1.9" }}>
                  <li>You want the lowest possible upfront cost (₹999) on smaller claims</li>
                  <li>A longer, publicly disclosed track record matters most to your decision</li>
                  <li>You want built-in policy-tracking tools like the Polifyx app</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <div className="pt-80 pb-80 lg-pt-60 lg-pb-60" style={{ background: "#f8faff" }}>
        <div className="container">
          <div className="text-center mb-60 lg-mb-40">
            <div style={sectionLabel}>Got Questions?</div>
            <h2 className="main-title fw-bold tx-dark" style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>
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
                    <span style={{ color: "#0d6efd", fontWeight: 800, flexShrink: 0, fontSize: "16px" }}>
                      Q.
                    </span>
                    {faq.q}
                  </h5>
                  <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.7", margin: "0 0 0 26px" }}>
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
              <p className="copyright text-center m0">© 2026@gridtech.in</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparisonPage;
