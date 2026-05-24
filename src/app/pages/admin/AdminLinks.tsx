import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useSiteContent } from "../../context/SiteContentContext";
import type { FooterLink, SocialLinks } from "../../types/siteContent";
import { AdminPage, AdminCard, SaveButton } from "./AdminLayout";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

export function AdminLinks() {
  const { content, updateContent, saveContent } = useSiteContent();
  const [social, setSocial] = useState<SocialLinks>(content.socialLinks);
  const [serviceLinks, setServiceLinks] = useState<FooterLink[]>(
    content.footer.serviceLinks,
  );
  const [industryLinks, setIndustryLinks] = useState<FooterLink[]>(
    content.footer.industryLinks,
  );
  const [legal, setLegal] = useState({
    privacyPolicy: content.footer.privacyPolicy,
    termsOfService: content.footer.termsOfService,
    cookiePolicy: content.footer.cookiePolicy,
  });

  const handleSave = async () => {
    const next = {
      ...content,
      socialLinks: social,
      footer: {
        ...content.footer,
        serviceLinks,
        industryLinks,
        ...legal,
      },
    };
    updateContent(() => next);
    try {
      await saveContent(next);
      toast.success("Links saved");
    } catch {
      toast.error("Failed to save to server");
    }
  };

  const updateLinkList = (
    list: FooterLink[],
    setList: (links: FooterLink[]) => void,
    index: number,
    field: keyof FooterLink,
    value: string,
  ) => {
    const next = [...list];
    next[index] = { ...next[index], [field]: value };
    setList(next);
  };

  const addLink = (
    list: FooterLink[],
    setList: (links: FooterLink[]) => void,
  ) => {
    setList([...list, { label: "New Link", href: "#" }]);
  };

  const removeLink = (
    list: FooterLink[],
    setList: (links: FooterLink[]) => void,
    index: number,
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  const LinkEditor = ({
    title,
    links,
    setLinks,
  }: {
    title: string;
    links: FooterLink[];
    setLinks: (links: FooterLink[]) => void;
  }) => (
    <AdminCard>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addLink(links, setLinks)}
        >
          <Plus size={14} />
          Add
        </Button>
      </div>
      <div className="space-y-3">
        {links.map((link, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <Input
                placeholder="Label"
                value={link.label}
                onChange={(e) =>
                  updateLinkList(links, setLinks, index, "label", e.target.value)
                }
              />
              <Input
                placeholder="URL or #section"
                value={link.href}
                onChange={(e) =>
                  updateLinkList(links, setLinks, index, "href", e.target.value)
                }
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 text-red-600"
              onClick={() => removeLink(links, setLinks, index)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </AdminCard>
  );

  return (
    <AdminPage
      title="Links"
      description="Social media, footer navigation, and legal page URLs"
      actions={<SaveButton onClick={handleSave} />}
    >
      <div className="space-y-6">
        <AdminCard>
          <h2 className="font-semibold text-gray-900 mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(
              [
                ["twitter", "Twitter / X"],
                ["linkedin", "LinkedIn"],
                ["github", "GitHub"],
                ["mail", "Email (mailto:...)"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <Label>{label}</Label>
                <Input
                  value={social[key]}
                  onChange={(e) =>
                    setSocial((s) => ({ ...s, [key]: e.target.value }))
                  }
                  className="mt-1.5"
                  placeholder={key === "mail" ? "mailto:you@example.com" : "https://..."}
                />
              </div>
            ))}
          </div>
        </AdminCard>

        <LinkEditor
          title="Footer — Services Links"
          links={serviceLinks}
          setLinks={setServiceLinks}
        />

        <LinkEditor
          title="Footer — Industries Links"
          links={industryLinks}
          setLinks={setIndustryLinks}
        />

        <AdminCard>
          <h2 className="font-semibold text-gray-900 mb-4">Legal Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Privacy Policy URL</Label>
              <Input
                value={legal.privacyPolicy}
                onChange={(e) =>
                  setLegal((l) => ({ ...l, privacyPolicy: e.target.value }))
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Terms of Service URL</Label>
              <Input
                value={legal.termsOfService}
                onChange={(e) =>
                  setLegal((l) => ({ ...l, termsOfService: e.target.value }))
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Cookie Policy URL</Label>
              <Input
                value={legal.cookiePolicy}
                onChange={(e) =>
                  setLegal((l) => ({ ...l, cookiePolicy: e.target.value }))
                }
                className="mt-1.5"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
