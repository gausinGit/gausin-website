# Gausin Backend API

Express.js + MongoDB Atlas backend for Gausin International Engineers website.

## Setup (Step by Step)

### Step 1 — MongoDB Atlas
1. Go to https://cloud.mongodb.com → Create a free cluster
2. Create a database user (username + password)
3. Whitelist your IP (or 0.0.0.0/0 for all IPs)
4. Get connection string: Connect → Drivers → Node.js
5. Copy the URI into your `.env`

### Step 2 — Gmail App Password (for email sending)
1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Search "App Passwords" → Generate one for "Mail"
4. Copy the 16-char password into `.env` as `SMTP_PASS`

### Step 3 — Create .env
```bash
cp .env.example .env
# Fill in all values
```

### Step 4 — Generate Admin Password Hash
```bash
cd backend
node generate-password-hash.js
# Enter your desired admin password
# Copy the hash into .env as ADMIN_PASSWORD_HASH
```

### Step 5 — Run the server
```bash
# Development (auto-restart on changes)
npm install -g nodemon
npm run dev

# Production
npm start
```

Server starts on http://localhost:5000

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/contact | Contact page form |
| POST | /api/inquiry | Product sidebar quote form |
| POST | /api/career | Career application (multipart/form-data) |
| POST | /api/admin/login | Admin login → returns JWT |
| GET | /api/admin/inquiries | List all inquiries (auth required) |
| PATCH | /api/admin/inquiries/:id | Update inquiry status |
| GET | /api/admin/applications | List all applications (auth required) |
| PATCH | /api/admin/applications/:id | Update application status |
| GET | /api/admin/stats | Dashboard stats (auth required) |
| GET | /api/health | Health check |

## Admin Panel
Open `admin/index.html` in browser → login → see all inquiries & applications.

## Deployment

### Backend → Render (Free)
1. GitHub pe sirf `backend/` folder ka repo banao (ya full project push karo)
2. [render.com](https://render.com) → Login → **New → Web Service**
3. GitHub repo connect karo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Region:** Singapore (India ke paas)
5. **Environment Variables** tab mein saari `.env` values ek ek karke add karo
6. **Create Web Service** → Deploy hoga (~2-3 min)
7. URL milega: `https://gausin-backend.onrender.com`

> ⚠️ Render Free tier mein server 15 min inactivity ke baad **sleep** ho jata hai.
> Pehli request pe ~30 sec cold start hota hai. Production ke liye paid plan lo.

### Frontend → Netlify (Free)
1. [netlify.com](https://netlify.com) → Login
2. **Sites → Add new site → Deploy manually**
3. `d:\Gausin Data` folder **drag & drop** karo (pura frontend folder)
4. Deploy hoga — URL milega: `https://gausin-xyz.netlify.app`
5. Custom domain: Site settings → Domain management → `gausin.in` add karo

### After Both Are Deployed:

**Step 1** — `js/config.js` mein Render URL update karo:
```js
window.GAUSIN_API_URL = 'https://gausin-backend.onrender.com';
```

**Step 2** — Backend `.env` mein CORS update karo (Render dashboard mein):
```
ALLOWED_ORIGINS=https://gausin-xyz.netlify.app,https://www.gausin.in,https://gausin.in
```

**Step 3** — Netlify pe redeploy karo (config.js change ke baad)
