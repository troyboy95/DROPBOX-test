'use client'

import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"

const RenameModal = () => {

    const {user} = useUser()
    const [input, setInput] = useState("")

    const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] = useAppStore((state) => [
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.filename,
      ])

    const renameFile = async () => {
        if(!user || !fileId) return;

        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            fileName: input
        })

        setInput('')
        setIsRenameModalOpen(false);
    }

  return (
    <Dialog
    open={isRenameModalOpen}
    onOpenChange={(isOpen) =>  setIsRenameModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the file</DialogTitle>

          <Input 
          id="link"
          defaultValue={filename}
          onChange={(e) => setInput(e.target.value)}
          onKeyDownCapture={(e) => {
            if(e.key === "Enter"){
                renameFile()
            }
          }}
          />
        <div className="flex justify-end py-3 space-x-2">
            <Button size={"sm"} className="px-3" variant={'ghost'} onClick={() => setIsRenameModalOpen(false)}>
                <span className="sr-only">Cancel</span>
                <span>Cancel</span>
            </Button>

            <Button type="submit" size={"sm"} className="px-3 " onClick={() => renameFile()} >
                <span className="sr-only">Rename</span>
                <span>Rename</span>
            </Button>
        </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default RenameModal