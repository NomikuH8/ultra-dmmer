import { SimpleIntervalJob, Task, ToadScheduler } from 'toad-scheduler'
import { sendMessages } from './utils/sendMessages'
import { existsSync, readFileSync } from 'fs'
import getServer from './utils/getServer'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config()

async function main() {
  const server = await getServer()

  const authPath = resolve(__dirname, '..', 'auth.json')
  if (existsSync(authPath)) {
    const authJson = JSON.parse(readFileSync(authPath).toString('utf-8'))
    if (authJson.accessToken)
      startToad()
  }

  server.listen({ host: '0.0.0.0', port: 8080 })
  console.log('Server up and listening to port 8080')
}

function startToad() {
  const scheduler = new ToadScheduler()

  const task = new Task('send messages', () => {
    sendMessages()
  })
  const job = new SimpleIntervalJob({ minutes: 1 }, task)
  scheduler.addSimpleIntervalJob(job)
}

main()
