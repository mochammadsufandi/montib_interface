"use client"

import Toast from "@/components/layout/dialog-components/toast"
import Header from "@/components/layout/header"
import { useToast } from "@/context/toastContext"

const Home = () => {
  const {message,type,duration,onCloseToast} = useToast();

  return (
    <div className="w-full flex flex-row relative">
      <Header query="Home"/>
      <Toast message={message} duration={duration} onClose={onCloseToast} type={type}/>
    </div>
  )
}

export default Home