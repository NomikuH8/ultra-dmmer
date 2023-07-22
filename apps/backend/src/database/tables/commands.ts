import { ColumnType, Generated } from "kysely";

export interface CommandsTable {
  id: Generated<number>
  name: string
  content: string
  created_at: ColumnType<Date, string | undefined, never>
}