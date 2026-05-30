import type { ProjectDTO, Project, ProjectBase } from "@/types/project";
import { getDateToString, getNumber, getString } from "./formatters";
import { serializeToJson } from "./parse";

const mapperProjectBase = (data: Record<string, unknown>): ProjectBase => {
  return {
    id: getNumber(data.id),
    slug: getString(data.slug),
    title: getString(data.title),
    typeProject: getString(data.type_project),
    banner: getString(data.banner),
    description: getString(data.description),
    createdAt: getDateToString(data.created_at),
    linkBackend: serializeToJson<string>(data.link_backend, []),
    technologies: serializeToJson<string>(data.technologies, []),
  };
};

const mapperProject = (data: Record<string, unknown>): Project => {
  return {
    ...mapperProjectBase(data),
    counterLikes: getNumber(data.counter_likes),
    linkFrontend: serializeToJson<string>(data.link_frontend, []),
    link: getString(data.link),
  };
};

const mapperProjectDTO = (data: Record<string, unknown>): ProjectDTO => {
  return {
    ...mapperProjectBase(data),
    linkFrontend: serializeToJson<string>(data.link_frontend, []),
    link: getString(data.link),
    characteristics: serializeToJson<string>(data.characteristics, []),
    learning: serializeToJson<string>(data.learning, []),
    images: serializeToJson<string>(data.images, []),
  };
};

export { mapperProjectBase, mapperProject, mapperProjectDTO };
