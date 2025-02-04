import HeroSubscribe from "./HeroSubscribe";
import Illustration from "./Illustration";

const Hero = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <h1 className="hero-heading fw-bold tx-dark">
          Helping You Claim What's Rightfully <br />  Yours in accordance
            <span className="position-relative d-inline-block"> with Policy Terms & Conditions.</span>
          </h1>
          <p className="text-lg mb-60 pt-50 pe-xl-5 lg-pt-30 lg-mb-40">
          We are proud to offer Claim Assistance Services with expert support.
          </p>

          {/* <HeroSubscribe /> */}

          {/* <div className="pr-info fw-500 fs-20 tx-dark mt-35">
            Over
            <span className="fw-bold text-decoration-underline">
              1000+ client
            </span>
              all over country.
          </div> */}
        </div>
      </div>
      {/* End .row */}

      {/* <div className="card-one shapes bg-white">
        <div className="icon rounded-circle position-absolute fs-18 text-white">
          <i className="bi bi-check-lg" />
        </div>
        <h6 className="fw-500 tx-dark mb-15">Save up to 50% in Yearly plan.</h6>
        <a href="#" className="more-btn tran3s text-uppercase fw-500 fs-13">
          Learn MORe
        </a>
      </div> */}
      {/* End card-one */}

      <Illustration />
      {/* /.illustration-holder */}
    </div>
  );
};

export default Hero;
