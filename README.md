# PediaPro - Specialty Builder

## Deployment on Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Netlify Forms detection must be enabled in the Netlify project.
- Form name: `pediapro-survey`

## Central response storage

The app uses **Netlify Forms** for centralized survey submissions. No Google Sheets, Google Apps Script, database, or paid third-party backend is required.

After deployment:
1. Open the Netlify project.
2. Go to **Forms**.
3. Open **pediapro-survey**.
4. Responses can be reviewed, marked spam/verified, deleted, and exported as CSV.

The React app also keeps a local copy in `localStorage` so its existing on-device dashboard continues to work, but the authoritative centralized copy is stored in Netlify Forms.

## Local development

```bash
npm install
npm run dev
```


## Vercel + Upstash Redis

Submissions are saved through `/api/submit` to Upstash Redis using `KV_REST_API_URL` and
`KV_REST_API_TOKEN`. The dashboard reads from `/api/submissions`. Browser `localStorage`
is retained only as an emergency fallback.

Required Vercel Environment Variables:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
