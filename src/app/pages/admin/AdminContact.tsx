import { toast } from "sonner";
import { useSiteContent } from "../../context/SiteContentContext";
import { useAdminFormState } from "../../hooks/useAdminFormState";
import type { ContactInfo } from "../../types/siteContent";
import { AdminPage, AdminCard, SaveButton } from "./AdminLayout";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

export function AdminContact() {
  const { content, isLoading, updateContent, saveContent } = useSiteContent();
  const [form, setForm] = useAdminFormState<ContactInfo>(
    content.contact,
    isLoading,
  );

  const handleSave = async () => {
    const mailto =
      form.email && !form.email.startsWith("mailto:")
        ? `mailto:${form.email}`
        : form.email;
    const next = {
      ...content,
      contact: form,
      socialLinks: { ...content.socialLinks, mail: mailto },
    };
    updateContent(() => next);
    try {
      await saveContent(next);
      toast.success("Contact information saved");
    } catch {
      toast.error("Failed to save to server");
    }
  };

  const update = (field: keyof ContactInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AdminPage
      title="Contact Information"
      description="Update contact details shown on the website"
      actions={<SaveButton onClick={handleSave} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard>
          <h2 className="font-semibold text-gray-900 mb-4">Contact Details</h2>
          <p className="text-sm text-gray-500 mb-4">
            Saving also updates the footer email icon link. Social URLs are edited under Links.
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-semibold text-gray-900 mb-4">Section Copy</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="badge">Badge Text</Label>
              <Input
                id="badge"
                value={form.badge}
                onChange={(e) => update("badge", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                value={form.heading}
                onChange={(e) => update("heading", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="headingHighlight">Heading Highlight</Label>
              <Input
                id="headingHighlight"
                value={form.headingHighlight}
                onChange={(e) => update("headingHighlight", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="mt-1.5"
                rows={3}
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
