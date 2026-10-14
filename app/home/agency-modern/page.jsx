import Link from "next/link";
import Header from "@/components/home-page/home-10/Header";
import Hero from "@/components/home-page/home-10/Hero";
import Services from "@/components/home-page/home-10/Services";
import TestimonialLarge from "@/components/home-page/home-10/TestimonialLarge";
import Footer from "@/components/home-page/home-10/Footer";
import ProcessVideo from "@/components/home-page/home-10/ProcessVideo";
import TimeLine from "@/components/common/TimeLine";

export const metadata = {
  title: "GetClaims | Insurance Claim Resolution Experts",
  description: "Expert insurance claim advocacy for rejected, delayed, and under-settled claims. 2,400+ claims resolved. No fee unless we win.",
};

const A = {
  bg:          "#FFFBF3",
  card:        "#FFFFFF",
  amber:       "#E8920A",
  amberPale:   "#FEF3D0",
  amberBorder: "#FDDFA0",
  navy:        "#1C354F",
  muted:       "#5C7089",
  border:      "#EDE7D9",
};

const AgencyModern = () => {
  return (
    <div style={{ background: A.bg }}>
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <Header />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section style={{
        background: A.bg,
        padding: "72px 0 56px",
        borderBottom: `1px solid ${A.border}`,
      }}>
        <Hero />
      </section>

      {/* ── Scenario selector ───────────────────────────────────── */}
      <section style={{ background: A.card, borderBottom: `1px solid ${A.border}`, padding: "48px 0 44px" }}>
        <div className="container">
          <p style={{
            textAlign: "center", fontSize: "12px", fontWeight: "700",
            letterSpacing: ".1em", textTransform: "uppercase",
            color: A.muted, marginBottom: "28px",
          }}>
            What happened with your claim?
          </p>
          <div className="row g-3">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E8920A" strokeWidth="1.8" width="28" height="28">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                ),
                label: "Cashless treatment denied",
                sub: "Hospital rejected your health card mid-treatment",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E8920A" strokeWidth="1.8" width="28" height="28">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <line x1="9" y1="12" x2="15" y2="12"/>
                  </svg>
                ),
                label: "Life / LIC claim rejected",
                sub: "Claim denied after paying premiums for years",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E8920A" strokeWidth="1.8" width="28" height="28">
                    <rect x="1" y="3" width="15" height="13" rx="2"/>
                    <path d="M16 8h4l3 5v3h-7V8z"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                ),
                label: "Motor claim underpaid",
                sub: "Insurer paid far less than your vehicle's IDV",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E8920A" strokeWidth="1.8" width="28" height="28">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="12" x2="12" y2="17"/>
                    <line x1="12" y1="10" x2="12.01" y2="10"/>
                  </svg>
                ),
                label: "Policy mis-sold or cancelled",
                sub: "Terms didn't match what agent promised you",
              },
            ].map((s, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <Link
                  href="/contact/contact-v2"
                  className="gc-scenario-card"
                  style={{
                    background: A.bg,
                    border: `1.5px solid ${A.border}`,
                    padding: "22px 20px",
                  }}
                >
                  <div style={{ marginBottom: "14px" }}>{s.icon}</div>
                  <div style={{
                    fontSize: "15px", fontWeight: "700",
                    color: A.navy, marginBottom: "6px",
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontSize: "13px", color: A.muted,
                    lineHeight: "1.6", marginBottom: "16px",
                  }}>
                    {s.sub}
                  </div>
                  <div className="gc-scenario-arrow" style={{
                    fontSize: "13px", fontWeight: "700", color: A.amber,
                  }}>
                    Get help →
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust stats ─────────────────────────────────────────── */}
      <section style={{ background: A.card, borderBottom: `1px solid ${A.border}` }}>
        <div className="container">
          <div className="row text-center">
            {[
              { num: "2,400+", label: "Claims successfully resolved" },
              { num: "93%",    label: "Success rate across all cases" },
              { num: "₹82 Cr+", label: "Total recovered for clients" },
            ].map((s, i) => (
              <div key={i} className="col-4" style={{
                padding: "28px 16px",
                borderRight: i < 2 ? `1px solid ${A.border}` : "none",
              }}>
                <div style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(24px, 3vw, 34px)", fontWeight: "700", color: A.amber,
                }}>
                  {s.num}
                </div>
                <div style={{ fontSize: "13px", color: A.muted, marginTop: "4px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0 64px" }}>
        <div className="container">
          <p style={{
            fontSize: "11px", fontWeight: "700", letterSpacing: ".12em",
            textTransform: "uppercase", color: A.amber, marginBottom: "12px",
          }}>
            Problems we solve
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(24px, 3vw, 38px)", fontWeight: "700",
            color: A.navy, marginBottom: "12px",
          }}>
            We Handle Every Kind of Insurance Dispute
          </h2>
          <p style={{
            fontSize: "16px", color: A.muted, lineHeight: "1.7",
            maxWidth: "560px", marginBottom: "48px",
          }}>
            From outright rejections to mis-sold policies — our specialists know every tactic insurers use and exactly how to counter them.
          </p>
          <div className="row">
            <Services />
          </div>
        </div>
      </section>

      {/* ── Process Video ───────────────────────────────────────── */}
      <section style={{
        background: A.card,
        borderTop: `1px solid ${A.border}`,
        borderBottom: `1px solid ${A.border}`,
        padding: "80px 0",
      }}>
        <ProcessVideo />
      </section>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <section style={{ padding: "80px 0" }}>
        <TestimonialLarge />
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: A.navy, padding: "80px 0" }}>
        <div className="container text-center">
          <p style={{
            fontSize: "11px", fontWeight: "700", letterSpacing: ".12em",
            textTransform: "uppercase", color: A.amber, marginBottom: "16px",
          }}>
            No fee unless we win
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: "700",
            color: "#fff", marginBottom: "16px",
          }}>
            Ready to Fight for the Settlement You Deserve?
          </h2>
          <p style={{
            fontSize: "17px", color: "rgba(255,255,255,.65)",
            lineHeight: "1.7", marginBottom: "36px", maxWidth: "540px", margin: "0 auto 36px",
          }}>
            Book a free 20-minute consultation. Our experts review your case at no cost — and only charge a percentage of what we recover.
          </p>
          <Link href="/contact/contact-v2" style={{
            background: A.amber, color: "#fff",
            padding: "16px 40px", borderRadius: "12px",
            fontSize: "16px", fontWeight: "600", textDecoration: "none",
            display: "inline-block",
          }}>
            Book My Free Consultation
          </Link>
        </div>
      </section>

      {/* ── How We Help (Timeline) ───────────────────────────────── */}
      <section style={{
        background: A.card,
        borderTop: `1px solid ${A.border}`,
        padding: "80px 0",
      }}>
        <div className="container">
          <TimeLine />
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
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
    </div>
  );
};

export default AgencyModern;
