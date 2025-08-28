"use client"

import Header from "@/components/layout/header";
import { DataTable } from "@/components/layout/table/data-table";
import { DocumentColumns } from "@/components/layout/table/documentColumns";
import { useEditClient } from "@/context/clientContext";
import supabase from "@/lib/db";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export type DocumentDataType = {
    document_id: string
    nomor_surat : string
    nama_dokumen : string
    jenis_dokumen : string
    url : string
    tanggal_dibuat : Date
    tanggal_diupload : Date
    dinas_frekuensi : string,
    clientId : string,
    action : string
}

const ServiceDetail = () => {
    const router = useRouter();
    const {nama_client} = router.query;
    const [dokumen, setDokumen] = useState<DocumentDataType[]>([]);
    const {selectedRowClient} = useEditClient()

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "-"; // kasih placeholder misalnya "-"
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    useEffect(() => {
        const fetchDocument = async() => {
            const {data,error} = await supabase.from("documents_summary")
                .select("*")
                .eq("clientId", selectedRowClient?.client_id)
            if(error) {
                console.log(error);
            } else {
                 const formattedData = data.map((item) => ({
                    ...item,
                    clientId : (item.clientId as number).toString(),
                    tanggal_dibuat1 : formatDate(item.tanggal_dibuat),
                    tanggal_dibuat : new Date(item.tanggal_dibuat),
                    tanggal_diupload : formatDate(item.created_at)
                }));
                setDokumen(formattedData);
            }
        }
        fetchDocument()
    },[selectedRowClient])

    return (
        <div>
            <Header query={nama_client as string}/>
            <div className="mt-[10rem]">
                <h1>Halaman Service untuk {nama_client}</h1>
                <DataTable type="document" columns={DocumentColumns} data={dokumen}/>
            </div>
        </div>
    )
}

export default ServiceDetail