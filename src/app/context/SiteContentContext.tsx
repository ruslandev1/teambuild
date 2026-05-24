import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { defaultSiteContent } from "@shared/defaultSiteContent";
import type { Project, SiteContent } from "@shared/siteContent";
import {
  fetchSiteContent,
  getAdminToken,
  resetSiteContent,
  saveSiteContent,
} from "../lib/api";

function createProjectId(): string {
  return `project-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface SiteContentContextValue {
  content: SiteContent;
  isLoading: boolean;
  isSaving: boolean;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  saveContent: (contentOverride?: SiteContent) => Promise<void>;
  resetContent: () => Promise<void>;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  importProjects: (projects: Omit<Project, "id">[]) => number;
  replaceProjects: (projects: Project[]) => void;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef(content);
  const persistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  contentRef.current = content;

  useEffect(() => {
    fetchSiteContent()
      .then(setContent)
      .catch(() => {
        /* API unavailable — keep defaults */
      })
      .finally(() => setIsLoading(false));
  }, []);

  const persistToServer = useCallback(async (data: SiteContent) => {
    const token = getAdminToken();
    if (!token) return;

    setIsSaving(true);
    try {
      const saved = await saveSiteContent(data, token);
      setContent(saved);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const schedulePersist = useCallback(
    (data: SiteContent) => {
      if (!getAdminToken()) return;
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      persistTimerRef.current = setTimeout(() => {
        void persistToServer(data);
      }, 600);
    },
    [persistToServer],
  );

  const updateContent = useCallback(
    (updater: (prev: SiteContent) => SiteContent) => {
      setContent((prev) => {
        const next = updater(prev);
        schedulePersist(next);
        return next;
      });
    },
    [schedulePersist],
  );

  const saveContent = useCallback(
    async (contentOverride?: SiteContent) => {
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      const data = contentOverride ?? contentRef.current;
      if (contentOverride) setContent(contentOverride);
      await persistToServer(data);
    },
    [persistToServer],
  );

  const resetContent = useCallback(async () => {
    const token = getAdminToken();
    if (token) {
      const data = await resetSiteContent(token);
      setContent(data);
    } else {
      setContent(defaultSiteContent);
    }
  }, []);

  const addProject = useCallback(
    (project: Omit<Project, "id">) => {
      updateContent((prev) => ({
        ...prev,
        projects: [...prev.projects, { ...project, id: createProjectId() }],
      }));
    },
    [updateContent],
  );

  const updateProject = useCallback(
    (id: string, project: Partial<Project>) => {
      updateContent((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === id ? { ...p, ...project } : p,
        ),
      }));
    },
    [updateContent],
  );

  const deleteProject = useCallback(
    (id: string) => {
      updateContent((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
    },
    [updateContent],
  );

  const importProjects = useCallback(
    (projects: Omit<Project, "id">[]) => {
      const withIds = projects.map((p) => ({ ...p, id: createProjectId() }));
      updateContent((prev) => ({
        ...prev,
        projects: [...prev.projects, ...withIds],
      }));
      return withIds.length;
    },
    [updateContent],
  );

  const replaceProjects = useCallback(
    (projects: Project[]) => {
      updateContent((prev) => ({ ...prev, projects }));
    },
    [updateContent],
  );

  const value = useMemo(
    () => ({
      content,
      isLoading,
      isSaving,
      updateContent,
      saveContent,
      resetContent,
      addProject,
      updateProject,
      deleteProject,
      importProjects,
      replaceProjects,
    }),
    [
      content,
      isLoading,
      isSaving,
      updateContent,
      saveContent,
      resetContent,
      addProject,
      updateProject,
      deleteProject,
      importProjects,
      replaceProjects,
    ],
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return ctx;
}

export function parseProjectsImport(
  data: unknown,
): Omit<Project, "id">[] | null {
  const normalize = (
    item: Record<string, unknown>,
  ): Omit<Project, "id"> | null => {
    const title = String(item.title ?? "").trim();
    if (!title) return null;
    const tech = Array.isArray(item.tech)
      ? item.tech.map(String)
      : typeof item.tech === "string"
        ? item.tech
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
    return {
      title,
      category: String(item.category ?? "Web Project"),
      description: String(item.description ?? ""),
      image: String(item.image ?? ""),
      tech,
      gradient: String(item.gradient ?? "from-violet-500 to-purple-500"),
      projectUrl: String(item.projectUrl ?? item.url ?? ""),
    };
  };

  if (Array.isArray(data)) {
    const projects = data
      .map((item) =>
        item && typeof item === "object"
          ? normalize(item as Record<string, unknown>)
          : null,
      )
      .filter((p): p is Omit<Project, "id"> => p !== null);
    return projects.length > 0 ? projects : null;
  }

  if (data && typeof data === "object" && "projects" in data) {
    return parseProjectsImport((data as { projects: unknown }).projects);
  }

  return null;
}
