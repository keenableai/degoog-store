import { SETTINGS_SCHEMA } from "./settings.js";
import { buildBody, buildHeaders, buildUrl } from "./request.js";
import { parseResults } from "./parse.js";
import { MAX_PAGE } from "./const/search.js";

export const description =
  "Web search through the Keenable API. Works without a key; an optional API key lifts the public rate limits.";

export default class KeenableEngine {
  isClientExposed = false;
  name = "Keenable";
  bangShortcut = "keenable";
  settingsSchema = SETTINGS_SCHEMA;

  apiKey = "";

  configure(settings) {
    this.apiKey = typeof settings.apiKey === "string" ? settings.apiKey.trim() : "";
  }

  async executeSearch(query, page = 1, timeFilter, context) {
    const pageNumber = Math.max(1, page || 1);
    if (pageNumber > MAX_PAGE) return [];

    const doFetch = context?.fetch ?? fetch;

    try {
      const response = await doFetch(buildUrl(this.apiKey), {
        method: "POST",
        headers: buildHeaders(this.apiKey),
        body: buildBody(query, pageNumber, timeFilter, context),
      });
      context?.sentinel?.(response, this.name);
      return parseResults(await response.json(), pageNumber, this.name);
    } catch (e) {
      if (e?.name === "SentinelBreach") throw e;
      return [];
    }
  }
}
