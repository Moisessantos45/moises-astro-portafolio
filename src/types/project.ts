interface ProjectBase {
  id: number;
  slug: string;
  title: string;
  typeProject: string;
  banner: string;
  description: string;
  createdAt: string;
  linkBackend: string[];
  technologies: string[];
}

interface Project extends ProjectBase {
  linkFrontend: string[];
  link: string;
  counterLikes: number;
}

interface ProjectDTO extends ProjectBase {
  linkFrontend: string[];
  link: string;
  characteristics: string[];
  learning: string[];
  images: string[];
}

const initialProject: ProjectDTO = {
  id: -1,
  slug: "",
  title: "",
  typeProject: "",
  description: "",
  technologies: [],
  characteristics: [],
  learning: [],
  banner: "",
  images: [],
  link: "",
  linkFrontend: [],
  linkBackend: [],
  createdAt: "",
};

export type { ProjectBase, Project, ProjectDTO };
export { initialProject };
