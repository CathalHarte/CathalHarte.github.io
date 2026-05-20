# Deployment — Infomaniak

This is a pure static site (7 files, no server-side logic). Any web host will work. The steps below are for Infomaniak's CHF 10/month Web Hosting plan.

---

## 1. Choose a domain name

Infomaniak sells domains separately from hosting. Some options:

| Domain | Notes |
|---|---|
| `cathalharte.com` | Clean, internationally readable |
| `cathalharte.ie` | Irish ccTLD — registrar varies, may need to use a separate Irish registrar |
| `cathal.dev` | `.dev` is Google-run, HTTPS-enforced, developer connotation |
| `cathalharte.eu` | Available via Infomaniak, EU-anchored |

Recommendation: **`cathalharte.com`** — unambiguous, easy to spell aloud, no country assumption. Check availability at infomaniak.com/en/domains.

---

## 2. Purchase hosting

Go to [infomaniak.com](https://www.infomaniak.com) → Web Hosting → **Web & Mail** or **Site** plan at CHF 10/month.

The cheapest plan is more than sufficient. This site is ~7 HTML/JS/CSS files totalling well under 1 MB. You will never approach storage or bandwidth limits.

What you get that matters:
- SFTP/FTP access to upload files
- Automatic SSL certificate (Let's Encrypt) — HTTPS at no extra cost
- Custom domain pointing
- Webmail (if you want a `@cathalharte.com` email address)

---

## 3. Point your domain to Infomaniak

If you registered the domain with Infomaniak: it links automatically during checkout.

If you registered elsewhere (e.g. a `.ie` domain at IE Domain Registry):
1. Log into your registrar
2. Find DNS / Nameserver settings
3. Replace existing nameservers with Infomaniak's:
   ```
   ns1.infomaniak.com
   ns2.infomaniak.com
   ```
4. Allow up to 24h for propagation (usually under 2h)

---

## 4. Upload the site files

In your Infomaniak control panel (Manager):

1. Go to **Web hosting** → your site → **File manager**, or connect via SFTP:
   - Host: `ftp.infomaniak.com` (check Manager for your exact hostname)
   - Username / password: your Infomaniak credentials or the FTP sub-user they create
   - Port: 22 (SFTP) or 21 (FTP)

2. Navigate to the `web/` or `public_html/` directory (Infomaniak uses `web/`)

3. Upload these files — nothing else:
   ```
   index.html
   content.js
   style.css
   scroll.js
   neurotech.html
   nuclear.html
   thoughts.html
   ```

4. Do **not** upload: `.claude/`, `README.md`, `STYLE.md`, `SOURCES.md`, `DEPLOY.md`, `.git/`

---

## 5. Enable HTTPS

In the Infomaniak Manager:
1. Go to your hosting → **SSL certificates**
2. If not already active, click **Install a free Let's Encrypt certificate**
3. It provisions in minutes and auto-renews

Once live, test at `https://cathalharte.com` and `https://www.cathalharte.com`.

---

## 6. Optional: redirect www → non-www

Create a file named `.htaccess` in the `web/` root:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^ https://%1%{REQUEST_URI} [R=301,L]
```

This ensures `www.cathalharte.com` redirects cleanly to `cathalharte.com`.

---

## 7. Deploy updates

No pipeline needed. When content changes:

1. Edit `content.js` (or any file)
2. Upload the changed file via SFTP or the File Manager, overwriting the old version
3. Hard-refresh the browser (`Ctrl+Shift+R`) to bust local cache

For a more polished workflow later: Infomaniak supports Git-based deployment on higher-tier plans, and the site could also be moved to a CDN-backed static host (Cloudflare Pages, etc.) at zero cost if desired.

---

## Cost summary

| Item | Cost |
|---|---|
| Web Hosting plan | CHF 10/month (billed annually ≈ CHF 120/year) |
| Domain `.com` | ~CHF 10–15/year |
| SSL certificate | Free (Let's Encrypt, included) |
| **Total** | **~CHF 130–135/year** |
