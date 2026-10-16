import path from 'node:path'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { database } from '@/infra/database/client'

const migrationsFolder = path.join(
  process.cwd(),
  'src/infra/database/migrations'
)

export const runMigrations = () => migrate(database, { migrationsFolder })
