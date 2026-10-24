import {
  APP_TITLE,
  KEYED_URL,
  MAX_RESULTS,
  PAGE_SIZE,
  PUBLIC_URL,
  TIME_FILTER_DAYS,
} from "./const/search.js";

const DAY_MS = 86_400_000;

const _isoDay = (date) => date.toISOString().slice(0, 10);

const _dateRange = (timeFilter, context) => {
  if (timeFilter === "custom") {
    const range = {};
    if (context?.dateFrom) range.published_after = context.dateFrom;
    if (context?.dateTo) range.published_before = context.dateTo;
    return range;
  }
  const days = TIME_FILTER_DAYS[timeFilter];
  if (!days) return {};
  return { published_after: _isoDay(new Date(Date.now() - days * DAY_MS)) };
};

export const buildBody = (query, page, timeFilter, context) =>
  JSON.stringify({
    query,
    max_results: Math.min(Math.max(1, page) * PAGE_SIZE, MAX_RESULTS),
    ..._dateRange(timeFilter, context),
  });

export const buildUrl = (apiKey) => (apiKey ? KEYED_URL : PUBLIC_URL);

export const buildHeaders = (apiKey) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Keenable-Title": APP_TITLE,
  ...(apiKey ? { "X-API-Key": apiKey } : {}),
});
