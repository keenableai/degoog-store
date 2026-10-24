# Keenable

Web search engine for degoog backed by the [Keenable search API](https://docs.keenable.ai/api-reference).

- Works without an API key. Requests go to the public endpoint, which allows 10 requests per second and 1000 per hour per IP.
- Optional **API Key** setting (Settings, Engines, Keenable, Configure). A key only lifts the rate limits; results are the same.
- Bang shortcut: `!keenable`.
- Time filters (day, week, month, year, custom range) map to Keenable's `published_after` / `published_before` dates. "Past hour" is treated as the past day, since the API filters by date.
- Pages 1 to 5, 10 results each.

## What is sent where

Each search sends one `POST` from your degoog server to `https://api.keenable.ai/v1/search/public` (or `/v1/search` when a key is set) with:

- the query text, the number of results, and the date range if a time filter is active;
- the header `X-Keenable-Title: degoog`, which the public endpoint requires to identify the app;
- the header `X-API-Key` only if you set a key.

The request goes through `context.fetch`, so your proxy and transport settings apply. Nothing about the visitor (IP, cookies, language) is forwarded.
