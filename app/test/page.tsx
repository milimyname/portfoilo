"use client"

import * as ToastPrimitive from "@radix-ui/react-toast"
import { tw } from "@/lib/utils"
import React from "react"

type Props = {}

const Toast = (props: Props) => {
  const [open, setOpen] = React.useState(false)

  return (
    <ToastPrimitive.Provider>
      <button
        onClick={() => {
          if (open) {
            setOpen(false)
            setTimeout(() => {
              setOpen(true)
            }, 400)
          } else {
            setOpen(true)
          }
        }}
        className="bg-gray-800 text-white px-4 py-2 rounded-md"
      >
        Click
      </button>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className={tw(
          "z-50 fixed bottom-4 inset-x-4 w-auto md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm shadow-lg rounded-lg",
          "bg-white dark:bg-gray-800",
          "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
          "radix-state-closed:animate-toast-hide",
          "radix-swipe-end:animate-toast-swipe-out",
          "translate-x-radix-toast-swipe-move-x",
          "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      >
        <div className="flex">
          <div className="flex-1 w-0  flex items-center pl-5 py-4">
            <div className="w-full radix">
              <ToastPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Pull Request Review
              </ToastPrimitive.Title>
              <ToastPrimitive.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                Someone requested your review on{" "}
                <span className="font-medium">repository/branch</span>
              </ToastPrimitive.Description>
            </div>
          </div>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  )
}

export default Toast
