"use client"

import Toast from "@/components/layout/dialog-components/toast";
import Header from "@/components/layout/header";
import { DataTable } from "@/components/layout/table/data-table";
import { DocumentColumns } from "@/components/layout/table/documentColumns";
import { Input } from "@/components/ui/input";
import { useEditClient } from "@/context/clientContext";
import { useToast } from "@/context/toastContext";
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
    const [fetchedDokumen, setFetchedDokumen] = useState<DocumentDataType[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const {selectedRowClient} = useEditClient()
    const {message,type,duration,onCloseToast} = useToast()

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
                setFetchedDokumen(formattedData);
            }
            return data;
        }
        fetchDocument();
        // Subscribe ke table Document
        const channel = supabase
        .channel("table-db-changes")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "Documents" },
            (payload) => {
            console.log("Perubahan data:", payload);

        if (payload.eventType === "UPDATE") {
            fetchDocument();
        }

        if (payload.eventType === "DELETE") {
            // kondisi DELETE
            // setDokumen((prev) => prev.filter((d) => d.clientId !== payload.old.id));
            fetchDocument();
        }

        if (payload.eventType === "INSERT") {
            // kalau mau handle INSERT juga
            if ((payload.new as DocumentDataType)?.clientId === selectedRowClient?.client_id) {
                fetchDocument();
            }
        }
        })
        .subscribe();
        // Cleanup
        return () => {
        supabase.removeChannel(channel);
        };
    },[selectedRowClient])

    useEffect(() => {
        if (!searchTerm) {
            setDokumen(fetchedDokumen);
        return;
    }

    const filtered = fetchedDokumen.filter((client) =>
      Object.values(client).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setDokumen(filtered);
    },[searchTerm, fetchedDokumen])

    return (
        <div>
            <Header query={nama_client as string}/>
            <div className="flex flex-col items-center pt-[7rem]">
                <Input type="text" className="w-[20rem] h-[2.8rem] mt-[2rem] text-center bg-gray-200 border-black border-[2px] " placeholder="Search"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
                <DataTable type="document" columns={DocumentColumns} data={dokumen}/>
                <Toast message={message} duration={duration} onClose={onCloseToast} type={type}/>
            </div>
        </div>
    )
}

export default ServiceDetail