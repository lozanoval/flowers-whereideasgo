import type { Metadata } from "next";
import { Cormorant_Garamond, Josefin_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flowers — WhereIdeasgo",
  description:
    "Bespoke floral arrangements. Blue hydrangeas, white roses, anemones — crafted with intention.",
  metadataBase: new URL("https://flowers.whereideasgo.com"),
  openGraph: {
    title: "Flowers — WhereIdeasgo",
    description:
      "Bespoke floral arrangements. Blue hydrangeas, white roses, anemones — crafted with intention.",
    url: "https://flowers.whereideasgo.com",
    siteName: "Flowers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowers — WhereIdeasgo",
    description: "Bespoke floral arrangements crafted with intention.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${josefin.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
