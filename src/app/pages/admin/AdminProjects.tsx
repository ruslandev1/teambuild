import { useRef, useState } from "react";
import { Plus, Pencil, Trash2, Upload, Download } from "lucide-react";
import { toast } from "sonner";
import {
  useSiteContent,
  parseProjectsImport,
} from "../../context/SiteContentContext";
import type { Project } from "../../types/siteContent";
import { AdminPage, AdminCard } from "./AdminLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

const emptyProject: Omit<Project, "id"> = {
  title: "",
  category: "",
  description: "",
  image: "",
  tech: [],
  gradient: "from-violet-500 to-purple-500",
  projectUrl: "",
};

const gradientOptions = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-orange-500 to-amber-500",
  "from-pink-500 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-yellow-500 to-orange-500",
];

export function AdminProjects() {
  const {
    content,
    addProject,
    updateProject,
    deleteProject,
    importProjects,
    replaceProjects,
  } = useSiteContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(emptyProject);
  const [techInput, setTechInput] = useState("");

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyProject);
    setTechInput("");
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      tech: project.tech,
      gradient: project.gradient,
      projectUrl: project.projectUrl,
    });
    setTechInput(project.tech.join(", "));
    setDialogOpen(true);
  };

  const handleSaveProject = () => {
    if (!form.title.trim()) {
      toast.error("Project title is required");
      return;
    }
    const tech = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = { ...form, tech };

    if (editingId) {
      updateProject(editingId, payload);
      toast.success("Project updated");
    } else {
      addProject(payload);
      toast.success("Project added");
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteProject(deleteId);
      toast.success("Project deleted");
      setDeleteId(null);
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        const projects = parseProjectsImport(data);
        if (!projects) {
          toast.error("Invalid JSON format. Expected an array of projects.");
          return;
        }
        const count = importProjects(projects);
        toast.success(`Imported ${count} project(s)`);
      } catch {
        toast.error("Could not parse JSON file");
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content.projects, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "teambuild-projects.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Projects exported");
  };

  const handleReplaceImport = () => {
    fileInputRef.current?.click();
  };

  return (
    <AdminPage
      title="Projects"
      description="Manage portfolio projects — add, edit, delete, or import from JSON"
      actions={
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download size={16} />
            Export
          </Button>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} />
            Import JSON
          </Button>
          <Button
            onClick={openCreate}
            className="bg-gradient-to-r from-violet-600 to-indigo-600"
          >
            <Plus size={16} />
            Add Project
          </Button>
        </div>
      }
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleImportFile}
      />

      <AdminCard className="mb-6">
        <p className="text-sm text-gray-600">
          <strong>Import format:</strong> JSON array of objects with{" "}
          <code className="text-xs bg-gray-100 px-1 rounded">title</code>,{" "}
          <code className="text-xs bg-gray-100 px-1 rounded">category</code>,{" "}
          <code className="text-xs bg-gray-100 px-1 rounded">description</code>,{" "}
          <code className="text-xs bg-gray-100 px-1 rounded">image</code>,{" "}
          <code className="text-xs bg-gray-100 px-1 rounded">tech</code> (array or comma-separated),{" "}
          <code className="text-xs bg-gray-100 px-1 rounded">gradient</code>, and optional{" "}
          <code className="text-xs bg-gray-100 px-1 rounded">projectUrl</code>.
          Import appends to existing projects.
        </p>
      </AdminCard>

      {content.projects.length === 0 ? (
        <AdminCard className="text-center py-12">
          <p className="text-gray-600 mb-4">No projects yet.</p>
          <Button onClick={openCreate}>Add your first project</Button>
        </AdminCard>
      ) : (
        <div className="space-y-4">
          {content.projects.map((project) => (
            <AdminCard key={project.id} className="flex gap-4 items-start">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-24 h-24 rounded-lg object-cover shrink-0 bg-gray-100"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                <p className="text-sm text-violet-600">{project.category}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 bg-gray-100 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openEdit(project)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => setDeleteId(project.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      {content.projects.length > 0 && (
        <div className="mt-6">
          <Button
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => {
              if (
                confirm(
                  "Replace all projects with an imported file? This cannot be undone.",
                )
              ) {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".json";
                input.onchange = (ev) => {
                  const file = (ev.target as HTMLInputElement).files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    try {
                      const data = JSON.parse(reader.result as string);
                      const parsed = parseProjectsImport(data);
                      if (!parsed) {
                        toast.error("Invalid JSON");
                        return;
                      }
                      replaceProjects(
                        parsed.map((p, i) => ({
                          ...p,
                          id: `imported-${Date.now()}-${i}`,
                        })),
                      );
                      toast.success("All projects replaced");
                    } catch {
                      toast.error("Could not parse JSON");
                    }
                  };
                  reader.readAsText(file);
                };
                input.click();
              }
            }}
          >
            Replace all via import
          </Button>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="mt-1.5"
                rows={3}
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={form.image}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image: e.target.value }))
                }
                className="mt-1.5"
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Project URL</Label>
              <Input
                value={form.projectUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, projectUrl: e.target.value }))
                }
                className="mt-1.5"
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Technologies (comma-separated)</Label>
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="mt-1.5"
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>
            <div>
              <Label>Gradient</Label>
              <select
                value={form.gradient}
                onChange={(e) =>
                  setForm((f) => ({ ...f, gradient: e.target.value }))
                }
                className="mt-1.5 w-full h-9 rounded-md border border-input px-3 text-sm"
              >
                {gradientOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveProject}
              className="bg-gradient-to-r from-violet-600 to-indigo-600"
            >
              {editingId ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the project from your site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPage>
  );
}
