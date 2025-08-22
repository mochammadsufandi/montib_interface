"use client"

import Header from "@/components/layout/header";
import { DataTable } from "@/components/layout/table/data-table";
import { DocumentColumns } from "@/components/layout/table/documentColumns";
import { useRouter } from "next/router"

export type DocumentDataType = {
    id: string
    nomor_surat : string
    nama_dokumen : string
    jenis_dokumen : string
    url : string
    tanggal_dibuat : Date
    tanggal_diupload : Date
    clientId : number,
    action : string
}

const ServiceDetail = () => {
    const router = useRouter();
    const {nama_client} = router.query;

    const data = [
        {
            id: "785231",
            nomor_surat : "B-543/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "Surat Teguran PT Telkom Indonesia",
            jenis_dokumen : "Surat Teguran",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "775231",
            nomor_surat : "B-544/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Klarifikasi Kesanggupan Pemenuhan Peraturan Perundang - Undangan PT Telkom Indonesia",
            jenis_dokumen : "BA Klarifikasi Pemenuhan PP",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },
        {
            id: "765231",
            nomor_surat : "B-545/Balmon.15/SP.03.03/08/2025",
            nama_dokumen : "BA Pengamanan APT PT Telkom Indonesia",
            jenis_dokumen : "BA Pengamanan APT",
            url : "https://cloudns.go.id/surat-teguran-telkom",
            tanggal_dibuat : new Date("2025-8-5"),
            tanggal_diupload : new Date("2025-8-5"),
            clientId : 1,
            action : ""
        },        
    ]

    return (
        <div>
            <Header query={nama_client as string}/>
            <div className="mt-[10rem]">
                <h1>Halaman Service untuk {nama_client}</h1>
                <DataTable type="document" columns={DocumentColumns} data={data}/>
            </div>
        </div>
    )
}

export default ServiceDetail