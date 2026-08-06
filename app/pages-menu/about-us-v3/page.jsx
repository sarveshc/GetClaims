import Image from "next/image";

import Footer from "@/components/home-page/home-10/Footer";
import Header from "@/components/home-page/home-10/Header";
import Testimonial from "@/components/home-page/home-10/Testimonial";
import CallToActions from "@/components/services/CallToActions";
import Team5 from "@/components/team/Team5";
import Block from "@/components/about/Block";
import Counter2 from "@/components/about/Counter2";
import AboutCeo from "@/components/about/AboutCeo";

export const metadata = {
  title: "About Us | GetClaims",
  description: "GetClaims is a team of insurance and legal experts dedicated to helping policyholders across India resolve rejected, delayed, or underpaid claims.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | GetClaims",
    description: "GetClaims is a team of insurance and legal experts dedicated to helping policyholders across India resolve rejected, delayed, or underpaid claims.",
    url: "https://getclaims.in/about",
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
    title: "About Us | GetClaims",
    description: "GetClaims is a team of insurance and legal experts dedicated to helping policyholders across India resolve rejected, delayed, or underpaid claims.",
    images: ["https://getclaims.in/images/assets/twitter.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Us | GetClaims",
  url: "https://getclaims.in/about",
  description: "GetClaims is a team of insurance and legal experts dedicated to helping policyholders across India resolve rejected, delayed, or underpaid claims.",
};

const AboutUsV3 = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* <!-- 
      =============================================
      Theme Default Menu
      ============================================== 	
      --> */}
      <Header />
      {/* 
      =============================================
      Theme Inner Banner
      ============================================== 
      */}
      <div className="inner-banner-three text-center p-30">
        <div
          className="bg-wrapper text-center"
          style={{ backgroundImage: "url(/images/assets/bg-17.svg)" }}
        >
          <div className="container">
            <div className="title-style-five">
              <h1 className="main-title tx-dark fw-bold">About us</h1>
            </div>
            <p className="fs-20 mt-30 lg-mt-20">
              At GetClaims, we help resolve claims and financial disputes of every nature with expert guidance and professional support. Many customers often feel dissatisfied with claim settlement outcomes due to lack of clarity, unfair deductions, delays, or unjustified rejections. Our team works to ensure your concerns are properly addressed and helps you secure a fair and rightful resolution.
            </p>
          </div>
          {/* End container */}
        </div>
        {/* /.bg-wrapper */}
      </div>
      {/* /.inner-banner-three */}

      {/* 
        =============================================
        Feature Section Two
        ============================================== 
        */}
      <div className="fancy-feature-two position-relative pt-60 lg-pt-50">
        <div className="container">
          <div className="row align-items-center">
            <AboutCeo />
          </div>
        </div>{" "}
        {/* /.container */}
        <div className="container">
          <div className="row justify-content-center pt-60 md-pt-40">
            <Counter2 />
          </div>
        </div>
      </div>
      {/* /.fancy-feature-two */}

      {/* 
        =============================================
        Feature Section Fifty Four
        ============================================== 
        */}
      <div className="fancy-feature-fiftyFour p-30 mt-150 lg-mt-90">
        <div className="bg-wrapper position-relative zn2 pt-140 lg-pt-60 pb-140 lg-pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-4" data-aos="fade-right">
                <div className="title-style-one mt-30">
                  <div className="sc-title text-uppercase">Why us?</div>
                  <h2 className="main-title fw-bold tx-dark">
                    Why <span>choose</span> GetClaims.
                  </h2>
                </div>{" "}
                {/* /.title-style-one */}
                <p className="text-lg mt-40 lg-mt-20">
                  From your first call to the final settlement, we handle the
                  paperwork, the correspondence, and the escalation — so you
                  know exactly where your case stands at every stage.
                </p>
                <Image
                  width={73}
                  height={75}
                  src="/images/shape/shape_179.svg"
                  alt="icon"
                  className="lazy-img d-none d-lg-block mt-80"
                />
              </div>
              {/* End .col */}

              <div className="col-lg-7 ms-auto">
                <div className="row gx-xxl-5">
                  <Block />
                </div>
              </div>
            </div>
          </div>
          <Image
            width={10}
            height={10}
            src="/images/shape/shape_11.svg"
            alt="icon"
            className="lazy-img shapes shape-one"
          />
          <Image
            width={18}
            height={16}
            src="/images/shape/shape_13.svg"
            alt="icon"
            className="lazy-img shapes shape-two"
          />
          <Image
            width={8}
            height={8}
            src="/images/shape/shape_10.svg"
            alt="icon"
            className="lazy-img shapes shape-three"
          />
          <Image
            width={10}
            height={10}
            src="/images/shape/shape_12.svg"
            alt="icon"
            className="lazy-img shapes shape-four"
          />
        </div>{" "}
        {/* /.bg-wrapper */}
      </div>
      {/* /.fancy-feature-fiftyFour */}

      {/*
        =============================================
        Our Process
        ==============================================
        */}
      <div className="pt-100 pb-80 lg-pt-60 lg-pb-60">
        <div className="container">
          <div className="text-center mb-60 lg-mb-40">
            <div className="sc-title text-uppercase">How It Works</div>
            <h2 className="main-title fw-bold tx-dark" style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>
              How We Help You, Step by Step
            </h2>
          </div>
          <div className="row gx-4 gy-4">
            {[
              {
                num: "01",
                title: "Reach Out to Us",
                desc: "Call, WhatsApp, or submit your case online. Tell us what happened with your claim — this first consultation is completely free.",
              },
              {
                num: "02",
                title: "Share Your Documents",
                desc: "Send us your policy papers, the insurer's rejection or settlement letter, and any correspondence related to your claim.",
              },
              {
                num: "03",
                title: "Case Acceptance",
                desc: "Our team reviews your policy terms and the insurer's reasoning. If your case qualifies, we take it on and agree the fee upfront.",
              },
              {
                num: "04",
                title: "Filing & Escalation",
                desc: "We draft and file your complaint with the insurer, the IRDAI Grievance Cell, and — if needed — the Insurance Ombudsman.",
              },
              {
                num: "05",
                title: "Resolution",
                desc: "We follow through until your claim is resolved, keeping you updated at every stage. Our success fee only applies once it's settled.",
              },
            ].map((step) => (
              <div className="col-lg-4 col-md-6" key={step.num}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "16px",
                    padding: "32px 28px",
                    height: "100%",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ fontSize: "40px", fontWeight: 800, color: "#f1f5f9", lineHeight: 1, marginBottom: "14px" }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.7", margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* /.Our Process */}

      {/*
        =============================================
        What We Handle
        ==============================================
        */}
      <div className="pt-40 pb-80 lg-pt-20 lg-pb-60" style={{ background: "#f8faff" }}>
        <div className="container">
          <div className="text-center mb-60 lg-mb-40">
            <div className="sc-title text-uppercase">Our Coverage</div>
            <h2 className="main-title fw-bold tx-dark" style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>
              What We Handle
            </h2>
          </div>

          <div className="row gx-4 gy-4">
            <div className="col-lg-6">
              <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", height: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e", marginBottom: "16px" }}>
                  Types of Insurance
                </h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {["Health Insurance", "Life Insurance", "Motor / Vehicle Insurance", "Home Insurance", "Travel Insurance"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", fontSize: "14px", color: "#374151" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0d6efd", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 28px", height: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e", marginBottom: "16px" }}>
                  Types of Disputes
                </h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {["Claim Rejection", "Delayed Claim Processing", "Short / Partial Settlement", "Mis-selling of Policy", "Policy Cancellation / Refund", "Non-disclosure Rejection"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", fontSize: "14px", color: "#374151" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#059669", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /.What We Handle */}

      {/* 
        =============================================
        Wrapper
        ============================================== 
        */}
      <div className="wrapper position-relative mt-160 lg-mt-100">
        
        <Image
          width={8}
          height={8}
          src="/images/shape/shape_20.svg"
          alt="shape"
          className="lazy-img shapes shape-one"
          style={{ top: "5%", left: "10%" }}
        />
        <Image
          width={11}
          height={11}
          src="/images/shape/shape_21.svg"
          alt="shape"
          className="lazy-img shapes shape-two"
          style={{ bottom: "-4%", left: "18%" }}
        />
        <Image
          width={9}
          height={9}
          src="/images/shape/shape_22.svg"
          alt="shape"
          className="lazy-img shapes shape-three"
          style={{ bottom: "-4%", right: "23%" }}
        />
        <Image
          width={16}
          height={14}
          src="/images/shape/shape_23.svg"
          alt="shape"
          className="lazy-img shapes shape-four"
          style={{ top: "-3%", right: "14%" }}
        />
      </div>
      {/* /.wrapper */}

      {/*
        =====================================================
        Fancy Short Banner One
        =====================================================
        */}
      <CallToActions />
      {/* /.fancy-short-banner-one */}

      {/* 
        =============================================
        Footer
        ============================================== 
        */}
      <div className="footer-style-one theme-basic-footer position-relative">
        <div className="shapes shape-one" />
        <div className="container">
          <div className="inner-wrapper">
            <Footer />
            <div className="bottom-footer">
              <p className="copyright text-center m0">
                © 2026@gridtech.in
              </p>
            </div>
          </div>
          {/* /.inner-wrapper */}
        </div>
      </div>
      {/* /.footer-style-one */}
    </>
  );
};

export default AboutUsV3;
