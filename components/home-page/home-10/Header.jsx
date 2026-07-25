"use client";

import { useEffect, useState } from "react";
import MainMenu from "../../header/MainMenu";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <header
      className={`theme-main-menu sticky-menu theme-menu-one ${
        navbar ? "fixed" : ""
      }`}
    >
      <div className="inner-content position-relative">
        <div className="d-flex 88 align-items-center justify-content-between">
          <div className="logo order-lg-0">
            <Link href="/" className="d-block">
              <Image
                src="/images/logo/logo_01.png"
                alt="logo"
                width={200}
                height={90}
              />
            </Link>
          </div>
          <div className="right-widget ms-auto d-flex align-items-center order-lg-3">
          <Link className="getPhone" href="">
  <svg 
    enableBackground="new 0 0 40 40" 
    height="40px" 
    id="Layer_1" 
    version="1.1" 
    viewBox="0 0 40 40" 
    width="40px" 
    xmlSpace="preserve" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <g>
        <g>
          <g>
            <path 
              d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18c-9.925,0-18-8.075-18-18S10.075,2,20,2 M20,0      C8.955,0,0,8.954,0,20c0,11.047,8.955,20,20,20c11.047,0,20-8.953,20-20C40,8.954,31.047,0,20,0L20,0z" 
              fill="#959595"
            />
          </g>
        </g>
      </g>
      <path 
        clipRule="evenodd" 
        d="M14.371,9.793c1.207-0.228,1.998,1.133,2.6,2.072   c0.586,0.912,1.307,1.982,1.016,3.169c-0.162,0.666-0.764,1.029-1.219,1.422c-0.449,0.388-1.133,0.744-1.299,1.34   c-0.271,0.967,0.322,1.982,0.689,2.56c0.834,1.306,1.842,2.483,3.129,3.534c0.623,0.51,1.488,1.191,2.355,1.016   c1.295-0.262,1.637-1.859,3.047-2.072c1.342-0.203,2.25,0.77,3.008,1.422c0.73,0.631,1.908,1.439,1.828,2.52   c-0.047,0.621-0.545,1.006-0.977,1.381c-0.439,0.383-0.824,0.813-1.258,1.096c-1.051,0.686-2.34,1.022-3.82,0.976   c-1.451-0.045-2.607-0.538-3.656-1.097c-2.051-1.094-3.672-2.633-5.199-4.348c-1.502-1.686-2.889-3.682-3.656-5.889   c-0.957-2.756-0.451-5.587,1.098-7.353c0.262-0.3,0.676-0.613,1.055-0.935C13.49,10.284,13.84,9.893,14.371,9.793z" 
        fill="#959595" 
        fillRule="evenodd"
      />
    </g>
  </svg> 
  +91 80468-10500  
</Link>
          
             {/* <Link
              href="/contact/contact-v2"
              className="contact-btn-one fs-16 fw-500 text-white tran3s d-none d-lg-block"
            >
              Contact us
            </Link> */}
          </div>{" "}
          {/* /.right-widget */}
          <MainMenu />
        </div>
      </div>
      {/* /.inner-content */}
    </header>
  );
};

export default Header;
