# Cooks & Bakes – Home of Cream & Moist Cakes

Glassmorphism cake-ordering site (React + Vite, plain CSS, no backend). Orders are sent through WhatsApp (`https://wa.me/<number>?text=<order>`), default line **055 378 2212**. Installable PWA with offline browsing.

```bash
npm install
npm run dev       # local dev
npm run build     # production build → dist/
```

## Structure
- `src/data/menu.js` – business info, prices, sizes, flavors, designs SD1–SD8 (edit prices here)
- `src/data/order.js` – price calculation + WhatsApp message/URL builder
- `src/components/` – Home, Menu, OrderForm, Contact, etc.
- `public/sw.js`, `public/manifest.webmanifest` – PWA / offline support
- `public/designs/` – cake photos cropped from the flyer (replace with higher-res originals when available)

## Deploy
- **Vercel:** import the repo (config in `vercel.json`).
- **Firebase Hosting:** `npm run build && firebase deploy --only hosting` (config in `firebase.json`).

## TODO
- Set real Facebook / Instagram URLs in `src/data/menu.js` (`BUSINESS.socials`).
- Flavor list is a sensible default – edit `FLAVORS` to match your actual flavors.
