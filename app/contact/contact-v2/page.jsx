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
      <div className="inner-banner-three text-center p-30">
        <div
          className="bg-wrapper text-center"
          style={{ backgroundImage: "url(/images/assets/bg-17.svg)" }}
        >
          <div className="container">
            <div className="title-style-five">
              <h1 className="main-title tx-dark fw-bold">Contact Us</h1>
            </div>
            <p className="fs-20 mt-30 lg-mt-20">
              Submit your claim details and documents below. Our experts will review your case and contact you within 24 hours — free of charge.
            </p>
          </div>
          {/* End container */}

          <div className="container">
            <div className="contact-section-two text-start mt-80 lg-mt-60">
              <div className="row">
                <div className="col-lg-7">
                  <div
                    className="form-style-three md-mb-60"
                    data-aos="fade-right"
                  >
                    <ContactForm2 />
                  </div>
                  {/* /.form-style-three */}
                </div>
                {/* End col-lg-7 */}

                <div
                  className="col-xl-4 col-lg-5  ms-auto"
                  data-aos="fade-left"
                >
                  <BlockContact2 />
                </div>
                {/* End col-xl-4 */}
              </div>
            </div>
            {/* /.contact-section-two */}
          </div>
          {/* /.container */}
        </div>
        {/* /.bg-wrapper */}
      </div>
      {/* /.inner-banner-three */}

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

export default ContactV2;
