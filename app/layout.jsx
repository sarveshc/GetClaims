"use client";

import Aos from "aos";
import { useEffect } from "react";
import Script from "next/script";
import { Nunito, Playfair_Display } from "next/font/google";
import "aos/dist/aos.css";
import "../styles/index.scss";
import ScrollToTop from "@/components/common/ScrollTop";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

const nunito = Nunito({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);
  return (
    <html lang="en">
      <head>
        {/* favicon — umbrella matching logo; ?v=2 forces browsers to re-fetch */}
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg?v=2" />
        <meta name="theme-color" content="#FAA61B" />
      </head>
      <body className={`${nunito.className} ${playfair.variable}`}>
        <a
          href="https://wa.me/918826582181"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="gc-wa-btn"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.1 1.52 5.82L0 24l6.34-1.5A11.95 11.95 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.6-.5-5.12-1.38l-.37-.22-3.77.9.9-3.68-.24-.38A9.97 9.97 0 012 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0122 12c0 5.52-4.48 10-10 10zm5.44-7.5c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.15 8.15 0 01-2.4-1.48 9.05 9.05 0 01-1.66-2.07c-.17-.3 0-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51-.17-.01-.37-.01-.57-.01a1.1 1.1 0 00-.8.37c-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.34z"/>
          </svg>
        </a>
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
        <main className="main-page-wrapper">
          {children}
          <ScrollToTop />
        </main>
      </body>
    </html>
  );
}
