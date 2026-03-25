This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Panel

This project now includes a simple admin panel at `/admin` with:

- Contact form inbox review
- Project create, update, and delete
- Blog post create, update, and delete
- Email OTP login for admin access

### Required environment variables

Add these to your `.env` file:

```env
DATABASE_URL="postgresql://..."
ADMIN_EMAIL="you@example.com"
ADMIN_SECRET_KEY="long-random-secret-for-api-fallback"

SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="smtp-user"
SMTP_PASS="smtp-password"
SMTP_FROM="Portfolio Admin <no-reply@example.com>"
```

Notes:

- `ADMIN_EMAIL` is the only email allowed to request an OTP.
- `ADMIN_SECRET_KEY` is still supported as a bearer token for admin API access.
- In development, if SMTP settings are missing, OTP codes are logged to the server console instead of being emailed.

### Database setup

After pulling the latest changes, run:

```bash
npm run db:generate
npm run db:migrate
```

This creates the blog and admin auth tables used by the dashboard.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
