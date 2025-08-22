"use client"

import Header from "@/components/layout/header";
import { clientColumns } from "@/components/layout/table/clientColumns";
import { DataTable } from "@/components/layout/table/data-table";
import { Input } from "@/components/ui/input";
import { useEditClient } from "@/context/clientContext";
import supabase from "@/lib/db";
import { useEffect, useState } from "react";

export type ClientDataType = {
    id : string,
    nama_client : string,
    alamat_client : string,
    dinas_frekuensi : string,
    jumlah_berkas : number,
    tanggal_terakhir_berkas : Date,
    detail : string,
    action : string
}

const Service = () => {

    const [client, setClient] = useState<ClientDataType[]>([]);
    const {service} = useEditClient();

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
        const fetchClient = async() => {
            const {data, error} = await supabase.from("client_summary")
            .select("*")
            .eq("dinas_frekuensi", service)

            if(error) console.log("error : ", error)
            else {
                const formattedData = data.map((item) => ({
                    ...item,
                    tanggal_terakhir_berkas : formatDate(item.tanggal_terakhir_berkas)
                }));
                setClient(formattedData);
            }
        }

        fetchClient()
    }, [service])

    console.log(client)
    const data : ClientDataType[] = [
        {
            id: "785231",
            nama_client : "LPP TVRI",
            alamat_client : "Jalan Telanaipura No 1 Kota Jambi",
            dinas_frekuensi : "Broadcast",
            jumlah_berkas : 6,
            tanggal_terakhir_berkas : new Date(),
            detail : "",
            action : "" 
        },
        {
            id: "885231",
            nama_client : "LPP RRI",
            alamat_client : "Jl. Jend. Ahmad Yani No.5, Telanaipura, Kec. Telanaipura, Kota Jambi, Jambi 36122",
            dinas_frekuensi : "Broadcast",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2025-05-10"),
            detail : "",
            action : "" 
        },
        {
            id: "985231",
            nama_client : "Radio Eldity, PT",
            alamat_client : "Jl. Thehok Sukarejo No 19, Thehok, Kec. Jambi Selatan, Kota Jambi, Jambi 36122",
            dinas_frekuensi : "Broadcast",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2025-05-06"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "Radio Mestong, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
            dinas_frekuensi : "Broadcast",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "Telkomsel, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
            dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "Indosat Ooredoo, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
            dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "XL Axiata, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
            dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "XL Axiata, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
            dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "XL Axiata, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
             dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "XL Axiata, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
             dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "XL Axiata, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
             dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "XL Axiata, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
             dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "XL Axiata, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
             dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_client : "XL Axiata, PT",
            alamat_client : "Sungai Bahar, Muaro Jambi",
             dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
    ]

    return (
        <div className="">
            <Header query="Service"/>
            <div className="flex flex-col items-center pt-[7rem]">
                <Input type="text" className="w-[20rem] h-[2.8rem] mt-[2rem] text-center bg-gray-200 border-black border-[2px] " placeholder="Search"/>
                <DataTable columns={clientColumns} data={client} type="client" />
            </div>
        </div>
    )
}

export default Service;