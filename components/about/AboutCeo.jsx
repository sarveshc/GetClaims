import Image from "next/image";
import React from "react";

const AboutCeo = () => {
  return (
    <>
      {/* ── Text block ─────────────────────────────────────────────────────── */}
      <div className="col-lg-5 col-md-6 ms-auto order-md-last">
        <div className="block-style-one" data-aos="fade-left">
          <div className="title-style-one">
            <div className="sc-title text-uppercase">About GetClaims</div>
            <h2 className="main-title fw-bold tx-dark m0">
              Fighting for your <span>rightful</span> insurance claim.
            </h2>
          </div>

          <h4 className="tx-dark pt-65 pb-20 lg-pt-40 lg-pb-10">Who we are?</h4>
          <p className="fs-20">
            GetClaims is a team of insurance and legal experts dedicated to
            helping policyholders across India resolve rejected, delayed, or
            underpaid claims. We navigate IRDAI guidelines so you don&apos;t have to.
          </p>
          <p className="fs-18 mb-10 pt-30 lg-pt-20">
            <span className="fw-500 tx-dark">
              Trusted by 5,000+ policyholders — from health to motor to life insurance claims.
            </span>
          </p>

          {/* Star rating */}
          <ul className="d-flex style-none rating">
            {[...Array(5)].map((_, i) => (
              <li key={i}><i className="bi bi-star-fill" /></li>
            ))}
          </ul>
        </div>
      </div>
      {/* End text block */}

      {/* ── Image block ────────────────────────────────────────────────────── */}
      <div className="col-md-6 order-md-first" data-aos="fade-right">
        <div className="img-meta d-inline-block position-relative ps-3 ps-lg-5 pb-50 sm-mt-90">
          <Image
            width={501}
            height={620}
            style={{ objectFit: "cover", borderRadius: "12px" }}
            src="/images/media/getclaims_family.svg"
            alt="GetClaims — Family protected by insurance claim experts"
            className="lazy-img"
            unoptimized
          />

          {/* Decorative shapes (kept from original template) */}
          <Image
            width={132}
            height={126}
            src="/images/shape/shape_09.svg"
            alt=""
            className="lazy-img shapes shape-one"
          />
          <Image
            width={8}
            height={8}
            src="/images/shape/shape_10.svg"
            alt=""
            className="lazy-img shapes shape-two"
          />
          <div className="shapes shape-three" />
          <Image
            width={8}
            height={8}
            src="/images/shape/shape_11.svg"
            alt=""
            className="lazy-img shapes shape-four"
          />
          <Image
            width={810}
            height={10}
            src="/images/shape/shape_12.svg"
            alt=""
            className="lazy-img shapes shape-five"
          />
          <div className="shapes shape-six" />
          <Image
            width={18}
            height={16}
            src="/images/shape/shape_13.svg"
            alt=""
            className="lazy-img shapes shape-seven"
          />

          {/* Floating testimonial card */}
          <div className="card-one" data-aos="fade-up" data-aos-delay="250">
            <div className="icon d-flex align-items-center justify-content-center rounded-circle">
              <Image
                width={24}
                height={18}
                src="/images/icon/icon_06.svg"
                alt=""
                className="lazy-img"
              />
            </div>
            <div className="name fs-18 fw-500 tx-dark mb-10">
              — Verified Client,{" "}
              <span className="opacity-50">Mumbai</span>
            </div>
            <p className="fs-18 m0">
              GetClaims recovered ₹4.8 lakh after my health claim was rejected.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutCeo;
