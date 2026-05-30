
import type { Pagination } from "@/types/pagination";
import { getNumber } from "./formatters";

const mapperPagination = (data: Record<string, unknown>): Pagination => ({
  total: getNumber(data.total),
  totalPages: getNumber(data.total_pages),
  page: getNumber(data.page, 1),
  pageSize: getNumber(data.page_size, 10),
});

export { mapperPagination };