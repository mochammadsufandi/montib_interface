"use client"

import { useRouter } from "next/router"

const ServiceDetail = () => {
    const router = useRouter();
    const {nama_client} = router.query;

    return (
        <div>
            <h1>Halaman Service untuk {nama_client}</h1>
        </div>
    )
}

export default ServiceDetail