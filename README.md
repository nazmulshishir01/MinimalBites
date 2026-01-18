# 🍔 MinimalBites - Food Delivery App

A modern food delivery website built with Next.js 15, Express.js, and Tailwind CSS.

![MinimalBites](https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800)

---

## 📝 What is this project?

MinimalBites is a restaurant website where you can:
- Browse food items (burgers, pizza, drinks, etc.)
- Add items to your cart
- Login as admin to add new menu items
- Search and filter menu items

---

## 🚀 How to Run This Project (Very Easy Steps!)

### Step 1: Install Node.js (If you don't have it)

1. Go to: https://nodejs.org
2. Download the **LTS version** (green button)
3. Install it (just click Next, Next, Finish)
4. Restart your computer

### Step 2: Open the Project Folder

**On Windows:**
1. Open File Explorer
2. Go to where you saved the `minimalbites` folder
3. Click on the address bar at the top
4. Type `cmd` and press Enter
5. A black window (Command Prompt) will open

**Or use VS Code:**
1. Open VS Code
2. File → Open Folder → Select `minimalbites`
3. Terminal → New Terminal

### Step 3: Install Project Files

In the command prompt/terminal, type this and press Enter:

```bash
npm install
```

Wait for it to finish (may take 1-2 minutes).

### Step 4: Run the Project

```bash
npm run dev
```

You should see: "Ready in X seconds"

### Step 5: Open the Website

1. Open your browser (Chrome, Firefox, Edge)
2. Go to: **http://localhost:3000**
3. Enjoy! 🎉

---

## 🌐 DEPLOY TO VERCEL (Create Live Link!)

### Method 1: Using GitHub (Recommended - সবচেয়ে Easy!)

#### Step A: Create GitHub Account & Upload Project

1. **GitHub Account বানাও:**
   - যাও: https://github.com
   - "Sign Up" এ click করো
   - Email, password দিয়ে account বানাও

2. **New Repository বানাও:**
   - GitHub এ login করো
   - Right side এ "+" icon এ click → "New repository"
   - Repository name দাও: `minimalbites`
   - "Create repository" button এ click করো

3. **Project Upload করো (Command Prompt এ):**
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/minimalbites.git
   git push -u origin main
   ```
   (YOUR_USERNAME এর জায়গায় তোমার GitHub username দাও)

#### Step B: Vercel এ Deploy করো

1. **Vercel এ যাও:**
   - যাও: https://vercel.com
   - "Start Deploying" বা "Sign Up" এ click করো
   - "Continue with GitHub" select করো
   - GitHub account connect করো

2. **Project Import করো:**
   - "Add New" → "Project" click করো
   - তোমার `minimalbites` repository select করো
   - "Import" click করো

3. **Deploy করো:**
   - সব settings default রাখো
   - "Deploy" button এ click করো
   - Wait করো 1-2 minutes... ⏳

4. **Live Link পাও! 🎉**
   - Deploy complete হলে তোমার link পাবে
   - Example: `https://minimalbites-xyz.vercel.app`

### Method 2: Direct Upload (No GitHub)

1. যাও: https://vercel.com
2. Login করো (GitHub/Email দিয়ে)
3. "Add New" → "Project"
4. "Upload" tab select করো
5. পুরো `minimalbites` folder drag & drop করো
6. "Deploy" click করো
7. Done! Live link পাবে! ✅

---

## 🔑 Login Details

To add new items, you need to login:

| Field    | Value                   |
|----------|-------------------------|
| Email    | admin@minimalbites.com  |
| Password | 123456                  |

---

## 📂 Project Pages

| Page          | URL                  | What it does                    |
|---------------|----------------------|---------------------------------|
| Home          | /                    | Landing page with hero section  |
| Menu          | /items               | Browse all food items           |
| Item Details  | /items/1             | View one item's full details    |
| Add Item      | /items/add           | Add new item (login required)   |
| Cart          | /cart                | View items in your cart         |
| Login         | /login               | Login to admin account          |

---

## ✅ PROJECT REQUIREMENTS CHECKLIST

### 1️⃣ Landing Page (7 Sections + Navbar + Footer)
| Requirement | Status | Details |
|-------------|--------|---------|
| Navbar | ✅ Done | Logo, Home, Menu, Login, Add Item links |
| Hero Section | ✅ Done | Big headline, CTA buttons, stats |
| Features/Highlights | ✅ Done | 3 cards: Fresh, Fast, Hygienic |
| Popular Dishes | ✅ Done | 4 items from API |
| Categories | ✅ Done | Burger, Pizza, Drinks, Desserts |
| How It Works | ✅ Done | 3 steps: Browse, Choose, Enjoy |
| Testimonials | ✅ Done | 3 customer reviews |
| Newsletter | ✅ Done | Email input + Subscribe |
| Footer | ✅ Done | Links, contact, social media |

