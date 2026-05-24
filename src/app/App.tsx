import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "./components/ui/sonner";
import { SiteContentProvider } from "./context/SiteContentContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { PublicSite } from "./pages/PublicSite";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminContact } from "./pages/admin/AdminContact";
import { AdminProjects } from "./pages/admin/AdminProjects";
import { AdminLinks } from "./pages/admin/AdminLinks";
import { AdminSettings } from "./pages/admin/AdminSettings";

export default function App() {
  return (
    <SiteContentProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicSite />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="links" element={<AdminLinks />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </AdminAuthProvider>
    </SiteContentProvider>
  );
}
