import Image from "next/image";
import React from "react";

const blocksData = [
  {
    id: 1,
    iconSrc: "/images/icon/icon_152.svg",
    title: "Free Case Review",
    content: "Every case starts with a no-cost assessment of your policy and claim documents before you commit to anything.",
    dataAos: "fade-up",
    dataAosDelay: "",
  },
  {
    id: 2,
    iconSrc: "/images/icon/icon_153.svg",
    title: "No Win, No Fee",
    content: "A nominal case acceptance fee is adjusted against your final payment. Our success fee is only due once your claim is resolved.",
    dataAos: "fade-up",
    dataAosDelay: "100",
  },
  {
    id: 3,
    iconSrc: "/images/icon/icon_154.svg",
    title: "Ombudsman Representation",
    content: "We draft and file complaints with your insurer, the IRDAI Grievance Cell, and the Insurance Ombudsman on your behalf.",
    dataAos: "fade-up",
    dataAosDelay: "200",
  },
  {
    id: 4,
    iconSrc: "/images/icon/icon_155.svg",
    title: "Responsive Support",
    content: "Reach us by phone or WhatsApp Mon–Sat, 9 AM–7 PM, or email — we reply to every message within 24 hours.",
    dataAos: "fade-up",
    dataAosDelay: "300",
  },
];

const Block = () => {
  return (
    <>
      {blocksData.map((block) => (
        <div className="col-sm-6" key={block.id}>
          <div
            className="card-style-twentyFour bg-white mt-30"
            data-aos={block.dataAos}
            data-aos-delay={block.dataAosDelay}
          >
            <div className="icon">
              <Image
                width={45}
                height={42}
                src={block.iconSrc}
                alt={`${block.title} icon`}
                className="lazy-img mh-100"
              />
            </div>
            <h3 className="fw-bold tx-dark mt-30 mb-15" style={{ fontSize: "20px" }}>{block.title}</h3>
            <p className="fs-18">{block.content}</p>
          </div>
          {/* /.card-style-twentyFour */}
        </div>
      ))}
    </>
  );
};

export default Block;
