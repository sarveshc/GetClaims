'use client';
import React from 'react'


const TimeLine = () => {
    const experiences = [
        { year: "1", duration: "Step", title: "Reach out to us" },
        { year: "2", duration: "Step", title: "Share case documents" },
        { year: "3", duration: "Step", title: "Case Acceptance" },
        { year: "4", duration: "Step", title: "Registration" },
        { year: "5", duration: "Step", title: "Complaint Resolution" },
      ];
  return (
    <div>
         <style jsx>{`
        .mainTimeline {
    position: relative
}

.mainTimeline:before {
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    background: #c6c6c6;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0
}

.mainTimeline .timeline {
    margin-bottom: 40px;
    position: relative
}

.mainTimeline .timeline:after {
    content: "";
    display: block;
    clear: both
}

.mainTimeline .icon {
    width: 18px;
    height: 18px;
    line-height: 18px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0
}

.mainTimeline .icon:before,
.mainTimeline .icon:after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.33s ease-out 0s
}

.mainTimeline .icon:before {
    background: #fff;
    border: 2px solid #232323;
    left: -3px
}

.mainTimeline .icon:after {
    border: 2px solid #c6c6c6;
    left: 3px
}

.mainTimeline .timeline:hover .icon:before {
    left: 3px
}

.mainTimeline .timeline:hover .icon:after {
    left: -3px
}

.mainTimeline .dateContent {
    width: 50%;
    float: left;
    margin-top: 22px;
    position: relative
}

.mainTimeline .dateContent:before {
    content: "";
    width: 36.5%;
    height: 2px;
    background: #c6c6c6;
    margin: auto 0;
    position: absolute;
    top: -20px;
    right: 10px;
    bottom: 0
}

.mainTimeline .dateOuter {
    width: 125px;
    height: 125px;
    font-size: 16px;
    text-align: center;
    margin: auto;
    z-index: 1
}

.mainTimeline .dateOuter:before,
.mainTimeline .dateOuter:after {
    content: "";
    width: 125px;
    height: 125px;
    margin: 0 auto;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: all 0.33s ease-out 0s
}

.mainTimeline .dateOuter:before {
    background: #fff;
    border: 2px solid #232323;
    left: -6px
}

.mainTimeline .dateOuter:after {
    border: 2px solid #c6c6c6;
    left: 6px
}

.mainTimeline .timeline:hover .dateOuter:before {
    left: 6px
}

.mainTimeline .timeline:hover .dateOuter:after {
    left: -6px
}

.mainTimeline .date {
    width: 100%;
    margin: auto;
    position: absolute;
    top: 27%;
    left: 0
}

.mainTimeline .month {
    font-size: 18px;
    font-weight: 700
}

.mainTimeline .year {
    display: block;
    font-size: 30px;
    font-weight: 700;
    color: #232323;
    line-height: 36px
}

.mainTimeline .timelineContent {
    width: 50%;
    padding: 20px 0 20px 50px;
    float: right
}

.mainTimeline .title {
    font-size: 19px;
    font-weight: 700;
    line-height: 24px;
    margin: 0 0 15px 0
}

.mainTimeline .description {
    margin-bottom: 0
}

.mainTimeline .timeline:nth-child(2n) .dateContent {
    float: right
}

.mainTimeline .timeline:nth-child(2n) .dateContent:before {
    left: 10px
}

.mainTimeline .timeline:nth-child(2n) .timelineContent {
    padding: 20px 50px 20px 0;
    text-align: right
}

@media only screen and (max-width: 991px) {
    .mainTimeline .dateContent {
        margin-top: 35px
    }
    .mainTimeline .dateContent:before {
        width: 22.5%
    }
    .mainTimeline .timelineContent {
        padding: 10px 0 10px 30px
    }
    .mainTimeline .title {
        font-size: 17px
    }
    .mainTimeline .timeline:nth-child(2n) .timelineContent {
        padding: 10px 30px 10px 0
    }
}

@media only screen and (max-width: 767px) {
    .mainTimeline:before {
        margin: 0;
        left: 7px
    }
    .mainTimeline .timeline {
        margin-bottom: 20px
    }
    .mainTimeline .timeline:last-child {
        margin-bottom: 0
    }
    .mainTimeline .icon {
        margin: auto 0
    }
    .mainTimeline .dateContent {
        width: 95%;
        float: right;
        margin-top: 0
    }
    .mainTimeline .dateContent:before {
        display: none
    }
    .mainTimeline .dateOuter {
        width: 110px;
        height: 110px
    }
    .mainTimeline .dateOuter:before,
    .mainTimeline .dateOuter:after {
        width: 110px;
        height: 110px
    }
    .mainTimeline .date {
        top: 30%
    }
    .mainTimeline .year {
        font-size: 24px
    }
    .mainTimeline .timelineContent,
    .mainTimeline .timeline:nth-child(2n) .timelineContent {
        width: 95%;
        text-align: center;
        padding: 10px 0
    }
    .mainTimeline .title {
        margin-bottom: 10px
    }
}
      `}</style>
      <div class="row align-items-center mb-20">
        <div class="col-lg-12 col-md-12">
            <div class="title-style-one text-center text-md-start">
                <h3 class="main-title text-center testiTitle fw-bold tx-dark">
                    What’ss <span>Our Client</span> Say About us.
                </h3>
            </div>
            <div class="col-lg-12 ms-auto aos-init" data-aos="">
                <p class="text-lg text-center  md-pt-30 m0">
                    At GetClaims, we assist you in resolving your insurance claims and disputes. Many people are unhappy with the outcomes of their claim settlements.
                    </p>
            </div>
            </div>
        </div>
        <div className="mainTimeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline">
              <div className="icon"></div>
              <div className="dateContent">
                <div className="dateOuter">
                  <span className="date">
                    <span className="month">{exp.duration}</span>
                    <span className="year">{exp.year}</span>
                  </span>
                </div>
              </div>
              <div className="timelineContent">
                <h5 className="title">{exp.title}</h5>
                <p className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur ex sit amet massa scelerisque scelerisque.
                </p>
              </div>
            </div>
          ))}
        </div>
      
    </div>
  )
}

export default TimeLine
