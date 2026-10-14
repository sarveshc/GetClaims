import Link from "next/link";
import Illustration from "./Illustration";

const Hero = () => {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-7 col-md-8">
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#FEF3D0", color: "#C47708", borderRadius: "20px",
            padding: "6px 16px", fontSize: "12px", fontWeight: "600",
            letterSpacing: ".05em", textTransform: "uppercase", marginBottom: "20px",
          }}>
            <span style={{width:"7px",height:"7px",borderRadius:"50%",background:"#E8920A",display:"inline-block"}} />
            Trusted by 2,400+ families across India
          </div>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: "1.18",
            fontWeight: "700", color: "#1C354F", marginBottom: "20px",
          }}>
            Helping You Claim What&apos;s{" "}
            <em style={{fontStyle:"italic", color:"#E8920A"}}>Rightfully Yours</em>
          </h1>
          <p style={{
            fontSize: "17px", lineHeight: "1.75", color: "#5C7089",
            marginBottom: "36px", maxWidth: "520px",
          }}>
            When insurance companies reject, delay, or underpay your claim, our experts step in as your dedicated advocate — fighting for the fair settlement you deserve.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}>
            <Link href="/contact/contact-v2" style={{
              background: "#E8920A", color: "#fff", padding: "14px 30px",
              borderRadius: "12px", fontSize: "15px", fontWeight: "600",
              textDecoration: "none", display: "inline-block",
            }}>
              Book a Free Consultation
            </Link>
            <Link href="/pages-menu/about-us-v3" style={{
              background: "transparent", color: "#1C354F", padding: "14px 30px",
              borderRadius: "12px", fontSize: "15px", fontWeight: "600",
              textDecoration: "none", border: "1.5px solid #D9D0C0", display: "inline-block",
            }}>
              How It Works
            </Link>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            fontSize: "14px", color: "#5C7089",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#E8920A">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.58 9.83a19.79 19.79 0 01-3.07-8.67A2 2 0 012.49 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.94a16 16 0 006.15 6.15l1.3-1.3a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <a href="tel:+918826582181" style={{color:"#1C354F",fontWeight:"600",textDecoration:"none"}}>+91 88265-82181</a>
            <span>— Free initial call</span>
          </div>
        </div>
        <div className="col-lg-5 col-md-4 d-none d-md-block">
          <Illustration />
        </div>
      </div>
    </div>
  );
};

export default Hero;
