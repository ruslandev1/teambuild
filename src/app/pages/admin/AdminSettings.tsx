import { useState } from "react";
import { toast } from "sonner";
import { useSiteContent } from "../../context/SiteContentContext";
import { AdminPage, AdminCard, SaveButton } from "./AdminLayout";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

export function AdminSettings() {
  const { content, updateContent, resetContent, saveContent } = useSiteContent();
  const [brand, setBrand] = useState(content.brand);
  const [hero, setHero] = useState(content.hero);
  const [footer, setFooter] = useState({
    tagline: content.footer.tagline,
    copyright: content.footer.copyright,
  });

  const handleSave = async () => {
    const next = {
      ...content,
      brand,
      hero,
      footer: { ...content.footer, ...footer },
    };
    updateContent(() => next);
    try {
      await saveContent(next);
      toast.success("Site settings saved");
    } catch {
      toast.error("Failed to save to server");
    }
  };

  const handleReset = async () => {
    if (
      !confirm(
        "Reset all site content to defaults? This will erase your customizations.",
      )
    ) {
      return;
    }
    try {
      await resetContent();
      toast.success("Site reset to defaults");
      window.location.reload();
    } catch {
      toast.error("Failed to reset on server");
    }
  };

  return (
    <AdminPage
      title="Site Settings"
      description="Brand, hero section, and footer copy"
      actions={<SaveButton onClick={handleSave} />}
    >
      <div className="space-y-6">
        <AdminCard>
          <h2 className="font-semibold text-gray-900 mb-4">Brand</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                value={brand.name}
                onChange={(e) =>
                  setBrand((b) => ({ ...b, name: e.target.value }))
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Logo Letter</Label>
              <Input
                value={brand.logoLetter}
                onChange={(e) =>
                  setBrand((b) => ({ ...b, logoLetter: e.target.value }))
                }
                className="mt-1.5"
                maxLength={2}
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-semibold text-gray-900 mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <Label>Badge</Label>
              <Input
                value={hero.badge}
                onChange={(e) => setHero((h) => ({ ...h, badge: e.target.value }))}
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={hero.title}
                  onChange={(e) =>
                    setHero((h) => ({ ...h, title: e.target.value }))
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Title Highlight</Label>
                <Input
                  value={hero.titleHighlight}
                  onChange={(e) =>
                    setHero((h) => ({ ...h, titleHighlight: e.target.value }))
                  }
                  className="mt-1.5"
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={hero.description}
                onChange={(e) =>
                  setHero((h) => ({ ...h, description: e.target.value }))
                }
                className="mt-1.5"
                rows={3}
              />
            </div>
            <div>
              <Label>Hero Image URL</Label>
              <Input
                value={hero.image}
                onChange={(e) =>
                  setHero((h) => ({ ...h, image: e.target.value }))
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Demo Video URL (optional)</Label>
              <Input
                value={hero.demoVideoUrl}
                onChange={(e) =>
                  setHero((h) => ({ ...h, demoVideoUrl: e.target.value }))
                }
                className="mt-1.5"
                placeholder="https://youtube.com/..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t">
              {([1, 2, 3] as const).map((n) => (
                <div key={n} className="space-y-2">
                  <Label>Stat {n}</Label>
                  <Input
                    value={hero[`stat${n}Value`]}
                    onChange={(e) =>
                      setHero((h) => ({
                        ...h,
                        [`stat${n}Value`]: e.target.value,
                      }))
                    }
                    placeholder="Value"
                  />
                  <Input
                    value={hero[`stat${n}Label`]}
                    onChange={(e) =>
                      setHero((h) => ({
                        ...h,
                        [`stat${n}Label`]: e.target.value,
                      }))
                    }
                    placeholder="Label"
                  />
                </div>
              ))}
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-semibold text-gray-900 mb-4">Footer</h2>
          <div className="space-y-4">
            <div>
              <Label>Tagline</Label>
              <Textarea
                value={footer.tagline}
                onChange={(e) =>
                  setFooter((f) => ({ ...f, tagline: e.target.value }))
                }
                className="mt-1.5"
                rows={3}
              />
            </div>
            <div>
              <Label>Copyright Text</Label>
              <Input
                value={footer.copyright}
                onChange={(e) =>
                  setFooter((f) => ({ ...f, copyright: e.target.value }))
                }
                className="mt-1.5"
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard className="border-red-200 bg-red-50/50">
          <h2 className="font-semibold text-red-900 mb-2">Danger Zone</h2>
          <p className="text-sm text-red-800 mb-4">
            Reset all content to factory defaults. This cannot be undone.
          </p>
          <Button variant="destructive" onClick={handleReset}>
            Reset All Content
          </Button>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
