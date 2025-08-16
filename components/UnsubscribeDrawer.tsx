"use client"

import { useState } from "react"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { db } from "@/lib/firebase" // your firebase init
import { doc, getDoc, deleteDoc } from "firebase/firestore"

export function UnsubscribeDrawer() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleUnsubscribe() {
    if (!email) {
      toast.error("Please enter your email")
      return
    }

    setLoading(true)
    try {
      const ref = doc(db, "waitlist", email)
      const snap = await getDoc(ref)

      if (!snap.exists()) {
        toast.error("Email not found in waitlist")
      } else {
        await deleteDoc(ref)
        toast.success("Successfully unsubscribed")
        setEmail("")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="text-sm underline">
          Unsubscribe
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Unsubscribe</DrawerTitle>
          <DrawerDescription>
            Enter your email to stop receiving updates.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <DrawerFooter>
          <Button onClick={handleUnsubscribe} disabled={loading}>
            {loading ? "Processing..." : "Unsubscribe"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
