import { createContext, useContext, useState } from "react"

type ModalContextType = {
  isOpenInputClient: boolean
  isOpenInputDocument: boolean
  isOpenEditClient: boolean
  isOpenEditDocument: boolean
  openModalInputClient: () => void
  openModalInputDocument: () => void
  openModalEditClient: () => void
  openModalEditDocument: () => void
  closeModalInputClient: () => void
  closeModalInputDocument: () => void
  closeModalEditClient: () => void
  closeModalEditDocument: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpenInputClient, setIsOpenInputClient] = useState(false);
  const [isOpenInputDocument, setIsOpenInputDocument] = useState(false);
  const [isOpenEditClient, setIsOpenEditClient] = useState(false);
  const [isOpenEditDocument, setIsOpenEditDocument] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpenInputClient,
        isOpenInputDocument,
        isOpenEditClient,
        isOpenEditDocument,
        openModalInputClient: () => setIsOpenInputClient(true),
        closeModalInputClient: () => setIsOpenInputClient(false),
        openModalInputDocument: () => setIsOpenInputDocument(true),
        closeModalInputDocument: () => setIsOpenInputDocument(false),
        openModalEditClient: () => setIsOpenEditClient(true),
        closeModalEditClient: () => setIsOpenEditClient(false),
        openModalEditDocument: () => setIsOpenEditDocument(true),
        closeModalEditDocument: () => setIsOpenEditDocument(false)
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error("useModal must be used inside ModalProvider")
  return ctx
}
