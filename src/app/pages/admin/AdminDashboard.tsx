import { Link } from "react-router";
import { Mail, FolderKanban, Link2, Settings } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";
import { AdminPage, AdminCard } from "./AdminLayout";

const quickLinks = [
  {
    to: "/admin/contact",
    label: "Contact Info",
    description: "Email, phone, address, and section copy",
    icon: Mail,
    color: "from-blue-500 to-cyan-500",
  },
  {
    to: "/admin/projects",
    label: "Platforms",
    description: "Manage Finora System and Finora Careers listings",
    icon: FolderKanban,
    color: "from-violet-500 to-purple-500",
  },
  {
    to: "/admin/links",
    label: "Links",
    description: "Social media and footer navigation links",
    icon: Link2,
    color: "from-orange-500 to-amber-500",
  },
  {
    to: "/admin/settings",
    label: "Site Settings",
    description: "Brand name, hero content, and footer text",
    icon: Settings,
    color: "from-emerald-500 to-teal-500",
  },
];

export function AdminDashboard() {
  const { content } = useSiteContent();

  return (
    <AdminPage
      title="Dashboard"
      description="Manage your Finora website content"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <AdminCard>
          <p className="text-sm text-gray-500">Platforms</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {content.projects.length}
          </p>
        </AdminCard>
        <AdminCard>
          <p className="text-sm text-gray-500">Contact Email</p>
          <p className="text-lg font-semibold text-gray-900 mt-1 truncate">
            {content.contact.email}
          </p>
        </AdminCard>
        <AdminCard>
          <p className="text-sm text-gray-500">Brand</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {content.brand.name}
          </p>
        </AdminCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickLinks.map(({ to, label, description, icon: Icon, color }) => (
          <Link key={to} to={to}>
            <AdminCard className="hover:border-violet-300 hover:shadow-md transition-all cursor-pointer h-full">
              <div className="flex gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shrink-0`}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              </div>
            </AdminCard>
          </Link>
        ))}
      </div>
    </AdminPage>
  );
}
