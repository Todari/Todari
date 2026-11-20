"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PortfolioNavigation.module.css";

const tabs = [
  {
    href: "/",
    label: "홈",
    icon: (
      <>
        <path className={styles.fillable} d="M3 11.7 11.3 4a1 1 0 0 1 1.4 0l8.3 7.7-2.2-.3v8.2a1 1 0 0 1-1 1H6.2a1 1 0 0 1-1-1v-8.2L3 11.7Z" />
        <path className={styles.iconDetail} d="M10 20.6v-5.4a.6.6 0 0 1 .6-.6h2.8a.6.6 0 0 1 .6.6v5.4" />
      </>
    ),
  },
  {
    href: "/works",
    label: "프로젝트",
    icon: (
      <g className={styles.fillable}>
        <rect x="3.7" y="3.7" width="6.4" height="6.4" rx="1.35" />
        <rect x="13.9" y="3.7" width="6.4" height="6.4" rx="1.35" />
        <rect x="3.7" y="13.9" width="6.4" height="6.4" rx="1.35" />
        <rect x="13.9" y="13.9" width="6.4" height="6.4" rx="1.35" />
      </g>
    ),
  },
  {
    href: "/writing",
    label: "기술 글",
    icon: (
      <>
        <rect className={styles.fillable} x="5.1" y="3.1" width="13.8" height="17.8" rx="2.2" />
        <path className={styles.iconDetail} d="M9 8.5h6m-6 3.6h6m-6 3.6h3.9" />
      </>
    ),
  },
];

export default function PortfolioNavigation() {
  const pathname = usePathname();
  // Work details have a separate route segment but belong to the Projects tab.
  const section = pathname.startsWith("/work/")
    ? "/works"
    : `/${pathname.split("/")[1]}`;

  return (
    <nav className={styles.navigation} aria-label="포트폴리오 메뉴">
      <div className={styles.tabs} data-selection={tabs.findIndex((tab) => tab.href === section)}>
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={styles.tab}
            aria-current={pathname === tab.href ? "page" : section === tab.href ? "location" : undefined}
            title={tab.label}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{tab.icon}</svg>
            <span className={styles.label}>{tab.label}</span>
          </Link>
        ))}
      </div>
      <Link href="/#contact" className={styles.contact} aria-label="토다리에게 연락" title="토다리에게 연락">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5.5" width="18" height="13" rx="2.6" />
          <path d="m4 7 6.5 5.2a2.4 2.4 0 0 0 3 0L20 7" />
        </svg>
      </Link>
    </nav>
  );
}
