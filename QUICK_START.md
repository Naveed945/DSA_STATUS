# ⚡ Quick Setup Commands

## Copy & Paste These Commands

### 1️⃣ Initialize & Commit (Run in Terminal)

```bash
cd /Users/naveed/Downloads/DSA_STATUS
git init
git branch -M main
git add .
git commit -m "initial: DSA progress dashboard with GitHub Actions sync"
```

### 2️⃣ Add Remote & Push

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME`:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## Web Setup (GitHub)

### 3️⃣ Add GitHub Secrets

Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/settings/secrets/actions`

Create **2 secrets:**

1. **NOTION_TOKEN**
   - Value: `secret_xxxxxxxxxxxxx` (from notion.so/my-integrations)

2. **PAGE_ID**
   - Value: `363bc09fccb2812aab8ac19b355f59fa`

### 4️⃣ Enable GitHub Pages

Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/settings/pages`

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/ (root)**
- Click **Save**

### 5️⃣ Enable GitHub Actions

Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions`

- Find "Sync Notion Data" workflow
- Click **Enable workflow** (if disabled)

---

## 🎉 Done!

Your dashboard will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Data will update every 10 minutes automatically! ✅

---

## If You Don't Have a GitHub Repo Yet

1. Go to https://github.com/new
2. Create new repo with name (e.g., `dsa-dashboard`)
3. **Do NOT initialize with README** (keep empty)
4. Click **Create repository**
5. Then run the commands above

---

## Optional: Cleanup Old Files

These were used for Vercel and are no longer needed:

```bash
rm vercel.json
rm notion.js
```

(Keep them if you want to reference how the old system worked)

