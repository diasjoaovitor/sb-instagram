import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const products = sqliteTable(
  'products',
  {
    code: text().notNull(),
    name: text().notNull()
  },
  // A non-integer SQLite primary key accepts NULL unless the column is NOT NULL, and drizzle-kit
  // drops NOT NULL from a column-level text().primaryKey() (https://sqlite.org/lang_createtable.html#the_primary_key)
  (table) => [primaryKey({ columns: [table.code] })]
)
