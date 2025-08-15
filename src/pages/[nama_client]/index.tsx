"use client"

import Header from "@/components/layout/header";
import { useRouter } from "next/router"

const ServiceDetail = () => {
    const router = useRouter();
    const {nama_client} = router.query;

    return (
        <div>
            <Header query={nama_client as string}/>
            <div className="mt-[10rem]">
                <h1>Halaman Service untuk {nama_client}</h1>
            </div>
        </div>
    )
}

export default ServiceDetail