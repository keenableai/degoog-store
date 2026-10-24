# Keenable for degoog

A [degoog](https://github.com/degoog-org/degoog) store repository with one engine: **Keenable**, web results from the [Keenable search API](https://docs.keenable.ai).

## Install

1. In degoog, open Settings, Store, Add, and paste `https://github.com/keenableai/degoog-store`.
2. Install **Keenable** from the Engines list and enable it in Settings, Engines.
3. Optional: open Configure on the engine and add an API key from [keenable.ai](https://keenable.ai) to lift the public rate limits.

No key is needed. Without one, the engine calls the public endpoint (10 requests per second and 1000 per hour per server IP).

## Engines

| Engine | Bang | Type | Key |
|---|---|---|---|
| [Keenable](engines/keenable) | `!keenable` | web | optional |

See [engines/keenable/README.md](engines/keenable/README.md) for what is sent to the API.

## License

MIT
