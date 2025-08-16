"use client"

import {  useMemo, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import confetti from "canvas-confetti"
import { db } from "@/lib/firebase"
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {  Rocket, Bell} from "lucide-react"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
 // const [isVisible, setIsVisible] = useState(false)
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle")

//  useEffect(() => {
//     setIsVisible(true)
//   }, [])

  const isValidEmail = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }, [email])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isValidEmail) return

    try {
      setStatus("submitting")

      // Check for duplicates
      const q = query(collection(db, "waitlist"), where("email", "==", email))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        toast.warning("You're already on the waitlist ✨")
        setStatus("idle")
        return
      }

      // Add email
      await addDoc(collection(db, "waitlist"), { email, createdAt: new Date() })
      setStatus("success")
      setEmail("")

      // 🎉 Fire confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      })

      toast.success("Thanks! You're on the waitlist 🚀")
    } catch {
      setStatus("error")
      toast.error("Something went wrong. Please try again.")
    }
  }

  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(37,99,235,0.25),transparent_70%)]" />
      </motion.div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-blue-400 tracking-tight">influcraft</span>
            </motion.div>
          </div>
        </header>

        {/* Hero */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-blue-500">influcraft</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-white">
              Crafting the Future of the Creator Economy
            </p>
            <p className="text-lg md:text-xl text-gray-300/90 leading-relaxed">
              We’re building an AI-powered ecosystem of tools designed for creators—helping you connect, create,
              collaborate, and grow.
            </p>
          </motion.div>
        </section>

        {/* Signup */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-blue-400 mr-2" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-white">Be the First to Know</h2>
            </div>
            <p className="text-lg text-gray-300 mb-8">
              Join our waitlist to get early access and behind-the-scenes updates.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" noValidate>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-900/70 border-gray-800 text-white placeholder-gray-500 focus-visible:ring-2 focus-visible:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-8 transition-all duration-300 shadow-lg"
                disabled={!isValidEmail || status === "submitting"}
              >
                {status === "submitting" ? "Submitting..." : "Notify Me"}
              </Button>
            </form>
            <p className="mt-3 text-sm text-gray-400">
              We respect your privacy.
            </p>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800/60 py-10 px-4 bg-gray-950">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold text-blue-400">influcraft</span>
              </div>
              <p className="text-gray-500 text-sm">© {year} Influcraft. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