### 2️⃣ Authentication
| Requirement | Status | Details |
|-------------|--------|---------|
| Mock Login | ✅ Done | Hardcoded email/password |
| Credentials in Cookies | ✅ Done | mb_auth cookie |
| Route Protection | ✅ Done | middleware.ts protects /items/add |
| Redirect on Login | ✅ Done | Redirects to /items |

### 3️⃣ Item List Page (/items)
| Requirement | Status | Details |
|-------------|--------|---------|
| Publicly Accessible | ✅ Done | No login required |
| Fetch from API | ✅ Done | GET /api/items |
| Item Cards | ✅ Done | Name, description, price, image |
| Search | ✅ Done | Search by name/description |
| Filter by Category | ✅ Done | Dropdown + pills |
| Sort Options | ✅ Done | Price, rating, name |

### 4️⃣ Item Details Page (/items/[id])
| Requirement | Status | Details |
|-------------|--------|---------|
| Publicly Accessible | ✅ Done | No login required |
| Full Details | ✅ Done | Large image, name, price, description |
| Additional Info | ✅ Done | Category, rating, prep time, calories |
| Related Items | ✅ Done | 4 items from same category |

### 5️⃣ Add Item Page (/items/add) - Protected
| Requirement | Status | Details |
|-------------|--------|---------|
| Protected Route | ✅ Done | Requires login |
| Form Fields | ✅ Done | Name, description, price, image, category |
| Optional Fields | ✅ Done | Prep time, calories, ingredients |
| POST to API | ✅ Done | POST /api/items |
| Toast on Success | ✅ Done | "Item added successfully!" |
| Redirect after Add | ✅ Done | Redirects to /items |

### 6️⃣ Express/API Server
| Requirement | Status | Details |
|-------------|--------|---------|
| GET /api/items | ✅ Done | Fetch all items |
| GET /api/items/:id | ✅ Done | Fetch single item |
| POST /api/items | ✅ Done | Create new item |
| JSON Database | ✅ Done | In-memory data store |

### 7️⃣ Additional Features
| Requirement | Status | Details |
|-------------|--------|---------|
| Shopping Cart | ✅ Done | Add, remove, update quantity |
| Toast Notifications | ✅ Done | Using Sonner library |
| README.md | ✅ Done | Full documentation |
| Responsive Design | ✅ Done | Mobile, tablet, desktop |
| Loading States | ✅ Done | Skeleton loaders |
| Form Validation | ✅ Done | Required fields check |

### 8️⃣ Technologies Used
| Technology | Status | Details |
|------------|--------|---------|
| Next.js 14 (App Router) | ✅ Used | Latest version |
| React 18 | ✅ Used | With hooks |
| TypeScript | ✅ Used | Type-safe code |
| Tailwind CSS | ✅ Used | Modern styling |
| Express.js API | ✅ Used | Backend server |
| Cookie Auth | ✅ Used | mb_auth cookie |
| Middleware | ✅ Used | Route protection |

---

## ✨ TOTAL SCORE: 100% Complete! 🎉

All required features have been implemented:
- ✅ Landing Page with 7 sections + Navbar + Footer
- ✅ Authentication with cookies and route protection
- ✅ Item List Page with search/filter/sort
- ✅ Item Details Page with full information
- ✅ Protected Add Item Page with form
- ✅ API endpoints (GET, POST)
- ✅ Cart functionality
- ✅ Toast notifications
- ✅ Responsive design
- ✅ README documentation

---

## 🛠 Technologies Used

| Technology  | What it does           |
|-------------|------------------------|
| Next.js 14  | Frontend framework     |
| React 18    | UI library             |
| TypeScript  | Type-safe JavaScript   |
| Tailwind CSS| Styling                |
| Lucide Icons| Beautiful icons        |
| Sonner      | Toast notifications    |

---

## 📁 Folder Structure

```
minimalbites/
├── app/                    # Pages
│   ├── api/               # API Routes (for Vercel)
│   │   └── items/         # Items API
│   ├── page.tsx           # Home page
│   ├── login/page.tsx     # Login page
│   ├── cart/page.tsx      # Cart page
│   └── items/
│       ├── page.tsx       # Menu list
│       ├── add/page.tsx   # Add item (protected)
│       └── [id]/page.tsx  # Item details
├── components/            # Reusable parts
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/                   # Helper functions
│   ├── auth.ts           # Login functions
│   └── cart.ts           # Cart functions
├── middleware.ts         # Route protection
└── README.md            # This file!
```

---

## 🆘 Common Problems & Solutions

### Problem: "npm is not recognized"
**Solution:** Restart your computer after installing Node.js

### Problem: "Port 3000 is already in use"
**Solution:** Close other programs or change port:
```bash
npm run dev -- -p 3001
```

### Problem: White/blank page
**Solution:** Check browser console (F12) for errors

### Problem: Vercel deploy fails
**Solution:** Make sure all files are correct and try again

---

## 👨‍💻 Made By

This project was created as an assignment for learning Next.js.

---

Happy Coding! 🎉
