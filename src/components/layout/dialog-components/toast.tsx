"use client";

import { useToast } from "@/context/toastContext";
import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: string;
  onClose: () => void;
  duration?: number; // default: 3 detik
};

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getColor = () => {
    switch (type) {
      case "success":
        return "bg-green-400 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };
  const {isOpenToast} = useToast();

  return (
    <> {isOpenToast && (
            <div
            className={`fixed bottom-5 right-5 z-50 flex items-center justify-between w-80 px-4 py-3 rounded-lg shadow-lg ${getColor()}`}
            >
            <span>{message}</span>
            <button
                onClick={onClose}
                className="ml-4 text-white hover:text-gray-200 font-bold "
            >
                ✕
            </button>
            </div>
        )} 
    </>
  );
}
