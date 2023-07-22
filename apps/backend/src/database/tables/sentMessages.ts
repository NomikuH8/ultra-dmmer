import { ColumnType, Generated } from "kysely";

export interface SentMessagesTable {
  id: Generated<number>
  messageid: number
  command: string
  created_at: ColumnType<Date, string | undefined, never>
}