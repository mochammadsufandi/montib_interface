"use client"

import Toast from "@/components/layout/dialog-components/toast";
import Header from "@/components/layout/header";
import { clientColumns } from "@/components/layout/table/clientColumns";
import { DataTable } from "@/components/layout/table/data-table";
import { Input } from "@/components/ui/input";
import { useEditClient } from "@/context/clientContext";
import { useToast } from "@/context/toastContext";
import supabase from "@/lib/db";
import { useEffect, useState } from "react";

export type ClientDataType = {
    client_id : string,
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
        fetchClient();
        // Subscribe ke table Client
        const channel = supabase
        .channel("table-db-changes")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "Client" },
            (payload) => {
            console.log("Perubahan data:", payload);

        if (payload.eventType === "UPDATE") {
            // kondisi EDIT
            if ((payload.new as ClientDataType)?.dinas_frekuensi === service) {
            fetchClient(); // panggil ulang data dari BE
            }
        }

        if (payload.eventType === "DELETE") {
            // kondisi DELETE
            console.log(payload.old.id);
            setClient((prev) => prev.filter((c) => c.client_id !== payload.old.id));
            // fetchClient();
        }

        if (payload.eventType === "INSERT") {
            // kalau mau handle INSERT juga
            if ((payload.new as ClientDataType)?.dinas_frekuensi === service) {
            fetchClient();
            }
        }
        })
        .subscribe();
        // Cleanup
        return () => {
        supabase.removeChannel(channel);
        };
    }, [service])


    const {message,duration,onCloseToast,type} = useToast();
    
    return (
        <div className="">
            <Header query="Service"/>
            <div className="flex flex-col items-center pt-[7rem]">
                <Input type="text" className="w-[20rem] h-[2.8rem] mt-[2rem] text-center bg-gray-200 border-black border-[2px] " placeholder="Search"/>
                <DataTable columns={clientColumns} data={client} type="client" />
                <Toast message={message} duration={duration} onClose={onCloseToast} type={type}/>
            </div>
        </div>
    )
}

export default Service;