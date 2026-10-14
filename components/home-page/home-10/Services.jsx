const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#E8920A" strokeWidth="1.8" width="26" height="26">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: "Claim Rejection",
    text: "Any claim rejected by an insurer — we review the denial, build your appeal, and escalate to IRDAI or the Ombudsman when needed.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#E8920A" strokeWidth="1.8" width="26" height="26">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Delayed Claims",
    text: "IRDAI mandates 30-day settlement. We push insurers to meet their legal obligation with formal complaints and documented timelines.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#E8920A" strokeWidth="1.8" width="26" height="26">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Mis-selling",
    text: "Sold a policy without proper disclosure? We help you seek redressal and recover premiums where the insurer failed their duty.",
  },
  {
    icon: (
      <span style={{ fontSize: "24px", fontWeight: "700", color: "#E8920A", fontFamily: "system-ui, -apple-system, Arial, sans-serif", lineHeight: 1 }}>
        ₹
      </span>
    ),
    title: "Short Settlement",
    text: "Paid far less than expected? We audit the insurer's deduction calculation line by line and fight for the full amount you're entitled to.",
  },
];

const Services = () => {
  return (
    <>
      <h2 className="visually-hidden">Types of insurance claim issues we resolve</h2>
      {services.map((s, i) => (
        <div key={i} className="col-lg-3 col-md-6 col-sm-6" style={{ marginBottom: "24px" }}>
          <div style={{
            background: "#FFFFFF", border: "1px solid #EDE7D9",
            borderRadius: "14px", padding: "28px 24px", height: "100%",
          }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "12px",
              background: "#FEF3D0", display: "flex", alignItems: "center",
              justifyContent: "center", marginBottom: "18px",
            }}>
              {s.icon}
            </div>
            <h3 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "18px", fontWeight: "700", color: "#1C354F", marginBottom: "10px",
            }}>
              {s.title}
            </h3>
            <p style={{ fontSize: "14px", lineHeight: "1.75", color: "#5C7089", margin: 0 }}>
              {s.text}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Services;
