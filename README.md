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
5. Every future code update pushed to GitHub will update the same Vercel project link.

## DeepSeek Chat

The browser calls `/api/chat`; the serverless route reads `DEEPSEEK_API_KEY` and forwards messages to DeepSeek. Do not put the API key in frontend code.

Plain `pnpm run dev` also serves `/api/chat` locally.
