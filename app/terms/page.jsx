import Header from "@/components/home-page/home-10/Header";
import Footer from "@/components/home-page/home-10/Footer";

export const metadata = {
  title: "Terms & Conditions | GetClaims",
  description:
    "Read the Terms and Conditions governing the use of GetClaims services — insurance claim assistance, No Win No Fee model, and client obligations.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using the GetClaims website (getclaims.in) or engaging our services, you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, please do not use our services. These terms apply to all visitors, clients, and users of our platform.`,
  },
  {
    title: "2. About GetClaims",
    body: `GetClaims is an insurance claim assistance service based in India. We help policyholders resolve rejected, delayed, or underpaid insurance claims by filing complaints with insurance companies, the IRDAI Grievance Cell, and the Insurance Ombudsman. We are not a licensed insurer, broker, or legal firm. Our services are consultancy and representation in nature, guided by applicable IRDAI regulations.`,
  },
  {
    title: "3. No Win, No Fee Model",
    body: `GetClaims operates on a No Win, No Fee basis. This means:\n\n• A nominal Case Acceptance Fee of ₹2,000 is charged upon acceptance of your case. This amount will be adjusted against the final success fee upon resolution.\n• A success fee — charged only when your case is resolved in your favour.\n• The exact success fee percentage will be agreed with you in writing before we begin work. No fee will be charged if your case is not resolved successfully.\n• The Case Acceptance Fee is non-refundable if you withdraw from the process after case acceptance.`,
  },
  {
    title: "4. Scope of Services",
    body: `GetClaims assists with disputes relating to the following types of insurance policies issued in India:\n\n• Health Insurance\n• Life Insurance\n• Motor Insurance\n• Home / Property Insurance\n• Travel Insurance\n\nOur services include free initial case assessment, document review, drafting complaint letters, filing with IRDAI Grievance Cell and Insurance Ombudsman, and follow-up with insurers. Legal representation in consumer courts or civil courts, if required, is discussed and agreed separately.`,
  },
  {
    title: "5. Client Obligations",
    body: `By engaging GetClaims, you agree to:\n\n• Provide accurate, complete, and truthful information about your claim and insurance policy.\n• Submit all relevant documents as requested in a timely manner.\n• Not simultaneously pursue the same claim through another representative or agency without informing us.\n• Notify us promptly of any direct communications or settlements from the insurer.\n• Cooperate fully throughout the process and attend hearings or meetings if required.\n\nGetClaims reserves the right to withdraw from a case if the client provides false or misleading information.`,
  },
  {
    title: "6. No Guarantee of Outcome",
    body: `While GetClaims will make every reasonable effort to resolve your claim, we do not guarantee any specific outcome. The resolution of insurance disputes depends on the merits of each case, applicable policy terms, IRDAI guidelines, and the decisions of insurers or adjudicating authorities. Our assessment of your case is an opinion, not a legal assurance of success.`,
  },
  {
    title: "7. Confidentiality",
    body: `GetClaims will treat all personal and financial information you share with us as strictly confidential. We will not share your information with any third party except as required to pursue your claim (e.g., filing with the insurer, IRDAI, or Ombudsman) or as required by law. Please refer to our Privacy Policy for full details on how we handle your data.`,
  },
  {
    title: "8. Intellectual Property",
    body: `All content on the GetClaims website — including text, graphics, logos, and page layouts — is the property of GetClaims and protected under applicable Indian intellectual property laws. You may not reproduce, distribute, or commercially exploit any content from this website without prior written permission.`,
  },
  {
    title: "9. Limitation of Liability",
    body: `To the maximum extent permitted by law, GetClaims shall not be liable for:\n\n• Any loss of claim amount arising from an unfavourable decision by an insurer, IRDAI, or Ombudsman.\n• Delays caused by third parties, including insurance companies or regulatory bodies.\n• Any indirect, incidental, or consequential loss arising from the use of our services.\n\nOur total liability to any client shall not exceed the Case Acceptance Fee paid by that client.`,
  },
  {
    title: "10. Termination",
    body: `Either party may terminate the engagement by providing written notice. If you terminate after case acceptance, the Case Acceptance Fee of ₹2,000 is non-refundable. If GetClaims terminates the engagement due to non-cooperation or discovery of material misrepresentation by the client, no refund will be provided. If GetClaims withdraws for any other reason, the Case Acceptance Fee will be refunded in full.`,
  },
  {
    title: "11. Governing Law & Jurisdiction",
    body: `These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts located in India. We encourage resolution of disputes through mutual discussion before approaching any court or authority.`,
  },
  {
    title: "12. Changes to These Terms",
    body: `GetClaims reserves the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting on this page. Continued use of our services after any modification constitutes your acceptance of the revised terms. We recommend reviewing this page periodically.`,
  },
  {
    title: "13. Contact Us",
    body: `If you have any questions about these Terms and Conditions, please contact us:\n\nEmail: support@getclaims.in\nPhone: +91 80468-10500\nWebsite: getclaims.in`,
  },
];

const TermsPage = () => {
  return (
    <>
      <Header />

      {/* Banner */}
      <div className="inner-banner-three text-center p-30">
        <div
          className="bg-wrapper text-center"
          style={{ backgroundImage: "url(/images/assets/bg-17.svg)" }}
        >
          <div className="container">
            <div className="title-style-five">
              <h2 className="main-title tx-dark fw-bold">Terms &amp; Conditions</h2>
            </div>
            <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "10px" }}>
              Last updated: July 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-60 pb-100 lg-pt-40 lg-pb-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">

              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: "1.8", marginBottom: "40px" }}>
                Please read these Terms and Conditions carefully before using the services
                provided by GetClaims. These terms form a legally binding agreement between
                you and GetClaims.
              </p>

              {sections.map((sec, i) => (
                <div key={i} style={{ marginBottom: "36px" }}>
                  <h3 style={{
                    fontSize: "17px", fontWeight: 700, color: "#1a1a2e",
                    marginBottom: "12px", paddingBottom: "8px",
                    borderBottom: "2px solid #eff6ff",
                  }}>
                    {sec.title}
                  </h3>
                  <p style={{
                    fontSize: "14px", color: "#374151", lineHeight: "1.9",
                    whiteSpace: "pre-line", margin: 0,
                  }}>
                    {sec.body}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default TermsPage;
