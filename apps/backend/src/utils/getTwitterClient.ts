import { readFileSync } from "fs";
import { resolve } from "path";
import { TwitterApi } from "twitter-api-v2";

export default async function getTwitterClient() {
  const authPath = resolve(__dirname, '..', '..', 'auth.json')

  const infos = JSON.parse(readFileSync(authPath).toString('utf-8'))
  const client = new TwitterApi(infos.accessToken)

  return client
}