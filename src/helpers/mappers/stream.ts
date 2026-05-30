import type { Stream } from "@/types/stream";
import { getDateToString, getNumber, getString } from "./formatters";

const mapperStream = (data: Record<string, unknown>): Stream => {
  return {
    id: getNumber(data.id),
    title: getString(data.title),
    description: getString(data.description),
    url: getString(data.url),
    status: data.status?.toString() === "true",
    createdAt: getString(data.created_at),
    recordedAt: getDateToString(data.recorded_at),
    updatedAt: getDateToString(data.updated_at),
  };
};

export { mapperStream };
