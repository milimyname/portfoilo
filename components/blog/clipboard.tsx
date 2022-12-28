"use client"

import { useEffect, useState, useRef } from "react"
import { useCopyToClipboard } from "usehooks-ts"
import { Toast } from "@/ui/Toast"
import { AnimatePresence, motion } from "framer-motion"
import { config } from "@/lib/config"
import { Icons } from "../icons"

export default function CopyToClipboard() {
  const [value, copy] = useCopyToClipboard()
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<string>()
  const ref = useRef<HTMLButtonElement>(null)

  const handleOnlick = async () => {
    // Return if text is empty

    const code = ref.current.previousSibling as HTMLElement
    code.childNodes.forEach((node: HTMLElement | null) => {
      // if node type is element like span
      if (node.nodeType === 1)
        setText((prev) => {
          // return if prev is undefined
          if (prev) return prev + node.innerText
          else return node.innerText
        })
    })

    // On each change of open, close toast after 400ms
    setOpen(true)
  }

  useEffect(() => {
    // On each change of text, copy it to clipboard and ckear text
    if (text) copy(text)

    if (open)
      setTimeout(() => {
        setOpen(false)
      }, config.timeout.default)

    return () => {
      // Clear text on unmount
      setText("")
    }
  }, [text, open])

  return (
    <Toast>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        ref={ref}
        type="button"
        className="sticky right-4 top-2 min-h-max outline-none cursor-pointer"
        onClick={handleOnlick}
      >
        <Icons.copy className="h-6 w-6 text-white hover:text-white/75 transition-colors" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <Toast.Root open={open} onOpenChange={setOpen}>
            <motion.div
              initial={{ opacity: 0, top: -20 }}
              animate={{ opacity: 1, top: 20 }}
              exit={{ opacity: 0, top: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6 z-50 w-4/12 fixed left-[45%] translate-x-[-40%] bg-primary-green rounded-lg drop-shadow-lg"
            >
              <Toast.Title className="flex justify-between">
                Hope it will help{" "}
                <Icons.smile className="h-6 w-6 text-white hover:text-white/75 transition-colors" />
              </Toast.Title>
              <Toast.Description>Code copied to clipboard</Toast.Description>
            </motion.div>
          </Toast.Root>
        )}
      </AnimatePresence>

      <Toast.Viewport />
    </Toast>
  )
}
