# KramLill — Handmade Nature Jewellery Website

A full-stack small business shop built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and SQLite.

---

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** + **SQLite** (local dev)
- **Server Actions** for product CRUD

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and edit it:

```bash
cp .env.example .env.local
```

Open `.env.local` and set your admin password:

```env
ADMIN_PASSWORD=your-secure-password-here
DATABASE_URL="file:./dev.db"
```

### 3. Create the database

```bash
npm run db:push
```

### 4. Seed example products

```bash
npm run db:seed
# or equivalently:
npx prisma db seed
```

This creates 5 example products. You can delete them from the admin later.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Pages

| URL | Description |
|-----|-------------|
| `/` | Landing page |
| `/products` | Public products page |
| `/admin` | Admin dashboard (password protected) |

---

## Admin Dashboard (`/admin`)

Visit `/admin` and enter the password you set in `ADMIN_PASSWORD`.

From the admin you can:
- Add, edit, and delete products
- Upload product images (saved to `/public/uploads/`)
- Set price, description, category, sort order
- Mark products as available/unavailable

> **Image uploads**: Local uploads are saved to `/public/uploads/`. For production,
> replace the `/api/upload` route with Cloudinary, Supabase Storage, or S3.

---

## Customising the Landing Page

Open `app/page.tsx` and edit the `BUSINESS` object at the top:

```ts
const BUSINESS = {
  name: "Your Business Name",   // ← change this
  tagline: "...",               // ← change this
  description: "...",           // ← change this
  instagram: "https://instagram.com/yourbusiness",
  phone: "+372 5555 5555",
  email: "hello@yourbusiness.com",
};
```

Look for `✏️ EDIT` comments throughout the file for other places to customise.

---

## Managing Products

All product data lives in the SQLite database, managed through `/admin`.

To change what fields a product has, edit `prisma/schema.prisma` and run:

```bash
npm run db:push
```

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run db:push` | Apply schema to database |
| `npm run db:seed` | Seed example products |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |

---

## Production Notes

- Change `ADMIN_PASSWORD` to something strong before deploying.
- Replace the local image upload with a cloud storage provider.
- For SQLite → PostgreSQL migration, update `DATABASE_URL` and change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma`.
