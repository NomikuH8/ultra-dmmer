import { Insertable, Updateable } from 'kysely'
import { db } from '../database/getDatabase'
import { FastifyInstance } from 'fastify'
import { CommandsTable } from '../database/tables/commands'

export default async function commandsRoutes(fastify: FastifyInstance) {
  fastify.get('/commands', async () => {
    return await db
      .selectFrom('commands')
      .selectAll()
      .execute()
  })

  fastify.post('/commands', async (req) => {
    const body = req.body as Insertable<CommandsTable>
    return await db
      .insertInto('commands')
      .values(body)
      .returningAll()
      .execute()
  })

  fastify.put('/commands/:id', async (req) => {
    const body = req.body as Updateable<CommandsTable>
    const { id } = req.params as { id: number }
    await db
      .updateTable('commands')
      .set(body)
      .where('id', '=', id)
      .execute()
    return { success: true }
  })

  fastify.delete('/commands/:id', async (req) => {
    const { id } = req.params as { id: number }
    await db
      .deleteFrom('commands')
      .where('id', '=', id)
      .execute()
    return { success: true }
  })
}
