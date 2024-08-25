import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Roblox from "./lib/RobloxProvider"
import { Provider } from "next-auth/providers"
import { db } from "./lib/db"

const providers: Provider[] = [
  Roblox({
    clientId: process.env.ROBLOX_CLIENT_ID,
    clientSecret: process.env.ROBLOX_CLIENT_SECRET,
  })
]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers,
  pages: {
    signIn: "/signin",
  }
})

