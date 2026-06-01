import type { SiteContent } from "./siteContent.js";

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "Finora",
    logoLetter: "F",
    logoUrl: "/finora-logo.png",
  },
  hero: {
    badge: "Trusted by 500+ Businesses",
    title: "Empowering Teams,",
    titleHighlight: " Building Success",
    description:
      "Custom web solutions and team building programs designed specifically for hotels, restaurants, and sales companies.",
    image:
      "https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NzExNTkzODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stat1Value: "500+",
    stat1Label: "Projects Delivered",
    stat2Value: "98%",
    stat2Label: "Client Satisfaction",
    stat3Value: "24/7",
    stat3Label: "Support Available",
    demoVideoUrl: "",
  },
  contact: {
    badge: "Contact Us",
    heading: "Let's Build Something ",
    headingHighlight: "Amazing Together",
    description:
      "Ready to transform your business? Let's discuss how we can help you succeed",
    email: "info@finorasystem.com",
    phone: "+994 77 333 05 55",
    address: "123 Business Ave, Suite 100",
  },
  projects: [
    {
      id: "1",
      title: "Hotel Management System",
      category: "Full-Stack Web Application",
      description:
        "Comprehensive booking and guest management platform for a 5-star hotel chain",
      image:
        "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzEyMDQ0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tech: ["React", "Node.js", "PostgreSQL"],
      gradient: "from-blue-500 to-cyan-500",
      projectUrl: "",
    },
    {
      id: "2",
      title: "Restaurant POS System",
      category: "Frontend + Backend",
      description:
        "Real-time order management and kitchen display system for multi-location restaurants",
      image:
        "https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NzExOTQ5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tech: ["Next.js", "Express", "MongoDB"],
      gradient: "from-orange-500 to-amber-500",
      projectUrl: "",
    },
    {
      id: "3",
      title: "Sales Dashboard",
      category: "Web Platform",
      description:
        "Interactive analytics dashboard for tracking team performance and sales metrics",
      image:
        "https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NzExNTkzODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tech: ["React", "TypeScript", "API Integration"],
      gradient: "from-violet-500 to-purple-500",
      projectUrl: "",
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
      "Empowering hotels, restaurants, and sales companies with custom web solutions and team building programs that drive real results.",
    copyright: "© 2026 Finora. All rights reserved.",
    serviceLinks: [
      { label: "Frontend Development", href: "#services" },
      { label: "Backend Solutions", href: "#services" },
      { label: "Team Building", href: "#services" },
      { label: "Full-Stack Projects", href: "#services" },
    ],
    industryLinks: [
      { label: "Hotels", href: "#industries" },
      { label: "Restaurants", href: "#industries" },
      { label: "Sales Companies", href: "#industries" },
      { label: "All Industries", href: "#industries" },
    ],
    privacyPolicy: "#",
    termsOfService: "#",
    cookiePolicy: "#",
  },
};
