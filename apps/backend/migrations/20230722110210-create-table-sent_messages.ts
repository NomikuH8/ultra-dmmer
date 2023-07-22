import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('sent_messages')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('messageid', 'integer', (col) => col.notNull().unique())
    .addColumn('command', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .dropTable('sent_messages')
    .execute()
}