import BlockContact2 from "@/components/contact/BlockContact2";
import ContactForm2 from "@/components/contact/ContactForm2";
import Footer from "@/components/home-page/home-10/Footer";
import Header from "@/components/home-page/home-10/Header";
export const metadata = {
  title: "Contact Us | GetClaims",
  description:
    "Submit your insurance claim rejection or dispute to GetClaims. Our experts fight for your rightful claim — No Win, No Fee. Upload your documents and get a free consultation.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | GetClaims",
    description: "Submit your insurance claim dispute. Free consultation. No Win, No Fee.",
    url: "https://getclaims.in/contact",
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
    title: "Contact Us | GetClaims",
    description: "Submit your insurance claim dispute. Free consultation. No Win, No Fee.",
    images: ["https://getclaims.in/images/assets/twitter.jpg"],
  },
};
const ContactV2 = () => {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us | GetClaims",
    url: "https://getclaims.in/contact",
    description: "Submit your insurance claim rejection or dispute to GetClaims.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
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
      <div style={{ background: "#FFFBF3", borderBottom: "1px solid #EDE7D9", paddingTop: "148px", paddingBottom: "0" }}>
        <div style={{ textAlign: "center", padding: "0 0 48px" }}>
          <div className="container">
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#E8920A", marginBottom: "12px" }}>Get in touch</p>
            <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#1C354F", marginBottom: "16px" }}>Contact Us</h1>
            <p style={{ fontSize: "17px", color: "#5C7089", maxWidth: "520px", margin: "0 auto" }}>
              Submit your claim details and documents below. Our experts will review your case and contact you within 24 hours — free of charge.
            </p>
          </div>
        </div>

        <div style={{ background: "#fff", borderTop: "1px solid #EDE7D9" }}>
          <div className="container">
            <div className="contact-section-two text-start mt-80 lg-mt-60">
              <div className="row">
                <div className="col-lg-7">
                  <div
                    className="form-style-three md-mb-60"
                    data-aos="fade-right"
                  >
                    <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1C354F", marginBottom: "30px" }}>Submit Your Case</h2>
                    <ContactForm2 />
                  </div>
                  {/* /.form-style-three */}
                </div>
                {/* End col-lg-7 */}

                <div
                  className="col-xl-4 col-lg-5  ms-auto"
                  data-aos="fade-left"
                >
                  <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1C354F", marginBottom: "30px" }}>Get in Touch</h2>
                  <BlockContact2 />
                </div>
                {/* End col-xl-4 */}
              </div>
            </div>
            {/* /.contact-section-two */}
          </div>
          {/* /.container */}
        </div>
        {/* white form section */}
      </div>
      {/* /.contact banner */}

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
                © 2026@getclaims.in
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

export default ContactV2;
