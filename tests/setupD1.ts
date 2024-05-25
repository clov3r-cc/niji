import { applyD1Migrations, env } from 'cloudflare:test';

// This is a global setup file for vitest to run database migrations on background D1.

await applyD1Migrations(env.DB, env.TEST_MIGRATIONS)
