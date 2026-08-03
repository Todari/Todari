import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { services } from "@/data/services";

const SITE_URL = "https://todari.dev";
const SITE_NAME = "Todari";
const DESCRIPTION =
  "PO 경험을 바탕으로 문제를 정의하고, 실시간·데이터 제품을 출시하며, SEO·GEO·GA4와 AI Development Harness로 운영·개선하는 Product Engineer Todari입니다.";
const PAGE_TITLE =
  "Todari | 제품을 출시하고 운영·성장시키는 프로덕트 엔지니어";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
    template: "%s | Todari",
  },
  description: DESCRIPTION,
  keywords: [
    "Todari",
    "토다리",
    "포트폴리오",
    "웹 서비스",
    "행동대장",
    "LVTI",
    "메트로놈들",
    "React Pixel UI",
    "닭발 헌터",
    "Forcletter",
    "이정표",
    "GEO Dashboard",
    "톡사이",
    "핀투게더",
    "HGT",
    "프로덕트 엔지니어",
    "프론트엔드 개발자",
    "Product Operations",
    "Product Growth",
    "Technical SEO",
    "GEO",
    "GA4",
    "Google Search Console",
    "네이버 서치어드바이저",
    "AI Development Harness",
    "AI 개발 하네스",
    "개발 자동화",
    "CI/CD",
    "Observability",
    "Discord Ops",
  ],
  authors: [{ name: "Todari", url: SITE_URL }],
  creator: "Todari",
  publisher: "Todari",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Todari — 3D Project Dispenser와 AI Development Harness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: "ko-KR",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      jobTitle: "Product Engineer",
      description: DESCRIPTION,
      email: "mailto:hello@todari.dev",
      url: SITE_URL,
      knowsAbout: [
        "Service Planning",
        "Product Management",
        "Product Operations",
        "Product Growth",
        "UI/UX Design",
        "Frontend Development",
        "Technical SEO",
        "Generative Engine Optimization",
        "GA4",
        "Google Search Console",
        "Naver Search Advisor",
        "AI Development Harness",
        "CI/CD Automation",
        "Software Observability",
        "Discord Operations",
      ],
      sameAs: [
        "https://github.com/Todari",
        "https://forcreator.co.kr",
        "https://lvti.my",
        "https://metronomdeul.site",
        "https://react-pixel-ui.vercel.app",
        "https://dakbal.pro",
        "https://jeongpyo.com",
        "https://toksai.todari.dev",
        "https://pintogather.todari.dev",
        "https://hgt.todari.dev",
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/#collection`,
      url: SITE_URL,
      name: "Todari Services",
      description: "Todari가 만든 웹 서비스 목록",
      hasPart: services.map((s) => ({
        "@type": "SoftwareApplication",
        name: s.title,
        description: s.description,
        ...(s.url ? { url: s.url } : {}),
        ...(s.publicRepository ? { sameAs: [s.publicRepository] } : {}),
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
