import { FastifyInstance } from "fastify"
import { db } from "../database/getDatabase"

export default async function sentMessageRoutes(fastify: FastifyInstance) {
  fastify.get('/sent-messages', async () => {
    return await db
      .selectFrom('sent_messages')
      .selectAll()
      .execute()
  })
}