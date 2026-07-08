# AI Companion Prototype

Mobile-first prototype for an otome-oriented AI companion and smart life assistant.

## Local Preview

```bash
pnpm install
pnpm run dev
```

Create `.env.local` for real local chat:

```bash
DEEPSEEK_API_KEY=sk-your-deepseek-api-key
DEEPSEEK_MODEL=deepseek-v4-flash
```

## Build

```bash
pnpm run build
```

## Continuous Deployment

Recommended setup:

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. Use the default Vite settings:
   - Install command: `pnpm install`
   - Build command: `pnpm run build`
   - Output directory: `dist`
4. Add environment variables in Vercel:
   - `DEEPSEEK_API_KEY`: your DeepSeek API key
   - `DEEPSEEK_MODEL`: optional, defaults to `deepseek-v4-flash`
   - `WEATHER_API_KEY`: WeatherAPI.com API key for live weather
   - `WEATHER_API_PROVIDER`: optional, defaults to `weatherapi`; also supports `qweather` and `openweather`
   - `ACTIVATION_CODES`: comma-separated activation codes
   - `AI_COMPANION_STORE_PATH`: optional local JSON-store path for prototype data
5. Every future code update pushed to GitHub will update the same Vercel project link.

## DeepSeek Chat

The browser calls `/api/chat`; the serverless route reads `DEEPSEEK_API_KEY` and forwards messages to DeepSeek. Do not put the API key in frontend code.

The chat API now supports DeepSeek tool calling:

- `control_device`: controls a user's saved device.
- `get_weather`: queries the configured weather API for live weather using the user's saved city. Supported keys are `WEATHER_API_KEY`, `QWEATHER_API_KEY`, or `OPENWEATHER_API_KEY`.

Device CRUD lives at `/api/devices` and requires the activated `x-user-id` header. Activation and profile collection live at `/api/activate`.

Plain `pnpm run dev` also serves `/api/chat` locally.

## Database

Prototype data uses a file-backed store when no production database adapter is configured. SQL migrations for a real database are in `migrations/`:

- `001_create_users_and_profiles.sql`
- `002_create_devices.sql`
