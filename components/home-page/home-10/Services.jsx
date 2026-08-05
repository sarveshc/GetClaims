import Link from "next/link";

const servicesData = [
  {
    bgColor: "rgba(255, 171, 51, 0.18)",
    iconSrc: "/images/icon/ic_01.svg",
   // title: "Misselling of Life Insurance policy",
   title: "Deceptive Policies",
    description:
      "We help in getting the premium refunded in case insurance policy is mis-sold to you.",
  },
  {
    bgColor: "rgba(100, 219, 226, 0.18)",
    iconSrc: "/images/icon/ic_02.png",
    title: "Claim Rejection",
    description:
      "Any type of claim rejected by the insurance company we will help you in getting the claim.",
  },
  {
    bgColor: "rgba(255, 160, 194, 0.18)",
    iconSrc: "/images/icon/ic_03.png",
   // title: "Delay in Claim Processing",
   title: "Delayed Claims",
    description:
      "We will help you in quick settlement of claim in accordance with IRDIA specified turned around time.",
  },
  {
    bgColor: "rgba(246, 243, 255, 1)",
    iconSrc: "/images/icon/ic_04.png",
   // title: "Claim short settled",
   title: "Claim Shortfall",
    description:
      "We will help you in getting maximum possible amount in accordance with policy term and conditions.",
  },
  {
    bgColor: "rgba(108, 55, 221, 0.1)",
    iconSrc: "/images/icon/ic_05.png",
   // title: "Any type of insurance claim filing",
   title: "Claim Application",
    description:
      "We will help in filling the claim form to be submitted in insurance company.",
  },
];

const Services = () => {
  return (
    <>
    <h2 className="visually-hidden">Types of insurance claim issues we resolve</h2>
    <div className="row">
          <div className="col-md-5">
            <div className="os-3 os os-3-c1">
              <div className="os-3-l"><img src="/images/icon/ic_02.png" alt="Claim rejection" /></div>
              <div className="os-3-r">
                <h3>Claim Rejection</h3>
                <p className="os-4">Any type of claim rejected by the insurance company we will help you in getting the claim....</p>
                
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="os-3 os-3-c2">
              <div className="os-3-l"><img src="/images/icon/ic_03.png" alt="Delay in Claim Process" /></div>
              <div className="os-3-r">
                <h3>Delay in Claim Processing </h3>
                <p className="os-4">We will help you in quick settlement of claim in accordance with IRDIA specified turned around time.</p>
               
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="os-3 os-3-c3">
              <div className="os-3-l"><img src="/images/icon/ic_01.png" alt="Mis-selling of Insurance" /></div>
              <div className="os-3-r">
                <h3>Mis-selling</h3>
                <p className="os-4">We help in getting the premium refunded in case insurance policy is mis-sold to you.</p>
               
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="os-3 os-3-c4">
              <div className="os-3-l"><img src="/images/icon/ic_04.png" alt="Claim short settled" /></div>
              <div className="os-3-r">
                <h3>Claim short-settled</h3>
                <p className="os-4">We will help you in getting maximum possible amount in accordance with policy term and conditions.</p>
               
              </div>
            </div>
          </div>
        </div>
    </>
    
  );
};

export default Services;
