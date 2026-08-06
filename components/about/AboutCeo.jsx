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

          <h2 className="tx-dark pt-65 pb-20 lg-pt-40 lg-pb-10">Who We Are</h2>
          <p className="fs-20">
            GetClaims is a team of insurance and legal experts dedicated to
            helping policyholders across India resolve rejected, delayed, or
            underpaid claims. We navigate IRDAI guidelines so you don&apos;t have to.
          </p>
          <p className="fs-18 mt-20">
            Insurance policies are written in dense, technical language, and
            insurers hold the advantage when a claim is disputed. We exist to
            close that gap — reviewing your policy terms, identifying where a
            rejection or short-settlement doesn&apos;t hold up, and handling the
            paperwork, correspondence, and escalation on your behalf so you
            don&apos;t have to fight the process alone.
          </p>
          <p className="fs-18 mt-20">
            Every case starts with a free, no-obligation review. If we take on
            your case, we work on a No Win, No Fee basis: a nominal case
            acceptance fee is adjusted against your final payment, and our
            success fee is only due once your claim is actually resolved.
          </p>
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
            alt="Decorative shape top right"
            className="lazy-img shapes shape-one"
          />
          <Image
            width={8}
            height={8}
            src="/images/shape/shape_10.svg"
            alt="Decorative dot"
            className="lazy-img shapes shape-two"
          />
          <div className="shapes shape-three" />
          <Image
            width={8}
            height={8}
            src="/images/shape/shape_11.svg"
            alt="Decorative dot"
            className="lazy-img shapes shape-four"
          />
          <Image
            width={810}
            height={10}
            src="/images/shape/shape_12.svg"
            alt="Decorative line"
            className="lazy-img shapes shape-five"
          />
          <div className="shapes shape-six" />
          <Image
            width={18}
            height={16}
            src="/images/shape/shape_13.svg"
            alt="Decorative cross"
            className="lazy-img shapes shape-seven"
          />

          {/* Floating benefit card */}
          <div  className="card-one" data-aos="fade-up" data-aos-delay="250">
            <div className="name fs-18 fw-500 tx-dark mb-10">
              Free Case Review
            </div>
            <p className="fs-18 m0">
              No cost, no obligation — you only pay if we resolve your claim.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutCeo;
