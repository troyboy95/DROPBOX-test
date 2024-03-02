'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"

export function DeleteModal() {

  const {user} = useUser()

  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore((state) => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.fileId,
    state.setFileId,
  ])

  async function deleteFile() {
    if(!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)
    try {
      await deleteObject(fileRef).then(async () => {
        // console.log('file deleted')
        deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {

        })
      }).finally(() => {
        setIsDeleteModalOpen(false)
      })
    
    } catch (error) {
      console.log(error)
    }

    // setIsDeleteModalOpen(false)
  }

  return (
    <Dialog
    open={isDeleteModalOpen}
    onOpenChange={(isOpen) =>  setIsDeleteModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action can't be undone and will permanently delete your file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex py-3 space-x-2">
            <Button size={"sm"} className="px-3 flex-1" variant={'ghost'} onClick={() => setIsDeleteModalOpen(false)}>
                <span className="sr-only">Cancel</span>
                <span>Cancel</span>
            </Button>

            <Button type="submit" size={"sm"} variant={'destructive'} className="px-3 flex-1" onClick={() => deleteFile()} >
                <span className="sr-only">Delete</span>
                <span>Delete</span>
            </Button>
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
