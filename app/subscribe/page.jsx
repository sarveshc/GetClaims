import Header from "@/components/home-page/home-10/Header";
import Footer from "@/components/home-page/home-10/Footer";
import SubscribeButton from "@/components/subscription/SubscribeButton";

export const metadata = {
  title: "Subscribe — Fight Your Insurer for ₹499 | GetClaims",
  description:
    "Pay a one-time flat fee of ₹499 and our experts handle your insurance dispute end-to-end — complaint drafting, IRDAI filing, and follow-up till resolution.",
  alternates: { canonical: "/subscribe" },
  openGraph: {
    title: "Fight Your Insurer for ₹499 | GetClaims",
    description: "One case, one flat fee. Our experts draft, file, and follow up on your insurance dispute.",
    url: "https://getclaims.in/subscribe",
    siteName: "GetClaims",
    type: "website",
    images: [{ url: "https://getclaims.in/images/assets/og.jpg", width: 1731, height: 909, alt: "GetClaims" }],
  },
};

const A = {
  bg: "#FFFBF3",
  amber: "#E8920A",
  navy: "#1C354F",
  muted: "#5C7089",
  border: "#EDE7D9",
};

const benefits = [
  "1 insurance case handled end-to-end",
  "Complaint drafting on your behalf",
  "IRDAI Grievance Cell & Ombudsman filing",
  "Priority review — response within 24 hours",
  "Dedicated case manager assigned",
  "No hidden charges at any stage",
];

const SubscribePage = () => (
  <>
    <Header />

    {/* ── Banner ─────────────────────────────────────────────────── */}
    <div style={{ background: A.bg, borderBottom: `1px solid ${A.border}`, padding: "148px 0 60px", textAlign: "center" }}>
      <div className="container">
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: A.amber, marginBottom: "12px" }}>
          Flat-fee option
        </p>
        <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: A.navy, marginBottom: "16px" }}>
          Fight Your Insurer for{" "}
          <span style={{ color: A.amber }}>₹499</span>
        </h1>
        <p style={{ fontSize: "17px", color: A.muted, maxWidth: "520px", margin: "0 auto" }}>
          One case, one flat fee. Our experts draft your complaint, file with IRDAI, and follow up until resolution.
        </p>
      </div>
    </div>

    {/* ── Main content ───────────────────────────────────────────── */}
    <div style={{ background: A.bg, padding: "80px 0" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row align-items-start gx-5 gy-5">

              {/* Left — benefits */}
              <div className="col-lg-6">
                <p style={{ fontSize: "14px", fontWeight: 700, color: A.navy, marginBottom: "20px" }}>
                  What's included with your ₹499 case plan:
                </p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {benefits.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: i < benefits.length - 1 ? `1px solid ${A.border}` : "none", fontSize: "15px", color: A.muted }}>
                      <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#DCFCE7", color: "#15803D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div style={{ background: "#FEF9EE", border: `1px solid #FDDFA0`, borderRadius: "12px", padding: "20px 24px", marginTop: "32px" }}>
                  <p style={{ fontSize: "13px", color: A.muted, lineHeight: "1.7", margin: 0 }}>
                    <strong style={{ color: A.navy }}>How it works:</strong> After payment, our team contacts you within 24 hours, reviews your documents, and begins drafting. No consultation fee, no percentage cut — just a flat ₹499.
                  </p>
                </div>
              </div>

              {/* Right — subscribe card */}
              <div className="col-lg-6">
                <div style={{ background: "#fff", border: "2px solid #FDDFA0", borderRadius: "20px", padding: "36px 32px", boxShadow: "0 8px 32px rgba(28,53,79,0.1)" }}>
                  <div style={{ textAlign: "center", marginBottom: "28px" }}>
                    <div style={{ display: "inline-block", background: "#FEF3D0", color: "#C47708", fontSize: "12px", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "20px", marginBottom: "16px" }}>
                      One-time payment
                    </div>
                    <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "52px", fontWeight: 800, color: A.navy, lineHeight: 1 }}>
                      &#8377;499
                    </div>
                    <div style={{ fontSize: "14px", color: A.muted, marginTop: "6px" }}>per case · no annual commitment</div>
                  </div>
                  <SubscribeButton />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ── Trust bar ──────────────────────────────────────────────── */}
    <div style={{ background: A.navy, padding: "40px 0" }}>
      <div className="container">
        <div className="row text-center gy-3">
          {[
            { num: "50+", label: "Claims resolved" },
            { num: "100%", label: "Success rate" },
            { num: "₹3 Cr+", label: "Recovered for clients" },
          ].map((s, i) => (
            <div key={i} className="col-4" style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,.15)" : "none" }}>
              <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 700, color: A.amber }}>{s.num}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,.6)", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Footer ─────────────────────────────────────────────────── */}
    <div className="footer-style-one theme-basic-footer position-relative">
      <div className="shapes shape-one" />
      <div className="container">
        <div className="inner-wrapper">
          <Footer />
          <div className="bottom-footer">
            <p className="copyright text-center m0">© 2026@getclaims.in</p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SubscribePage;
