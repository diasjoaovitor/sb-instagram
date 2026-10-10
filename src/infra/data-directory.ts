import path from 'node:path'

export const dataDirectory = path.resolve(process.env.DATA_DIR ?? 'data')
