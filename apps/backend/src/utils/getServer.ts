import { fastifyAutoload } from "@fastify/autoload"
import { fastifyCors } from "@fastify/cors"
import { fastify } from "fastify"
import { resolve } from "path"

export default async function getServer() {
  const server = fastify({})

  server.register(fastifyCors, {
    origin: '*'
  })

  server.register(fastifyAutoload, {
    dir: resolve(__dirname, '..', 'routes'),
    dirNameRoutePrefix: false
  })

  await server.ready()

  return server
}