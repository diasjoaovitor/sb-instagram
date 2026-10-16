import { defineConfig } from 'drizzle-kit'

import { databaseFile } from '@/infra/database/file'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/infra/database/schema.ts',
  out: './src/infra/database/migrations',
  dbCredentials: { url: databaseFile }
})
