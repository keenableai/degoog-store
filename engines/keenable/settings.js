export const SETTINGS_SCHEMA = [
  {
    key: "apiKey",
    label: "API Key",
    type: "password",
    secret: true,
    placeholder: "Optional",
    description:
      "Optional. Without a key the engine uses the public endpoint (10 requests per second and 1000 per hour per IP). A key from keenable.ai only lifts those limits.",
  },
];
