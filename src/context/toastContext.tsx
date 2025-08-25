import { createContext, useContext, useState } from "react"

type ToastContextType = {
  isOpenToast : boolean
  setIsOpenToast : () => void
  onCloseToast : () => void
  message : string
  setMessage : (params : string) => void
  type : string
  setType : (params : string) => void
  duration : number
  setDuration : (params : number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState(0);


  return (
    <ToastContext.Provider
      value={{
        isOpenToast,
        message,
        type,
        duration,
        setIsOpenToast : () => setIsOpenToast(true),
        onCloseToast : () => setIsOpenToast(false),
        setMessage : (params) => setMessage(params),
        setType : (params) => setType(params),
        setDuration : (params) => setDuration(params),
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used inside ToastProvider")
  return ctx
}
