export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  gradient: string;
  projectUrl: string;
}

export interface ContactInfo {
  badge: string;
  heading: string;
  headingHighlight: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

export interface SocialLinks {
  twitter: string;
  linkedin: string;
  github: string;
  mail: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  image: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  demoVideoUrl: string;
}

export interface SiteContent {
  brand: {
    name: string;
    logoLetter: string;
    logoUrl?: string;
  };
  hero: HeroContent;
  contact: ContactInfo;
  projects: Project[];
  socialLinks: SocialLinks;
  footer: {
    tagline: string;
    copyright: string;
    serviceLinks: FooterLink[];
    industryLinks: FooterLink[];
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy: string;
  };
}
