import { CommandsTable } from './tables/commands'
import { Kysely, SqliteDialect } from 'kysely'
import SQLite from 'better-sqlite3'
import { resolve } from 'path'

export interface Database {
  commands: CommandsTable
}


export const db = new Kysely<Database>({
  dialect: new SqliteDialect({
    database: new SQLite(resolve(__dirname, '..', '..', 'database.db'))
  })
})
