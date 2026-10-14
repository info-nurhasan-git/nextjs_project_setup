# My Shop - Simple Full Stack E-commerce

Next.js + MongoDB + Tailwind CSS diye bana no ekta shohoj e-commerce app.
(Code gulo beginner der jonno sasro rakhha hoyeche.)

## Features

- Product list (home page)
- Product details page
- Add to cart (cart data browser-e localStorage-e save hoy)
- Cart page (quantity change / remove)
- Checkout form -> order MongoDB-te save hoy
- Admin page: notun product add / delete

## Tech stack

- **Next.js 16** (App Router + API routes) -> ei part-i Node.js backend
- **MongoDB** + **Mongoose** -> database
- **Tailwind CSS 4** -> design

## How to run

### 1. MongoDB chalu korun

Option A - Local MongoDB install kore:
```
mongodb://127.0.0.1:27017/myshop
```

Option B - MongoDB Atlas (free cloud):
1. https://www.mongodb.com/cloud/atlas e account khulun
2. Free cluster banan, connection string copy korun
3. Database user er password set korun

### 2. Environment file

`.env.local` file khulun (already ache) ar nijer connection string din:

```
MONGODB_URI=mongodb://127.0.0.1:27017/myshop
```

Atlas hole:
```
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/myshop
```

### 3. Install o run

```
npm install
npm run dev
```

Browser-e khulun: http://localhost:3000

### 4. Prothom product add korun

- http://localhost:3000/admin e jaan
- Form fill kore "Add Product" click korun
- Ekhon home page-e product dekhabe

## Folder structure

```
src/
  app/
    layout.tsx            # main layout + Navbar + Cart provider
    page.tsx              # home (product list)
    products/[id]/page.tsx# product details
    cart/page.tsx         # cart
    checkout/page.tsx     # checkout + order
    admin/page.tsx        # add/delete product
    api/
      products/route.ts       # GET list, POST create
      products/[id]/route.ts  # GET one, DELETE
      orders/route.ts         # GET list, POST create
  components/             # Navbar, ProductCard, AddToCartButton
  context/CartContext.tsx # cart state (localStorage)
  lib/
    mongodb.ts            # MongoDB connection
    types.ts              # shared types
  models/                 # Mongoose models
    Product.ts
    Order.ts
```

## Commands

```
npm run dev     # development server
npm run build   # production build
npm run lint    # check code
```

## Note (Bangla)

Ei project-e `cacheComponents` off rakha hoyeche jate beginner der bujhte shohoj hoy.
Pages gulo `export const dynamic = "force-dynamic"` use kore, tai prottek request-e
fresh data ashbe.
