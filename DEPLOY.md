# Deployment — GitHub Pages + Infomaniak domain

This is a pure static site. It deploys for free on GitHub Pages; the only cost is the domain name (~CHF 10–15/year from Infomaniak).

---

## 1. Create the GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repository exactly **`cathalharte.github.io`** (replacing `cathalharte` with your GitHub username)
3. Set it to **Public** — GitHub Pages requires public repos on the free plan
4. Do not initialise with a README (you already have one)

---

## 2. Push the site

In the project directory:

```bash
git remote add origin https://github.com/cathalharte/cathalharte.github.io.git
git push -u origin master
```

---

## 3. Enable GitHub Pages

1. Go to the repository on GitHub → **Settings** → **Pages**
2. Under **Branch**, select `master` and `/ (root)`, click Save
3. GitHub builds and deploys in ~30 seconds
4. Site is live at `https://cathalharte.github.io`

---

## 4. Buy a domain (optional, ~CHF 10–15/year)

Good options:

| Domain | Notes |
|---|---|
| `cathalharte.ch` | Swiss ccTLD, clean |
| `cathalharte.com` | Internationally readable |
| `cathal.dev` | `.dev` forces HTTPS, developer connotation |

Buy at [infomaniak.com/en/domains](https://www.infomaniak.com/en/domains).

---

## 5. Point the domain at GitHub Pages

In **Infomaniak DNS** (Domains → your domain → DNS zone), add:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  cathalharte.github.io.
```

Then in the GitHub repository → **Settings** → **Pages** → **Custom domain**, enter `cathalharte.ch` and save. GitHub provisions an HTTPS certificate automatically (takes a few minutes).

Allow up to 24h for DNS to propagate globally (usually under 2h).

---

## 6. Deploy updates

```bash
git add <changed files>
git commit -m "describe change"
git push
```

GitHub Pages redeploys automatically on every push to `master`. Live within ~30 seconds.

---

## Cost summary

| Item | Cost |
|---|---|
| GitHub Pages hosting | Free |
| Domain (e.g. `cathalharte.ch`) | ~CHF 10–15/year |
| SSL certificate | Free (GitHub handles it) |
| **Total** | **~CHF 10–15/year** |
