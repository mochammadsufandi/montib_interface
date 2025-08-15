import { createContext, useContext, useState } from "react"

type ModalContextType = {
  isOpenInputClient: boolean
  isOpenInputDocument: boolean
  isOpenEditClient: boolean
  isOpenEditDocument: boolean
  isOpenDeleteClient: boolean
  isOpenDeleteDocument: boolean
  openModalInputClient: () => void
  openModalInputDocument: () => void
  openModalEditClient: () => void
  openModalEditDocument: () => void
  openModalDeleteClient: () => void
  openModalDeleteDocument: () => void
  closeModalInputClient: () => void
  closeModalInputDocument: () => void
  closeModalEditClient: () => void
  closeModalEditDocument: () => void
  closeModalDeleteClient: () => void
  closeModalDeleteDocument: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpenInputClient, setIsOpenInputClient] = useState(false);
  const [isOpenInputDocument, setIsOpenInputDocument] = useState(false);
  const [isOpenEditClient, setIsOpenEditClient] = useState(false);
  const [isOpenEditDocument, setIsOpenEditDocument] = useState(false);
  const [isOpenDeleteClient, setIsOpenDeleteClient] = useState(false);
  const [isOpenDeleteDocument, setIsOpenDeleteDocument] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpenInputClient,
        isOpenInputDocument,
        isOpenEditClient,
        isOpenEditDocument,
        isOpenDeleteClient,
        isOpenDeleteDocument,
        openModalInputClient: () => setIsOpenInputClient(true),
        closeModalInputClient: () => setIsOpenInputClient(false),
        openModalInputDocument: () => setIsOpenInputDocument(true),
        closeModalInputDocument: () => setIsOpenInputDocument(false),
        openModalEditClient: () => setIsOpenEditClient(true),
        closeModalEditClient: () => setIsOpenEditClient(false),
        openModalEditDocument: () => setIsOpenEditDocument(true),
        closeModalEditDocument: () => setIsOpenEditDocument(false),
        openModalDeleteClient: () => setIsOpenDeleteClient(true),
        closeModalDeleteClient: () => setIsOpenDeleteClient(false),
        openModalDeleteDocument: () => setIsOpenDeleteDocument(true),
        closeModalDeleteDocument: () => setIsOpenDeleteDocument(false)
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
