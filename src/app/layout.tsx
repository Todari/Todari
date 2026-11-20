import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import PortfolioNavigation from "@/components/PortfolioNavigation";
import { services } from "@/data/services";

const SITE_URL = "https://todari.dev";
const SITE_NAME = "Todari";
const DESCRIPTION =
  "프로덕트 엔지니어 토다리의 포트폴리오. 포크레터의 MySQL 실행계획, AiBright의 75만 건 집계 메모리, 메트로놈들의 박자 동기화, 행동대장의 정산 트랜잭션을 코드와 회귀 실험으로 설명합니다.";
const PAGE_TITLE =
  "Todari | 프로덕트 엔지니어의 설계와 검증";

// Lossless WOFF2 versions of the iOS app's Forc Sans. OFL notices are in public/fonts.
const forcSans = localFont({
  src: [
    { path: "./fonts/forc-sans-400.woff2", weight: "400" },
    { path: "./fonts/forc-sans-500.woff2", weight: "500" },
    { path: "./fonts/forc-sans-600.woff2", weight: "600" },
    { path: "./fonts/forc-sans-700.woff2", weight: "700" },
  ],
  variable: "--font-forc-sans",
  adjustFontFallback: false,
  preload: false,
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
    "AiBright",
    "CMS 자동화",
    "릴스 제작 자동화",
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
    "광고 어트리뷰션",
    "Marketing Attribution",
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
        alt: "토다리 · 포크레터 게시물 12개의 최신 지표를 위해 5,845행을 읽던 쿼리",
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
};

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: "토다리",
      description: DESCRIPTION,
      inLanguage: "ko-KR",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      alternateName: "토다리",
      jobTitle: "Product Engineer",
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "홍익대학교" },
        { "@type": "EducationalOrganization", name: "우아한테크코스" },
      ],
      worksFor: { "@type": "Organization", name: "링카이브" },
      description: DESCRIPTION,
      email: "mailto:hello@todari.dev",
      url: SITE_URL,
      knowsAbout: [
        "SQL Query Optimization",
        "Memory Profiling",
        "Distributed Clock Synchronization",
        "Transactional Consistency",
        "Service Planning",
        "Product Management",
        "Product Operations",
        "Product Growth",
        "UI/UX Design",
        "Frontend Development",
        "Technical SEO",
        "Generative Engine Optimization",
        "GA4",
        "Marketing Attribution",
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
        "https://metronome.todari.dev",
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
      className={`${forcSans.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <PortfolioNavigation />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
