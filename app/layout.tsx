import { Metadata } from "next";
import { Inter } from "next/font/google";

import PlausibleProvider from "next-plausible";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const data = {
  description:
    "SeedToScale is an open-source document sharing infrastructure. Free alternative to Docsend with custom domain. Manage secure document sharing with real-time analytics.",
  title: "SeedToScale | The Open Source DocSend Alternative",
  url: "/",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.papermark.io"),
  title: data.title,
  description: data.description,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    siteName: "SeedToScale",
    images: [
      {
        url: "/_static/meta-image.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: data.title,
    description: data.description,
    creator: "@papermarkio",
    images: ["/_static/meta-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link href="https://cdn.prod.website-files.com/6410c40c8f9e67469272e6db/6748501800980c0348cf087c_PPFragment-SansRegular.woff2&display=swap" rel="stylesheet"></link>
      <head>
        <PlausibleProvider
          domain="papermark.io"
          enabled={process.env.NEXT_PUBLIC_VERCEL_ENV === "production"}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
