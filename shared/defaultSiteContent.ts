import type { SiteContent } from "./siteContent.js";

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "Finora",
    logoLetter: "F",
    logoUrl: "/finora-logo.png",
  },
  hero: {
    badge: "16 Modules · Full Integration · Real-Time Management",
    title: "Enterprise Management ",
    titleHighlight: "Platform",
    description:
      "Finora is a complete management system for modern enterprises. From budget and HR to contracts and warehouse — unite every business process on one platform with real-time analytics, SIMA integration, and powerful reporting.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stat1Value: "16",
    stat1Label: "Integrated Modules",
    stat2Value: "360°",
    stat2Label: "Business Coverage",
    stat3Value: "1",
    stat3Label: "Unified Platform",
    demoVideoUrl: "",
  },
  contact: {
    badge: "Contact Us",
    heading: "Take Your Business to the ",
    headingHighlight: "Next Level",
    description:
      "Ready to automate operations with Finora System or transform hiring with Finora Careers? Get in touch for a demo.",
    email: "info@finorasystem.com",
    phone: "+994 77 333 05 55",
    address: "https://www.finorasystem.com",
  },
  projects: [
    {
      id: "finora-system",
      title: "Finora System",
      category: "Enterprise Management Platform",
      description:
        "16 powerful modules covering budget, contracts, invoicing, payments, warehouse, HR, tasks, training, performance, intranet, surveys, and AI analytics — all in one integrated platform.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      tech: ["Budget", "HR", "Contracts", "SIMA", "Warehouse", "AI Analytics"],
      gradient: "from-violet-500 to-indigo-500",
      projectUrl: "https://www.finorasystem.com",
    },
    {
      id: "finora-careers",
      title: "Finora Careers",
      category: "Smart Recruitment Platform",
      description:
        "End-to-end digital hiring: vacancies, department requests, AI CV evaluation, advanced filtering, status notifications, tests, surveys, and real-time recruitment analytics.",
      image:
        "https://images.unsplash.com/photo-1521737711862-ece3fd7eb9b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      tech: ["AI CV Analysis", "8 Modules", "Multi-filter", "Notifications"],
      gradient: "from-pink-500 to-rose-500",
      projectUrl: "https://careers.finora.az",
    },
  ],
  socialLinks: {
    twitter: "#",
    linkedin: "#",
    github: "#",
    mail: "mailto:info@finorasystem.com",
  },
  footer: {
    tagline:
      "Finora delivers enterprise management and intelligent recruitment solutions — helping organizations automate processes, strengthen control, and make faster decisions.",
    copyright: "© 2026 Finora. All rights reserved.",
    serviceLinks: [
      { label: "Budget & Finance", href: "#modules" },
      { label: "Human Resources", href: "#modules" },
      { label: "Contracts & SIMA", href: "#modules" },
      { label: "Warehouse", href: "#modules" },
    ],
    industryLinks: [
      { label: "Finora System", href: "#solutions" },
      { label: "Finora Careers", href: "#solutions" },
      { label: "Our Platforms", href: "#platforms" },
      { label: "Contact", href: "#contact" },
    ],
    privacyPolicy: "#",
    termsOfService: "#",
    cookiePolicy: "#",
  },
};
