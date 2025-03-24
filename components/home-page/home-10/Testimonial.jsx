"use client";

import Slider from "react-slick";
import React, { useRef } from "react";
import Image from "next/image";

const Testimonial = () => {
  const data = [
    {
      imgSrc: "/images/icon/ic_02.png",
      backgroundColor: "#825EFF",
      rating: "Very solid, 8.3 out 10",
      text: "We’v 9,000 agents across are country, Find agents near your neighborhood.",
      author: "Martin Jonas",
      country: "USA",
    },
    {
      imgSrc: "/images/icon/ic_02.png",
      backgroundColor: "#08CE97",
      rating: "Very solid, 7.2 out 10",
      text: "We’v 9,000 agents across are country, Find agents near your neighborhood.",
      author: "Martin Jonas",
      country: "USA",
    },
    {
      imgSrc: "/images/icon/ic_02.png",
      backgroundColor: "#FF8A3A",
      rating: "Very solid, 9.1 out 10",
      text: "We’v 9,000 agents across are country, Find agents near your neighborhood.",
      author: "Martin Jonas",
      country: "USA",
    },
    {
      imgSrc: "/images/icon/ic_02.png",
      backgroundColor: "#08CE97",
      rating: "Very solid, 10 out 10",
      text: "We’v 9,000 agents across are country, Find agents near your neighborhood.",
      author: "Martin Jonas",
      country: "USA",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const sliderRef = useRef(null);

  return (
    <>
      <div className="container">
        <div className="row align-items-center mb-20">
          <div className="col-lg-8 col-md-7">
            <div className="title-style-one text-center text-md-start">
              <h3 className="main-title testiTitle fw-bold tx-dark">
                Lorem ipsum <span>dolor sit</span> elit.
              </h3>
            </div>
            {/* /.title-style-one */}
          </div>
          <div className="col-lg-4 col-md-5 ms-auto d-flex justify-content-center justify-content-sm-end">
            <ul className="slider-arrows slick-arrow-one d-flex justify-content-center style-none mb-30">
              <li
                className="prev_f1 slick-arrow rounded-circle text-center fs-20 tran3s"
                onClick={() => sliderRef.current.slickPrev()}
              >
                <i className="bi bi-chevron-left" />
              </li>
              <li
                className="next_f1 slick-arrow rounded-circle text-center fs-20 tran3s"
                onClick={() => sliderRef.current.slickNext()}
              >
                <i className="bi bi-chevron-right" />
              </li>
            </ul>
          </div>
        </div>
        <div className="testiSlider lg-mt-60">
        <div className="feedback_slider_one custom">
          <Slider {...settings} ref={sliderRef} arrows={false}>
            {data.map((item, index) => (
              <div className="item" key={index}>
                <div className="feedback-block-one align-items-center d-sm-flex">
                  <div className="img-meta position-relative">
                    <Image
                      width={89}
                      height={89}
                      src={item.imgSrc}
                      alt="img"
                      className="m-auto"
                    />
                  </div>
                  <div className="text-wrapper pt-20">
                    {/* <div
                      className="icon d-flex align-items-center justify-content-center rounded-circle mb-15"
                      style={{ backgroundColor: item.backgroundColor }}
                    >
                      <Image
                        width={28}
                        height={25}
                        src="/images/icon/icon_07.svg"
                        alt="img"
                      />
                    </div> */}
                    {/* <div className="rating h3 fw-bold tx-dark">
                      {item.rating}
                    </div> */}
                    <p className="text-sm">{item.text}</p>
                    {/* <h6>
                      {item.author},{" "}
                      <span className="opacity-25">{item.country}</span>
                    </h6> */}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* /.feedback_slider_one */}
      </div>

     

      </div>
      {/* /.container */}

      
      {/* /.inner-content */}
    </>
  );
};

export default Testimonial;
