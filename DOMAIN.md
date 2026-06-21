# Urban IQ Connect — Domein & DNS

- Domein: urbaniqconnect.com
- Registrar: (aankoop) — DNS beheerd in Cloudflare (reeds ingesteld door Mustafa)
- Canonical: https://urbaniqconnect.com
- Stack-besluit hosting: nog te bevestigen
  - Optie A (V1, statisch): GitHub Pages → Cloudflare CNAME/A-records, SSL Full (Strict)
  - Optie B (later, SSR/Fleet): Railway → Cloudflare CNAME naar *.up.railway.app, proxy ON
- DNS-volgorde (les stack.md): nameservers eerst, dan SSL Full (Strict) NA correct origin cert
