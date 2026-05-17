# 🔐 Create New GitHub Token with Workflow Scope

Your current token is missing the `workflow` scope needed for GitHub Actions.

## ⚡ Quick Fix (2 minutes)

### Step 1: Create New Token

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Fill in:
   - **Note:** `DSA Dashboard Full Access`
   - **Expiration:** `90 days`
   - **Scopes:** Check BOTH:
     - ✅ `repo` (full control)
     - ✅ `workflow` (update GitHub Action workflows)
4. Click **Generate token**
5. **Copy the token** immediately and save it

### Step 2: Update Git Credentials

On Mac, your old credentials are stored in Keychain. Remove them:

1. Open **Keychain Access** (search in Spotlight)
2. Search for `github.com`
3. Delete the old entry
4. Close Keychain

### Step 3: Push Again

Run in Terminal:
```bash
cd /Users/naveed/Downloads/DSA_STATUS
git push -u origin main --force
```

When prompted:
- **Username:** `Naveed945`
- **Password:** Paste your NEW token (with workflow scope)

---

## ✅ Done!

Your code will now push successfully! 🚀

