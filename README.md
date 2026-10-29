# Vana Rasa — Luxury Resort Concept

A responsive portfolio concept for a fictional Kerala coastal retreat, created for Aslisite Technologies. This frontend-only demo includes ten sample accommodation types, informational pages, a simulated booking flow, browser-local reservation management, and a sample operations dashboard.

## Run locally

```sh
npm install
npm run dev
```

## Checks

```sh
npm run build
npm run lint
npm test
```

## Deployment

Build with `npm run build`; the static output is `dist/`. Vercel uses `vercel.json` to serve SPA routes. Cloudflare Pages uses `public/_redirects`. No domain is hardcoded into route handling. Configure the desired custom domain in the hosting provider and update the sample canonical host in `public/sitemap.xml` and `public/robots.txt` before deployment if it differs from `resort.demo.aslisite.com`.

## Demo behavior and limitations

- Resort, room inventory, rates, experiences, policies, availability, dashboard metrics, and all imagery are fictional or conceptual. Photography is loaded from Unsplash URLs and does not depict Vana Rasa.
- Availability is a frontend simulation; there is no inventory service or backend.
- Demo reservations are persisted locally in this browser with Zustand and LocalStorage. They do not sync between devices.
- The booking simulation applies sample occupancy limits, minimum stays, deterministic date-range availability, seasonal rate uplift, additional guest charges, add-ons, and illustrative tax.
- No real booking, payment, email, authentication, or inquiry submission occurs.
- The 18% tax estimate and add-on prices are illustrative UI values only.
- This is a portfolio concept, not a production reservation or hospitality service.
