"use client"

import { tw } from "@/lib/utils"
import React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"

type ToastProps = ToastPrimitive.ToastProps

export function Toast({ ...props }: ToastPrimitive.ToastProviderProps) {
  return <ToastPrimitive.ToastProvider {...props} />
}

Toast.Root = function DropdownMenu({ ...props }: ToastProps) {
  return <ToastPrimitive.Root {...props} />
}

Toast.Title = React.forwardRef<HTMLDivElement, ToastPrimitive.ToastTitleProps>(
  function ToastTitle({ className, ...props }, forwardRef) {
    return (
      <ToastPrimitive.Title
        {...props}
        ref={forwardRef}
        className={tw("text-mds font-bold dark:text-gray-100", className)}
      />
    )
  }
)

Toast.Description = React.forwardRef<
  HTMLDivElement,
  ToastPrimitive.ToastDescriptionProps
>(function ToastDescription({ className, ...props }, forwardRef) {
  return (
    <ToastPrimitive.Description
      {...props}
      ref={forwardRef}
      className={tw("mt-1 text-sm white", className)}
    />
  )
})

Toast.Viewport = function ToastViewport({
  ...props
}: ToastPrimitive.ToastViewportProps) {
  return <ToastPrimitive.Viewport {...props} />
}
