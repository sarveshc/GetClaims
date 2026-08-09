"use client";

import { useState } from "react";
import Image from "next/image";

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "See How GetClaims Works",
  description:
    "A quick look at how GetClaims takes your case from a rejected or delayed insurance claim through to resolution.",
  thumbnailUrl: "https://getclaims.in/videos/video_banner.jpg",
  uploadDate: "2026-08-09",
  duration: "PT10S",
  contentUrl: "https://getclaims.in/videos/getclaimvideo.mp4",
};

const ProcessVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <div className="text-center mb-50 lg-mb-30">
        <div className="sc-title text-uppercase">Watch &amp; Learn</div>
        <h2 className="main-title fw-bold tx-dark" style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>
          See How GetClaims Works
        </h2>
        <p className="text-lg mt-15" style={{ maxWidth: "640px", margin: "0 auto" }}>
          A quick look at how we take your case from a rejected or delayed
          claim through to resolution.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
              background: "#0f172a",
            }}
          >
            {isPlaying ? (
              <video
                src="/videos/getclaimvideo.mp4"
                controls
                autoPlay
                playsInline
                preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label="Play video: See how GetClaims works"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  display: "block",
                }}
              >
                <Image
                  src="/videos/video_banner.jpg"
                  alt=""
                  fill
                  style={{ objectFit: "contain", opacity: 0.8 }}
                  sizes="(max-width: 992px) 100vw, 900px"
                />
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "50%",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#0d6efd">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessVideo;
