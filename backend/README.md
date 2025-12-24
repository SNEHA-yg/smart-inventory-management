# Backend

## Seeding an Admin user

This project does not create a default admin automatically. Use the seeding script to create or update an admin account.

### 1) Configure environment

Copy `.env.example` to `.env` and set your values. At minimum, set `MONGO_URI` and `JWT_SECRET`.

If `ADMIN_EMAIL` and/or `ADMIN_PASSWORD` are not set, the seeder will use defaults:
- ADMIN_EMAIL: `admin@example.com`
- ADMIN_PASSWORD: `ChangeMe123!`

```
MONGO_URI=...
JWT_SECRET=...
# Optional: override defaults
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
```

### 2) Run the seeder (from the `backend` folder)

PowerShell (Windows):

```
# Ensure .env is set, then run
npm run seed:admin
```

The script will upsert the admin by `ADMIN_EMAIL` and set role to `ADMIN`.

> Security note: If you used the defaults, change the admin password after first login or rerun the seeder with a new `ADMIN_PASSWORD`.
