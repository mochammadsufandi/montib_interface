import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
    return (
        <div className="border-black border-r-[3px] border-t-[3px] border-b-[3px] h-[125px] w-full fixed bg-white z-100">
            <SidebarTrigger className="w-[4rem] h-[4rem]"/>
            <h1 className="text-[1.2rem] mx-[2rem]">Dashboard</h1>
        </div>
    )
}

export default Header;