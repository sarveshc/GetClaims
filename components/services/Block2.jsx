import Image from "next/image";
import Link from "next/link";
import React from "react";

const cardData = [
  {
    id: 1,
    iconSrc: "/images/icon/icon_02.svg",
    bgColor: "rgba(100, 219, 226, 0.18)",
    title: "Misselling of Life Insurance policy",
    description:
      "We help in getting the premium refunded in case insurance policy is mis-sold to you.",
    delay: 0,
  },
  {
    id: 2,
    iconSrc: "/images/icon/icon_156.svg",
    bgColor: "rgba(255, 171, 51, 0.18)",
    title: "Claim Rejection",
    description:
      "Any type of claim rejected by the insurance company we will help you in getting the claim.",
    delay: 200,
  },
  {
    id: 3,
    iconSrc: "/images/icon/icon_157.svg",
    bgColor: "rgba(255, 160, 194, 0.18)",
    title: "Delay in Claim Processing",
    description:
      "We will help you in quick settlement of claim in accordance with IRDIA specified turned around time.",
    delay: 300,
  },
  {
    id: 4,
    iconSrc: "/images/icon/icon_158.svg",
    bgColor: "rgba(56, 232, 255, 0.1)",
    title: "Claim short settled",
    description:
      "We will help you in getting maximum possible amount in accordance with policy term and conditions.",
    delay: 0,
  },
  {
    id: 5,
    iconSrc: "/images/icon/icon_159.svg",
    bgColor: "rgba(108, 55, 221, 0.1)",
    title: "Any type of insurance claim filing",
    description:
      "We will help in filling the claim form to be submitted in insurance company.",
    delay: 200,
  },
  // {
  //   id: 6,
  //   iconSrc: "/images/icon/icon_160.svg",
  //   bgColor: "rgba(68, 255, 0, 0.18)",
  //   title: "Content & Article Writing.",
  //   description:
  //     "The core of our service is based on the objective investment advice we seek to provide supported.",
  //   delay: 300,
  // },
];

const Block2 = () => {
  return (
    <>
      {cardData.map((card) => (
        <div
          className="col-lg-4 col-sm-6"
          data-aos="fade-up"
          data-aos-delay={card.delay}
          key={card.id}
        >
          <div className="card-style-one pe-xxl-5 position-relative mb-90 md-mb-70">
            <div
              className="icon d-flex align-items-center justify-content-center"
              style={{ backgroundColor: card.bgColor }}
            >
              <Image
                width={32}
                height={40}
                src={card.iconSrc}
                alt="icon"
                className="lazy-img"
              />
            </div>
            <h5 className="fw-500 mt-35 mb-25">
              <Link
                href="/pages-menu/service-details"
                className="tran3s tx-dark"
              >
                {card.title}
              </Link>
            </h5>
            <p className="mb-25">{card.description}</p>
            <Link href="/pages-menu/service-details">
              <Image
                width={41}
                height={14}
                src="/images/icon/icon_05.svg"
                alt="icon"
                className="lazy-img"
              />
            </Link>
          </div>
          {/* /.card-style-one */}
        </div>
      ))}
    </>
  );
};

export default Block2;
