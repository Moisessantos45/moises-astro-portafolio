import type { TypeProyects } from "@/types/data";

const fromToJsonMap = (data: { [key: string]: any }): TypeProyects => {
  return {
    id: data["id"],
    title: data["title"] || "",
    typeProyect: data["typeProyect"] || "",
    description: data["description"],
    tecnologies: data["tecnologies"],
    caracteristicas: data["caracteristicas"],
    image: data["image"],
    imagenesProyect: data["imagenesProyect"],
    link: data["link"],
    createdAt: data["createdAt"],
    link_github: data["link_gitHub"],
    status: data["status"],
  };
};

export { fromToJsonMap };
