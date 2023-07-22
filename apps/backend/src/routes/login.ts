import { FastifyInstance } from "fastify"
import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
import { TwitterApi } from "twitter-api-v2"

export default async function loginRoutes(fastify: FastifyInstance) {
  fastify.get("/login", async () => {
    const client = new TwitterApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    })

    const authLink = client.generateOAuth2AuthLink("http://localhost:8080/callback", {
      scope: ['dm.read', 'dm.write', 'users.read']
    })

    writeFileSync(
      resolve(__dirname, "..", "..", "auth.json"),
      JSON.stringify({
        state: authLink.state,
        codeVerifier: authLink.codeVerifier,
        accessToken: "",
        refreshToken: "",
      })
    )

    return {
      url: authLink.url,
    }
  })

  fastify.get("/callback", async (req) => {
    const authPath = resolve(__dirname, "..", "..", "auth.json")
    const { state, code } = req.query as { state: string, code: string }
    const json = JSON.parse(readFileSync(authPath).toString('utf-8'))

    const client = new TwitterApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    })

    const infos = await client.loginWithOAuth2({ code, codeVerifier: json.codeVerifier, redirectUri: 'http://localhost:8080/callback'})
    writeFileSync(authPath, JSON.stringify({
      oauth_token: "",
      oauth_token_secret: "",
      accessToken: infos.accessToken,
      refreshToken: infos.refreshToken
    }))

    return {
      message: 'You can close this tab, and, please, restart the app'
    }
  })
}
