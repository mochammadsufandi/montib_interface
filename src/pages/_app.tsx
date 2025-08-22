import { AppSideBar } from "@/components/layout/app-sidebar";
import { ClientInputForm } from "@/components/layout/form/clientInputForm";
import { ClientEditForm } from "@/components/layout/form/clientEditForm";
import { DocumentInputForm } from "@/components/layout/form/documentInputForm";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ModalProvider } from "@/context/modalContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClientProvider } from "@/context/clientContext";
import { DocumentEditForm } from "@/components/layout/form/documentEditForm";
import { DocumentProvider } from "@/context/documentContext";
import DeleteModalClient from "@/components/layout/form/deleteModalClient";
import DeleteModalDocument from "@/components/layout/form/deleteModalDocument";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <SidebarProvider>
        <ModalProvider>
          <ClientProvider>
            <DocumentProvider>
              <AppSideBar/>
              <main className="w-full">
                <Component {...pageProps} />
              </main>
              <ClientInputForm/>
              <DocumentInputForm/>
              <ClientEditForm/>
              <DocumentEditForm/>
              <DeleteModalClient/>  
              <DeleteModalDocument/>
            </DocumentProvider>
          </ClientProvider>
        </ModalProvider>
      </SidebarProvider>
    </div>
  )
}
