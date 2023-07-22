import getTwitterClient from "./getTwitterClient"
import { db } from "../database/getDatabase"

export async function sendMessages() {
  const client = await getTwitterClient()
  const dms = await client.v2.listDmEvents()
  const dmsToReply: { message_id: string, sender_id: string, command: string }[] = []
  for (const dm of dms.events) {
    if (dm.event_type === "MessageCreate") {
      if (dm.text.startsWith('!'))
        dmsToReply.push({
          message_id: dm.id,
          sender_id: dm.sender_id,
          command: dm.text.substring(1)
        })
    }
  }

  const commands = await db
    .selectFrom('commands')
    .selectAll()
    .execute()

  const alreadySentDms = await db
    .selectFrom('sent_messages')
    .select('messageid')
    .limit(30)
    .execute()

  for (const dm of dmsToReply) {
    if (alreadySentDms.find((val) => val.messageid === parseInt(dm.message_id)))
      continue
    
    const selectedCommand = commands.find((val) => val.name === dm.command)
    if (selectedCommand) {
      client.v2.sendDmToParticipant(dm.sender_id, {
        text: selectedCommand.content
      })
    } else {
      client.v2.sendDmToParticipant(dm.sender_id, {
        text: "Couldn't find command!"
      })
    }

    await db
      .insertInto('sent_messages')
      .values({
        messageid: parseInt(dm.message_id),
        command: dm.command
      })
      .execute()
  }
}