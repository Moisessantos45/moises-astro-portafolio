import type { TypeProyects, TypeLinks } from "@/types/data";

const serializeToJson = <T>(data: any): T => {
  return JSON.parse(data) || [];
};

const fromToJsonMap = (data: { [key: string]: any }): TypeProyects => {
  return {
    id: data["id"],
    title: data["title"] || "",
    typeProyect: data["typeProyect"] || "",
    description: data["description"] || "",
    tecnologies: serializeToJson<string[]>(data["tecnologies"]),
    characteristics: serializeToJson<string[]>(data["characteristics"]),
    learning: serializeToJson<string[]>(data["learning"]),
    image: data["image"],
    imagenesProyect: serializeToJson<string[]>(data["imagenesProyect"]),
    link: data["link"],
    links: serializeToJson<TypeLinks>(data["links"]),
    status: data["status"],
    counter_likes: data["counter_likes"],
    createdAt: data["createdAt"],
  };
};

export { fromToJsonMap };
