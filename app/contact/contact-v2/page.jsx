import BlockContact2 from "@/components/contact/BlockContact2";
import ContactForm2 from "@/components/contact/ContactForm2";
import Footer from "@/components/home-page/home-10/Footer";
import Header from "@/components/home-page/home-10/Header";
export const metadata = {
  title: "Contact Us | GetClaims — Insurance Claim Assistance",
  description:
    "Submit your insurance claim rejection or dispute to GetClaims. Our experts fight for your rightful claim — No Win, No Fee. Upload your documents and get a free consultation.",
  openGraph: {
    title: "Contact Us | GetClaims",
    description: "Submit your insurance claim dispute. Free consultation. No Win, No Fee.",
  },
};
const ContactV2 = () => {
  return (
    <>
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
              <h2 className="main-title tx-dark fw-bold">Contact Us</h2>
            </div>
            <p className="fs-20 mt-30 lg-mt-20">
              Get our all info and also can message us directly from here
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
                © {new Date().getFullYear()}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://themeforest.net/user/ib-themes"
                >
                  ib-themes
                </a>
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
