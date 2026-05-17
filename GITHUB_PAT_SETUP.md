# 🔐 GitHub Personal Access Token Setup

## Step 1: Create Token on GitHub

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Fill in:
   - **Note:** `DSA Dashboard Push`
   - **Expiration:** `90 days`
   - **Scopes:** Check `repo` only
4. Click **Generate token**
5. **Copy the token** (save it somewhere!)

## Step 2: Push Code

Run in Terminal:

```bash
cd /Users/naveed/Downloads/DSA_STATUS
git push -u origin main
```

When prompted:
- **Username:** `Naveed945`
- **Password:** Paste your token (not your GitHub password!)

---

## ✅ That's It!

Your code will upload to GitHub in seconds! 🚀

