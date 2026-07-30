import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { services } from "@/data/services";

const SITE_URL = "https://todari.dev";
const SITE_NAME = "Todari";
const DESCRIPTION =
  "궁금한 것을 직접 만들어 운영하는 Todari의 서비스 실험실. AI 크리에이터 분석, 모임 정산, 실시간 협업 도구, UI 라이브러리 등 질문에서 시작한 작업을 모았습니다.";

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
    default: "Todari | 직접 만들어 운영하는 서비스 실험실",
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
    title: "Todari | 직접 만들어 운영하는 서비스 실험실",
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
    title: "Todari | 직접 만들어 운영하는 서비스 실험실",
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
    icon: "/favicon.ico",
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
      name: "Taehun Lee",
      alternateName: "Todari",
      url: SITE_URL,
      sameAs: [
        "https://github.com/Todari",
        "https://forcreator.co.kr",
        "https://lvti.my",
        "https://metronomdeul.site",
        "https://react-pixel-ui.vercel.app",
        "https://dakbal.pro",
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/#collection`,
      url: SITE_URL,
      name: "Todari Services",
      description: "Todari가 만든 웹 서비스 목록",
      hasPart: services.map((s) => ({
        "@type": "WebSite",
        name: s.title,
        description: s.description,
        url: s.url,
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
