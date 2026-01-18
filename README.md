# 🍔 MinimalBites – Food Delivery App

A modern and minimal food delivery web application built with **Next.js 15**, **Express.js**, and **Tailwind CSS**.

![MinimalBites](https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800)

---

## 📝 Project Description

**MinimalBites** is a full-stack restaurant and food delivery website where users can browse food items, manage a shopping cart, and where an admin can manage menu items.  
The project focuses on clean UI, smooth user experience, and basic admin functionality.

---

## ✨ Features

- Browse food items (burgers, pizza, drinks, etc.)
- View detailed information for each food item
- Add and remove items from the shopping cart
- Search and filter menu items
- Admin authentication system
- Admin can add new food items

---

## 🧠 Feature Explanation

- **Food Listing:** Displays all available food items from the backend
- **Item Details:** Shows complete details of a selected item using dynamic routing
- **Cart System:** Allows users to add items to the cart and view them on the cart page
- **Search & Filter:** Helps users quickly find food items
- **Admin Login:** Secured login system for admin access
- **Add Item (Admin):** Admin can add new menu items through a protected route

---

## 🚀 Setup & Installation

### Step 1: Install Node.js

1. Visit https://nodejs.org
2. Download the **LTS version**
3. Install and restart your computer

---

### Step 2: Open the Project Folder

**Using Command Prompt (Windows):**
1. Open File Explorer
2. Navigate to the `minimalbites` folder
3. Click the address bar, type `cmd`, and press Enter

**Using VS Code:**
1. Open VS Code
2. File → Open Folder → Select `minimalbites`
3. Terminal → New Terminal

---

### Step 3: Install Dependencies

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


## 🔑 Login Details

To add new items, you need to login:

| Field    | Value                   |
|----------|-------------------------|
| Email    | admin@minimalbites.com  |
| Password | 123456                  |

---

## 📂 Route Summary

| Page          | URL                  | What it does                    |
|---------------|----------------------|---------------------------------|
| Home          | /                    | Landing page with hero section  |
| Menu          | /items               | Browse all food items           |
| Item Details  | /items/1             | View one item's full details    |
| Add Item      | /items/add           | Add new item (login required)   |
| Cart          | /cart                | View items in your cart         |
| Login         | /login               | Login to admin account          |


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



Happy Coding! 🎉
