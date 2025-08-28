"use client"

import Image from "next/image";
import { SidebarTrigger } from "../ui/sidebar";
import { useEffect, useState } from "react";
import supabase from "@/lib/db";

const Header = ({query} : {query : string}) => {
    const [email, setEmail] = useState("");

    useEffect(() => {
        const getUser = async() => {
            const {data : {user}} = await supabase.auth.getUser();
            if(user) {
                setEmail(user.email as string);
            }
        }
        getUser()
    },[])

    return (
        <div className="flex flex-row justify-between items-center pr-[2rem] bg-blue-300 fixed top-0 w-full border-black border-r-[3px] border-t-[3px] border-b-[3px] h-[125px] z-50">
            <div>
                <SidebarTrigger className="w-[4rem] h-[4rem]"/>
                <h1 className="text-[1.2rem] mx-[2rem] font-bold">{query}</h1>
            </div>
            <div className="font-bold">
                Selamat Datang {email   }
            </div>
            <div className="flex flex-row gap-[1rem]">
                <Image
                    src={"/Komdigi.svg"}
                    alt="Logo Komdigi"
                    width={90}
                    height={80}
                />
                <Image
                    src={"/DJID.svg"}
                    className="rounded-md"
                    alt="Logo DJID"
                    width={100}
                    height={100}
                />
            </div>
        </div>
    )
}

export default Header;