import { PAGE_SIZE, SNIPPET_LENGTH } from "./const/search.js";

const ISO_DAY = /^\d{4}-\d{2}-\d{2}/;

const _plainText = (text) =>
  (text ?? "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}(#{1,6}|[-*+]|>)\s+/gm, "")
    .replace(/\*\*|__|`+/g, "")
    .replace(/\s+/g, " ")
    .trim();

const _trim = (text) => {
  const flat = _plainText(text);
  if (flat.length <= SNIPPET_LENGTH) return flat;
  const cut = flat.slice(0, SNIPPET_LENGTH);
  const lastSpace = cut.lastIndexOf(" ");
  const clean = lastSpace > SNIPPET_LENGTH / 2 ? cut.slice(0, lastSpace) : cut;
  return `${clean.trimEnd()}…`;
};

const _publishedAt = (value) =>
  typeof value === "string" && ISO_DAY.test(value) ? value.slice(0, 10) : undefined;

export const parseResults = (data, page, source) =>
  (data?.results ?? [])
    .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    .map((item) => {
      const publishedAt = _publishedAt(item.published_at);
      return {
        title: item.title ?? "",
        url: item.url ?? "",
        snippet: _trim(item.snippet || item.description),
        source,
        ...(publishedAt ? { publishedAt } : {}),
      };
    })
    .filter((r) => r.title && r.url);
