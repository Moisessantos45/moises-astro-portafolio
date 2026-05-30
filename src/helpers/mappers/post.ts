import type { PostInfoBasic } from "@/types/post";
import { getDateToString, getNumber, getString } from "./formatters";
import { serializeToJson } from "./parse";

const mapperPostInfoBasic = (data: Record<string, unknown>): PostInfoBasic => {
  return {
    id: getNumber(data.id),
    slug: getString(data.slug),
    title: getString(data.title),
    content: getString(data.content),
    banner: getString(data.banner),
    tags: serializeToJson<string>(data.tags, []),
    category: getString(data.category),
    author: getString(data.author),
    createdAt: getDateToString(data.created_at),
  };
};

export { mapperPostInfoBasic };
