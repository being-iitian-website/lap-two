# Quick Deployment Checklist

Use this checklist before deploying to Vercel.

## Pre-Deployment

- [ ] Code is committed to Git repository
- [ ] All tests pass locally (`npm run build`)
- [ ] Environment variables are documented
- [ ] Database is set up and accessible

## Vercel Configuration

- [ ] `vercel.json` is configured correctly
- [ ] `api/index.ts` exports default handler
- [ ] `package.json` has `postinstall` script
- [ ] Prisma schema is up to date

## Environment Variables (Set in Vercel Dashboard)

- [ ] `DATABASE_URL` - PostgreSQL connection string with SSL
- [ ] `JWT_SECRET` - Strong random secret key
- [ ] Variables set for Production, Preview, and Development

## Database Setup

- [ ] Database is created and accessible
- [ ] Connection string is correct
- [ ] SSL is enabled (`?sslmode=require`)
- [ ] Migrations are ready to run

## Deployment

- [ ] Project imported to Vercel
- [ ] Environment variables added
- [ ] Build command configured: `prisma generate`
- [ ] Deployed successfully

## Post-Deployment

- [ ] Health check works: `GET /`
- [ ] Database migrations run: `npx prisma migrate deploy`
- [ ] Authentication endpoints work
- [ ] API endpoints are accessible
- [ ] CORS configured for frontend
- [ ] Error handling works correctly

## Verification Tests

- [ ] `GET /` returns `{"message":"Server is running"}`
- [ ] `POST /api/auth/register` creates user
- [ ] `POST /api/auth/login` returns token
- [ ] Protected routes require authentication
- [ ] Database queries work correctly

## Troubleshooting

If deployment fails:
1. Check Vercel build logs
2. Verify environment variables
3. Test database connection
4. Run `npm run build` locally
5. Check Prisma client generation

---

**Quick Deploy Command:**
```bash
vercel --prod
```

**Run Migrations:**
```bash
npx prisma migrate deploy
```

