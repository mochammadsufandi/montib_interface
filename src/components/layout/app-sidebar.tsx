import Image from "next/image"
import { Dropdown } from "../ui/dropdownManual"
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { useModal } from "@/context/modalContext"

const items = [
    {
        title : "Dashboard",
        url : "/",
        icon : ""
    },
    {
        title : "Input Client",
        function : "#",
        icon : ""
    },
]

const items2 = [
     {
        title : "Input Document",
        url : "",
        icon : ""
    },
]

export const AppSideBar = () => {
    const {openModalInputClient, openModalInputDocument} = useModal();
    return (
        <Sidebar className="w-[25rem] ">
            <div className="flex justify-center items-center gap-3 w border-black border-[3px] h-[9rem] bg-gray-300">
                <Image
                    src="/Frequency.svg"
                    alt="logo-frekuensi"
                    width={120}
                    height={120}
                >
                </Image>
                <h1 className="font-bold font-sans text-[1.3rem]">MONTIB BALMON_JBI</h1>
            </div>

            <SidebarGroup/>
                <div className="border-l-[3px] border-r-[3px] border-b-[3px] border-black h-full bg-gray-300">
                    <SidebarContent>
                        <SidebarMenu className="mt-[2rem]">
                            {
                                items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild> 
                                            {item.title === "Input Client" ? (
                                                 <button className="py-[1.5rem]" onClick={openModalInputClient}>
                                                    <span className="font-medium text-[20px] ml-[1rem] ">{item.title}</span>
                                                </button>
                                            ) : (
                                                <a href={item.url} className="py-[1.5rem]">
                                                    <span className="font-medium text-[20px] ml-[1rem]">{item.title}</span>
                                                </a>
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                            <Dropdown/>
                            {
                                items2.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <button className="py-[1.5rem]" onClick={openModalInputDocument}>
                                                <span className="font-medium text-[20px] ml-[1rem] ">{item.title}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarContent>
                </div>
            <SidebarGroup/>
        </Sidebar>
    )
}