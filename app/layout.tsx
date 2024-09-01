import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import SignOutButton from "@/components/ui/SignOutButton"

const font = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "By https://kragleh.com",
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const session = await auth()
  const user = session?.user

  if (user) {
    const userObj = await db.user.findUnique({ where: { id: user.id } })

    if (userObj && userObj.banned) {
      return (
        <html lang="en" suppressHydrationWarning>
          <body className={ font.className}>
            <ThemeProvider attribute="class">
              <h1>Account Suspended</h1>
              <SignOutButton />
            </ThemeProvider>
          </body>
        </html>
      )
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={ font.className}>
        <ThemeProvider attribute="class">
          { children }
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
