import Image from "next/image";

const BlockContact2 = () => {
  const blocks = [
    {
      icon: "/images/icon/icon_162.svg",
      title: "Call / WhatsApp Us",
      content: (
        <>
          Mon – Sat, 9 AM – 7 PM
          <br />
          <a href="tel:+918826582181" className="call" style={{ fontWeight: 600 }}>
            +91 88265-82181
          </a>
          <br />
          <a
            href="https://wa.me/918826582181?text=Hi, I need help with my insurance claim"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "8px",
              background: "#25d366",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.549 4.11 1.512 5.84L.057 23.569a.75.75 0 00.914.914l5.729-1.455A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.731 9.731 0 01-4.908-1.321l-.352-.209-3.652.928.944-3.535-.23-.366A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
            Chat on WhatsApp
          </a>
        </>
      ),
    },
    {
      icon: "/images/icon/icon_163.svg",
      title: "Email Us",
      content: (
        <>
          We reply within 24 hours
          <br />
          <a href="mailto:support@getclaims.in" className="webaddress">
            support@getclaims.in
          </a>
        </>
      ),
    },
    
  ];

  return (
    <>
      {/* Info blocks */}
      {blocks.map((block, index) => (
        <div
          className="address-block-three d-flex mb-40 lg-mb-30"
          key={index}
        >
          <div className="icon">
            <Image width={30} height={30} src={block.icon} alt={block.title} />
          </div>
          <div className="text" style={{ paddingLeft: "16px" }}>
            <h3 className="title" style={{ fontSize: "17px" }}>{block.title}</h3>
            <p style={{ lineHeight: "1.6", fontSize: "14px" }}>{block.content}</p>
          </div>
        </div>
      ))}

      {/* Trust badges */}
      <div
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "12px",
          padding: "18px 20px",
          marginTop: "8px",
        }}
      >
        <h3
          style={{
            margin: "0 0 12px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#1e40af",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Why Choose GetClaims?
        </h3>
        {[
          "✅ Free case review, no obligation",
          "✅ No Win, No Fee — pay only on success",
          "✅ Ombudsman & IRDAI Grievance Cell representation",
        ].map((point, i) => (
          <p
            key={i}
            style={{
              margin: "0 0 6px",
              fontSize: "13px",
              color: "#374151",
              lineHeight: "1.5",
            }}
          >
            {point}
          </p>
        ))}
      </div>
    </>
  );
};

export default BlockContact2;
