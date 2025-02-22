import Link from "next/link";

const servicesData = [
  {
    bgColor: "rgba(255, 171, 51, 0.18)",
    iconSrc: "/images/icon/icon_01.svg",
    title: "Misselling of Life Insurance policy",
    description:
      "We help in getting the premium refunded in case insurance policy is mis-sold to you.",
  },
  {
    bgColor: "rgba(100, 219, 226, 0.18)",
    iconSrc: "/images/icon/icon_02.svg",
    title: "Claim Rejection",
    description:
      "Any type of claim rejected by the insurance company we will help you in getting the claim.",
  },
  {
    bgColor: "rgba(255, 160, 194, 0.18)",
    iconSrc: "/images/icon/icon_03.svg",
    title: "Delay in Claim Processing",
    description:
      "We will help you in quick settlement of claim in accordance with IRDIA specified turned around time.",
  },
  {
    bgColor: "rgba(246, 243, 255, 1)",
    iconSrc: "/images/icon/icon_04.svg",
    title: "Claim short settled",
    description:
      "We will help you in getting maximum possible amount in accordance with policy term and conditions.",
  },
  {
    bgColor: "rgba(108, 55, 221, 0.1)",
    iconSrc: "/images/icon/icon_159.svg",
    title: "Any type of insurance claim filing",
    description:
      "We will help in filling the claim form to be submitted in insurance company.",
  },
  
];

const Services = () => {
  return (
    <>
      {servicesData.map((service, index) => (
        <div
          key={index}
          className={`col-lg-4 col-sm-6`}
          data-aos="fade-up"
          data-aos-delay={`${index * 100}`}
        >
          <div className="card-style-one pe-xxl-5 position-relative mt-40">
            <div
              className="icon d-flex align-items-center justify-content-center"
              style={{ backgroundColor: service.bgColor }}
            >
              <img src={service.iconSrc} alt="icon" className="lazy-img" />
            </div>
            <h5 className="fw-500 mt-35 mb-25">
              <Link
                href="/pages-menu/service-details"
                className="tran3s tx-dark"
              >
                {service.title}
              </Link>
            </h5>
            <p className="mb-25">{service.description}</p>
            <Link href="/pages-menu/service-details">
              <img
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

export default Services;
