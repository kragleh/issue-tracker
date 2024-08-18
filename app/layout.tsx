import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"

const font = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "By https://kragleh.com",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
