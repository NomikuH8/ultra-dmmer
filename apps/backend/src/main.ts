import getServer from './utils/getServer'

async function main() {
  const server = await getServer()

  server.listen({ host: '0.0.0.0', port: 8080 })
  console.log('Server up and listening to port 8080')
}

main()
