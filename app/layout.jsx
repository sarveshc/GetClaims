"use client";

import Aos from "aos";
import { useEffect } from "react";
import Script from "next/script";
import "aos/dist/aos.css";
import "../styles/index.scss";
import ScrollToTop from "@/components/common/ScrollTop";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
        {/* favicon — umbrella matching logo; ?v=2 forces browsers to re-fetch */}
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg?v=2" />
        <meta name="theme-color" content="#FAA61B" />
      </head>
      <body>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-LCHCQVVJYP`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LCHCQVVJYP');
          `}
        </Script>
        <div className="main-page-wrapper">
          {children}
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
