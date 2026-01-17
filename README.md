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

Then type:

```bash
cd server
npm init -y
npm install express cors
cd ..
```

### Step 4: Run the Project

You need to run **TWO** things at the same time.

**Option A: Use Two Terminals**

Terminal 1 (Backend Server):
```bash
npm run server
```
You should see: "🍔 MinimalBites API Server Running!"

Terminal 2 (Frontend Website):
```bash
npm run dev
```
You should see: "Ready in X seconds"

**Option B: Use One Command (Easier!)**

```bash
npm run dev:all
```

### Step 5: Open the Website

1. Open your browser (Chrome, Firefox, Edge)
2. Go to: **http://localhost:3000**
3. Enjoy! 🎉

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

## ✨ Features

### ✅ Done Features:
- [x] Beautiful landing page with 7 sections
- [x] Navigation bar with cart count
- [x] Menu page with search & filter
- [x] Item details page
- [x] Shopping cart with add/remove
- [x] Admin login system
- [x] Protected "Add Item" page
- [x] Toast notifications
- [x] Mobile responsive design
- [x] Express.js API backend
- [x] JSON database

### 🔐 Authentication:
- Mock login with cookies
- Protected routes using middleware
- Auto-redirect for logged-in users

### 🛒 Cart:
- Add items to cart
- Update quantity
- Remove items
- Promo codes: SAVE10, SAVE20
- Free delivery over $30

---

## 🛠 Technologies Used

| Technology  | What it does           |
|-------------|------------------------|
| Next.js 14  | Frontend framework     |
| React 18    | UI library             |
| TypeScript  | Type-safe JavaScript   |
| Tailwind CSS| Styling                |
| Express.js  | Backend server         |
| Lucide Icons| Beautiful icons        |
| Sonner      | Toast notifications    |

---

## 📁 Folder Structure

```
minimalbites/
├── app/                    # Pages
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
├── server/               # Backend
│   ├── index.js          # Server code
│   └── data/db.json      # Database
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

### Problem: "Cannot fetch items"
**Solution:** Make sure the server is running:
```bash
npm run server
```

### Problem: White/blank page
**Solution:** Check browser console (F12) for errors

---

## 👨‍💻 Made By

This project was created as an assignment for learning Next.js and Express.js.

---

## 📞 Need Help?

If something doesn't work:
1. Check if both servers are running
2. Make sure you typed the commands correctly
3. Try closing everything and starting again
4. Ask your teacher or friend for help!

---

Happy Coding! 🎉
