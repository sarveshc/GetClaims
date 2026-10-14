const testimonials = [
  {
    photo: "/images/testimonials/radha.jpg",
    name: "Radha Varshney",
    meta: "Homemaker, Lucknow — SBI Life Insurance",
    result: "Full premium refund secured",
    text: "I cannot thank the GetClaims team enough for their incredible help in recovering a SBI Life refund for my mother after she fell victim to insurance fraud. From the very beginning they were determined, resourceful, and relentless in navigating the complex process. Thanks to their persistence, we secured the refund she rightfully deserved. I highly recommend GetClaims to anyone who needs a true advocate.",
  },
  {
    photo: "/images/testimonials/vikram.jpg",
    name: "Vikram Agarwal",
    meta: "Business owner, Pune — Motor Insurance",
    result: "₹1.72 lakh recovered",
    text: "My car was totalled in an accident and the insurer offered just ₹75,000 against an IDV of ₹2.1 lakh. I felt completely lost. GetClaims reviewed the IDV calculation, challenged the deductions with market data, and within 8 weeks I received ₹1.72 lakh. The professionalism and transparency throughout the process was outstanding.",
  },
  {
    photo: "/images/testimonials/sunita.jpg",
    name: "Sunita Iyer",
    meta: "Retired teacher, Chennai — Health Insurance",
    result: "₹3.4 lakh claim paid in full",
    text: "My cashless hospitalisation was denied mid-treatment, citing a pre-existing condition I had disclosed at enrollment. It was a frightening situation. GetClaims took over the paperwork immediately, filed a formal complaint with the Ombudsman, and the insurer settled the ₹3.4 lakh claim in full within 45 days. They turned a nightmare into a resolution.",
  },
];

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const TestimonialLarge = () => {
  return (
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{
          fontSize: "11px", fontWeight: "700", letterSpacing: ".12em",
          textTransform: "uppercase", color: "#E8920A", marginBottom: "12px",
        }}>
          Client stories
        </p>
        <h2 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(24px, 3vw, 36px)", fontWeight: "700",
          color: "#1C354F", marginBottom: "12px",
        }}>
          Real People, Real Results
        </h2>
        <p style={{ fontSize: "16px", color: "#5C7089", maxWidth: "520px", margin: "0 auto" }}>
          Families who came to us after being let down by their insurer — and left with the settlement they deserved.
        </p>
      </div>

      <div className="row g-4">
        {testimonials.map((t, i) => (
          <div key={i} className="col-lg-4 col-md-6">
            <div style={{
              background: "#FEF9EE", border: "1px solid #FDDFA0",
              borderRadius: "14px", padding: "28px", height: "100%",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ marginBottom: "14px" }}>
                <span style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "48px", lineHeight: ".8", color: "#E8920A", display: "block",
                }}>&#8220;</span>
              </div>
              <p style={{
                fontSize: "14px", lineHeight: "1.8", color: "#1C354F",
                fontStyle: "italic", flex: "1", marginBottom: "24px",
              }}>
                {t.text}
              </p>
              <div>
                <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
                  {[0,1,2,3,4].map(j => <Star key={j} />)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src={t.photo}
                    alt={t.name}
                    style={{
                      width: "48px", height: "48px", borderRadius: "50%",
                      objectFit: "cover", flexShrink: "0",
                      border: "2px solid #FDDFA0",
                    }}
                  />
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#1C354F" }}>{t.name}</div>
                    <div style={{ fontSize: "12px", color: "#5C7089", marginTop: "2px" }}>{t.meta}</div>
                    <div style={{
                      display: "inline-block", background: "#DCFCE7", color: "#15803D",
                      padding: "2px 9px", borderRadius: "4px", fontSize: "11px",
                      fontWeight: "600", marginTop: "6px",
                    }}>
                      {t.result}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialLarge;
