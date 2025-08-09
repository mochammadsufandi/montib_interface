import Image from "next/image"
import { Dropdown } from "../ui/dropdownManual"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

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
        url : "#",
        icon : ""
    },
]

export const AppSideBar = () => {
    return (
        <Sidebar>
            <div className="flex justify-center items-center gap-3 border-black border-[3px] h-[9rem]">
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
                <div className="border-l-[3px] border-r-[3px] border-b-[3px] border-black h-full">
                    <SidebarContent>
                        <SidebarMenu className="mt-[2rem]">
                            {
                                items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url} className="py-[1.5rem]">
                                                <span className="font-medium text-[20px] ml-[1rem]">{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                            <Dropdown/>
                            {
                                items2.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url} className="pb-[1.5rem]">
                                                <span className="font-medium text-[20px] ml-[1rem] ">{item.title}</span>
                                            </a>
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