import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { services } from "@/data/services";

const SITE_URL = "https://todari.dev";
const SITE_NAME = "Todari";
const DESCRIPTION =
  "서비스 기획에서 시작해 UI/UX와 프론트엔드를 익히고, AI로 학습과 실행의 폭을 넓혀 문제를 제품으로 해결하는 프로덕트 엔지니어 Todari입니다.";

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
    default: "Todari | 문제를 제품으로 해결하는 프로덕트 엔지니어",
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
    "프로덕트 엔지니어",
    "프론트엔드 개발자",
    "AI 활용",
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
    title: "Todari | 문제를 제품으로 해결하는 프로덕트 엔지니어",
    description: DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Todari — 궁금한 것을 직접 만들어 운영하는 서비스 실험실",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Todari | 문제를 제품으로 해결하는 프로덕트 엔지니어",
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
        "UI/UX Design",
        "Frontend Development",
        "AI-assisted Software Development",
        "Product Operations",
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
