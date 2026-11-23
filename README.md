# ANSUBIX Technologies — 8-page static website

Responsive, multi-page website built with HTML, CSS and vanilla JavaScript. Original homepage styling, wordmark and animated UI are retained; service priority, navigation and additional pages are updated.

## Pages and URL paths

1. Home — `index.html`
2. About Us — `about.html`
3. Blockchain Development — `blockchain-development.html`
4. Crypto Listing — `crypto-listing.html`
5. Website & App Development — `website-app-development.html`
6. UI/UX Design — `ui-ux-design.html`
7. Portfolio — `portfolio.html`
8. Contact Us — `contact.html`

Services on the home page appear in this order: (1) website development and UI/UX, (2) blockchain/Web3, (3) crypto listing/marketing, (4) mobile app development.

## Deploy to GitHub Pages + GoDaddy

1. Create a GitHub repository (public with GitHub Free).
2. Upload the **contents of this folder**, not the enclosing folder itself. `index.html`, all other `.html` files and `assets/` must be at the repo root.
3. Go to repository **Settings → Pages → Build and deployment**, select **Deploy from a branch**, choose `main` and `/(root)`, then Save.
4. In GitHub **Settings → Pages → Custom domain** add and save your verified domain *before* configuring DNS.
5. At your **authoritative DNS provider** (GoDaddy if nameservers point to GoDaddy; Cloudflare if Cloudflare nameservers are set), create four `A` records for host `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. For `www`, add a `CNAME` to `<YOUR-GITHUB-USERNAME>.github.io` (no repo name).
6. Do not blindly remove unrelated `MX`, `TXT`, `CAA`, or subdomain records: other services may depend on them. Only replace conflicting records after reviewing them.
7. Once GitHub Pages certificate is ready, turn on **Enforce HTTPS**. DNS propagation may take up to 24 hours.

GitHub Pages official: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Before launch — important

- This is a **static site**. The project enquiry form in `index.html` and `contact.html` **copies the enquiry to clipboard** (or opens a mail app if you configure a real company inbox in `assets/js/main.js`). It does not send anything to a server by itself. Connect a verified receiving inbox and secure form endpoint before launch; do not claim forms are submitted without testing.
- Portfolio visual examples are explicitly marked as **illustrative concepts**. Replace with approved real case studies only when evidence is available.
- No exchange listings, partnerships, marketing outcomes or technical audit certifications are guaranteed or claimed.
- Legal/privacy details and contact identity should be finalized before launch.
- The fonts depend on Google Fonts; the CSS includes system fallbacks.
- To preview locally: `python -m http.server 8000` in this directory, then open http://localhost:8000.
