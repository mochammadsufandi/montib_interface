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
import DeleteModal from "@/components/layout/form/deleteModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <SidebarProvider>
        <ModalProvider>
          <ClientProvider>
            <AppSideBar/>
            <main className="w-full">
              <Component {...pageProps} />
            </main>
            <ClientInputForm/>
            <DocumentInputForm/>
            <ClientEditForm/>
            <DocumentEditForm/>
            <DeleteModal/>
          </ClientProvider>
        </ModalProvider>
      </SidebarProvider>
    </div>
  )
}
