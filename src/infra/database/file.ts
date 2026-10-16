import path from 'node:path'

import { dataDirectory } from '@/infra/data-directory'

export const databaseFile = path.join(dataDirectory, 'database.sqlite')
