"use client"

import Header from "@/components/layout/header";
import { columns } from "@/components/layout/table/columns";
import { DataTable } from "@/components/layout/table/data-table";
import { Input } from "@/components/ui/input";

export type ClientDataType = {
    id : string,
    nama_perusahaan : string,
    alamat : string,
    dinas_frekuensi : string,
    jumlah_berkas : number,
    tanggal_terakhir_berkas : Date,
    detail : string,
    action : string
}

const Service = () => {

    const data : ClientDataType[] = [
        {
            id: "785231",
            nama_perusahaan : "LPP TVRI",
            alamat : "Jalan Telanaipura No 1 Kota Jambi",
            dinas_frekuensi : "Broadcast",
            jumlah_berkas : 6,
            tanggal_terakhir_berkas : new Date(),
            detail : "",
            action : "" 
        },
        {
            id: "885231",
            nama_perusahaan : "LPP RRI",
            alamat : "Jl. Jend. Ahmad Yani No.5, Telanaipura, Kec. Telanaipura, Kota Jambi, Jambi 36122",
            dinas_frekuensi : "Broadcast",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2025-05-10"),
            detail : "",
            action : "" 
        },
        {
            id: "985231",
            nama_perusahaan : "Radio Eldity, PT",
            alamat : "Jl. Thehok Sukarejo No 19, Thehok, Kec. Jambi Selatan, Kota Jambi, Jambi 36122",
            dinas_frekuensi : "Broadcast",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2025-05-06"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_perusahaan : "Radio Mestong, PT",
            alamat : "Sungai Bahar, Muaro Jambi",
            dinas_frekuensi : "Broadcast",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_perusahaan : "Telkomsel, PT",
            alamat : "Sungai Bahar, Muaro Jambi",
            dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_perusahaan : "Indosat Ooredoo, PT",
            alamat : "Sungai Bahar, Muaro Jambi",
            dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_perusahaan : "XL Axiata, PT",
            alamat : "Sungai Bahar, Muaro Jambi",
            dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_perusahaan : "XL Axiata, PT",
            alamat : "Sungai Bahar, Muaro Jambi",
            dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_perusahaan : "XL Axiata, PT",
            alamat : "Sungai Bahar, Muaro Jambi",
             dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_perusahaan : "XL Axiata, PT",
            alamat : "Sungai Bahar, Muaro Jambi",
             dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_perusahaan : "XL Axiata, PT",
            alamat : "Sungai Bahar, Muaro Jambi",
             dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_perusahaan : "XL Axiata, PT",
            alamat : "Sungai Bahar, Muaro Jambi",
             dinas_frekuensi : "Fixed Service",
            jumlah_berkas : 8,
            tanggal_terakhir_berkas : new Date("2023-1-10"),
            detail : "",
            action : "" 
        },
        {
            id: "1085231",
            nama_perusahaan : "XL Axiata, PT",
            alamat : "Sungai Bahar, Muaro Jambi",
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
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}

export default Service;