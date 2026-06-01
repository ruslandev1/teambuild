import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  FileSpreadsheet,
  FileSignature,
  Receipt,
  CreditCard,
  BarChart3,
  LineChart,
  Stamp,
  Warehouse,
  Users,
  ListTodo,
  GraduationCap,
  Target,
  Network,
  ClipboardList,
  Brain,
  Briefcase,
  Building2,
  Filter,
  Bell,
  Sparkles,
  Trophy,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export interface FinoraModule {
  title: string;
  description: string;
  benefit: string;
  icon: LucideIcon;
  color: string;
}

export const finoraSystemModules: FinoraModule[] = [
  {
    title: "Budget",
    description:
      "Plan, track, and optimize your enterprise budget with real-time budget-vs-actual comparison.",
    benefit: "Financial control strengthens by 40%",
    icon: Wallet,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Estimate (Smeta)",
    description:
      "Prepare and approve work estimates faster with version history and approval workflows.",
    benefit: "Estimate preparation time drops by 60%",
    icon: FileSpreadsheet,
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Contracts",
    description:
      "Manage the full contract lifecycle with SIMA integration, deadlines, and counterparty tracking.",
    benefit: "Contract risk reduced by 50%",
    icon: FileSignature,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Invoicing",
    description:
      "Automate invoice creation, sending, and tracking with templates and tax calculations.",
    benefit: "Payment speed increases by 35%",
    icon: Receipt,
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Payments",
    description:
      "Full control over incoming and outgoing payments with multi-currency support and alerts.",
    benefit: "Late payments reduced by 70%",
    icon: CreditCard,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Chart Reports",
    description:
      "Interactive dashboards for budget, contracts, warehouse, HR, tasks, and more.",
    benefit: "Decision-making accelerates by 45%",
    icon: BarChart3,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Detailed Reports",
    description:
      "50+ report templates with scheduling, export, and multi-level filtering.",
    benefit: "Report preparation time drops by 80%",
    icon: LineChart,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "SIMA Integration",
    description:
      "Secure legally binding e-signatures through Azerbaijan's SIMA system, fully integrated.",
    benefit: "Manual document work reduced by 90%",
    icon: Stamp,
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Warehouse Management",
    description:
      "Real-time inventory tracking with barcode/QR support and multi-warehouse transfers.",
    benefit: "Warehouse loss reduced by 55%",
    icon: Warehouse,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Human Resources",
    description:
      "Digital HR from employee profiles and org structure to staffing oversight.",
    benefit: "HR operations accelerate by 50%",
    icon: Users,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Tasks",
    description:
      "Team task management with projects, Kanban boards, and progress tracking.",
    benefit: "Team productivity increases by 30%",
    icon: ListTodo,
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "Training & Development",
    description:
      "Plan employee growth with online training, certifications, and KPI impact tracking.",
    benefit: "Employee development improves by 40%",
    icon: GraduationCap,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Performance Management",
    description:
      "KPI tracking, development plans, and reward systems for individuals and teams.",
    benefit: "Employee productivity increases by 45%",
    icon: Target,
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Intranet",
    description:
      "Corporate news, document base, notifications, org chart, and event calendar.",
    benefit: "Internal communication strengthens by 60%",
    icon: Network,
    color: "from-blue-600 to-indigo-600",
  },
  {
    title: "Surveys",
    description:
      "Centralized customer, employee, and partner surveys with routing and analytics.",
    benefit: "Response time shortened by 50%",
    icon: ClipboardList,
    color: "from-teal-500 to-cyan-500",
  },
  {
    title: "AI Analytics",
    description:
      "AI-powered data analysis with pattern detection and smart decision recommendations.",
    benefit: "Analytical accuracy increases by 60%",
    icon: Brain,
    color: "from-purple-600 to-violet-600",
  },
];

export const finoraCareersModules: FinoraModule[] = [
  {
    title: "Vacancy & Internship Programs",
    description:
      "Create and manage job postings and internship programs with AZ/EN/RU support.",
    benefit: "Centralized hiring foundation",
    icon: Briefcase,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Department Requests",
    description:
      "Department heads submit staffing requests directly with transparent approval flow.",
    benefit: "Leaders join the process without waiting on admin",
    icon: Building2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Applications & Filtering",
    description:
      "Unified applicant panel with powerful filters by role, date, status, education, and experience.",
    benefit: "Fast multi-level candidate selection",
    icon: Filter,
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Status & Notifications",
    description:
      "Custom email templates for every hiring stage with automatic candidate updates.",
    benefit: "Candidates informed at every step",
    icon: Bell,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "AI CV Evaluation",
    description:
      "AI reads PDF/Word CVs, scores fit against job requirements, and ranks candidates.",
    benefit: "Best matches surface automatically",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Tests & Competitions",
    description:
      "Send invitations, track attendance, and automate reminders for assessments.",
    benefit: "Full visibility on who attends",
    icon: Trophy,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Survey Management",
    description:
      "HR sends evaluation forms to selected contacts and collects responses in reports.",
    benefit: "Structured feedback at scale",
    icon: MessageSquare,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Additional Features",
    description:
      "Private vacancy sharing via email, manual and automatic blacklist management.",
    benefit: "Control over sensitive hiring workflows",
    icon: ShieldCheck,
    color: "from-gray-600 to-gray-800",
  },
];

export const finoraPlatforms = [
  {
    id: "system",
    name: "Finora System",
    tagline: "Enterprise Management Platform",
    description:
      "A complete management system for modern enterprises. Unifies budget, HR, contracts, warehouse, and every business process on one platform with real-time analytics and SIMA integration.",
    highlights: [
      "16 fully integrated modules",
      "360° business oversight",
      "Real-time data & reporting",
      "SIMA e-signature integration",
      "Up to 70% less manual work",
    ],
    url: "https://www.finorasystem.com",
    gradient: "from-violet-600 to-indigo-600",
    stat: { value: "16", label: "Modules" },
  },
  {
    id: "careers",
    name: "Finora Careers",
    tagline: "Smart Recruitment Platform for HR",
    description:
      "Digitize hiring end to end — from vacancy and internship programs to AI-powered CV analysis, filtering, notifications, and real-time recruitment analytics.",
    highlights: [
      "8 powerful hiring modules",
      "AI CV scoring & ranking",
      "Department-driven requests",
      "Multi-level applicant filters",
      "Stage-based email notifications",
    ],
    url: "https://careers.finora.az",
    gradient: "from-pink-500 to-rose-500",
    stat: { value: "AI", label: "CV Analysis" },
  },
];
