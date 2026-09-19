# FaceoffEdge site — project notes

## Pre-launch checklist (current deploy is a TEST launch)

Do these before the real public launch:

1. ~~**Remove stray folders from the deploy**~~ — done: `uploads/`, `backups/`, `screenshots/`
   deleted 2026-09-19.
2. **Unlinked-but-live pages** — `FaceoffEdge Waitlist -saved - not live-.dc.html`,
   `FaceoffEdge Preorder -saved - not live-.dc.html`, and
   `FaceoffEdge Buy (link button backup).dc.html` still deploy as guessable URLs. Decide
   whether to keep or remove.
3. **App Store buttons** currently point at Home's `#download` anchor, not a real listing.
   Swap in the App Store URL when the app is published.
4. **Poster frame for setup step 3** — `assets/setup-step-03-poster.png` is still the old
   video's first frame.

## Deploy structure (GitHub Pages)

The site deploys to **GitHub Pages**, which ignores `vercel.json` and `_redirects`. Routing
is done with real folders instead:

- `index.html` + `404.html` = Home. `app/`, `sensor/`, `setup/`, `buy/`, `contact/`, `faq/`,
  `info/`, `patents/` each hold a built `index.html` plus their own `SiteNav.dc.html` /
  `SiteFooter.dc.html` copies.
- All links in built files are RELATIVE (`../app/`, `../assets/…`) so the site works both at
  a domain root and under `username.github.io/repo/`.
- `.nojekyll` is required (keeps Pages from filtering files).
- The `*.dc.html` files at the root are the EDITABLE SOURCES. After editing any of them the
  built folders must be regenerated — otherwise the deploy keeps serving the old page.

## Things to know

- Nav/footer links use pretty routes (`/`, `/app`, `/sensor`, `/setup`, `/buy`, `/contact`,
  `/faq`, `/info`, `/patents`). These resolve via `vercel.json` + `_redirects` on the live
  site only — they do NOT navigate in the preview pane. Test nav on the deployed site.
- `index.html` is a verbatim copy of `FaceoffEdge Home.dc.html`. Any Home edit must be
  copied to `index.html` too.
- Unknown paths fall through to Home via the catch-all rewrite. There is no 404 page.
- Setup-page videos won't play in the preview (the preview server ignores byte-range
  requests). They work on Vercel.
- Stripe links on the Buy page are LIVE, not test.
