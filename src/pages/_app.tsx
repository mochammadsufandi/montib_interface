import { AppSideBar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSideBar/>
        <main className="w-full">
          
          <Component {...pageProps} />
        </main>
      </SidebarProvider>
    </div>
  )
}
