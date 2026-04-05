# Security operations checklist

## Credential rotation (do immediately if exposed)

1. **Supabase Dashboard** → Authentication → Users → select admin user → reset password to a strong unique password (20+ characters). Enable MFA for the account.
2. **Supabase Dashboard** → Project Settings → API → **Rotate** the `anon` key and `service_role` key. Update:
   - Local: `.env.local` (never commit)
   - Vercel: Production & Preview environment variables → redeploy
3. **Resend Dashboard** → API Keys → rotate `RESEND_API_KEY` and update env everywhere.
4. **Set `app_metadata.role = 'admin'`** for your admin user in Supabase (Authentication → user → Raw JSON) so admin checks cannot be spoofed via `user_metadata`.

## Environment files

- Use **`.env.local`** for secrets locally (gitignored).
- **`.env`** is listed in `.gitignore`; do not commit real keys.
- If `.env` was ever committed, assume keys are compromised and rotate them (see above).

## Supabase RLS

Run the SQL in [`supabase/migration_rls.sql`](supabase/migration_rls.sql) in the Supabase SQL Editor on production, then verify RLS is enabled on each table in the Table Editor.

## Optional hardening

- **`ADMIN_SESSION_SECRET`**: 32+ character random string; signs admin idle/absolute timeout cookies.
- **Cloudflare Turnstile**: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` for public forms; without them, submissions still work in development but you should configure before production.
