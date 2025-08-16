import type { Metadata } from "next"
import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Influcraft — Coming Soon",
  description:
    "Crafting the Future of the Creator Economy. We’re building an AI-powered ecosystem of tools designed for creators—helping you connect, create, collaborate, and grow.",
  metadataBase: new URL("https://influcraft.com/"),
  openGraph: {
    title: "Influcraft — Coming Soon",
    description:
      "An AI-powered ecosystem for creators to connect, create, collaborate, and grow.",
    url: "https://influcraft.com/",
    siteName: "Influcraft",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Influcraft — Coming Soon" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Influcraft — Coming Soon",
    description: "AI-powered ecosystem for creators.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
