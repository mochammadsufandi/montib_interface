"use client"

import { DashboardChart } from "@/components/layout/chart/dashboardChart"
import Toast from "@/components/layout/dialog-components/toast"
import Header from "@/components/layout/header"
import { ChartConfig } from "@/components/ui/chart"
import { useToast } from "@/context/toastContext"
import supabase from "@/lib/db"
import { useEffect, useState } from "react"

export type DashboardDataItem1 = {
  tahun: number
  client: number
  dokumen: number,
}

export type DashboardDataItem2 = {
  dinas_frekuensi : number
  jumlah_client: number
  jumlah_dokumen: number,
}

const Home = () => {
  const {message,type,duration,onCloseToast} = useToast();
  const [fetchData1, setFetchData1] = useState<DashboardDataItem1[]>([])
  const [fetchData2, setFetchData2] = useState<DashboardDataItem2[]>([])

  const chartConfig1 = {
    client: {
      label: "Client",
      color: "#2563eb",
    },
    dokumen : {
      label: "Dokumen",
      color: "#60a5fa",
    },
    tahun : {
      label: "Dokumen",
      color: "#60a5fa",
    },
} satisfies ChartConfig

  const chartConfig2 = {
    jumlah_client: {
      label: "Client",
      color: "#fdf6db",
    },
    jumlah_dokumen : {
      label: "Dokumen",
      color: "#d4eaf8",
    },
    dinas_frekuensi: {
      label: "Service",
      color: "#60a5fa",
    },
} satisfies ChartConfig
  
  useEffect(() => {
    const tahunList = [2021, 2022, 2023, 2024, 2025]
    const fetchDashboard1 = async() => {
      const {data, error} = await supabase.from("statistik_client_dokumen_tahunan")
          .select("*")
          .in("tahun", [2025,2024,2023]);
      if(error) {
        console.log(error);
      } else {
        const hasil = tahunList.map((tahun) => {
          const found = data.find((d) => d.tahun === tahun)
            return {
              tahun,
              client: found?.jumlah_client as number?? 0,
              dokumen: found?.jumlah_dokumen as number?? 0,
          }
        })
        console.log(hasil)
        setFetchData1(hasil)
      }
    }
    const fetchDashboard2 = async() => {
      const {data, error} = await supabase.from("statistik_client_dokumen_service")
          .select("*")
      if(error) {
        console.log(error);
      } else {
        console.log(data)
        setFetchData2(data)
      }
    }
    fetchDashboard1()
    fetchDashboard2()
  },[])


  return (
    <div className="w-full flex flex-col relative">
      <Header query="Home"/>
      <div className="flex flex-row flex-wrap gap-5 items-center justify-center w-full h-full mt-[10rem]">  
        <DashboardChart chartData={fetchData1} chartConfig={chartConfig1} type="tahun"/>
        <DashboardChart chartData={fetchData2} chartConfig={chartConfig2} type="service"/>
      </div>
      <Toast message={message} duration={duration} onClose={onCloseToast} type={type}/>
    </div>
  )
}

export default Home