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
      color: "#EDA35A",
    },
    dokumen : {
      label: "Dokumen",
      color: "#8AA624",
    },
    tahun : {
      label: "Tahun",
      color: "#60a5fa",
    },
} satisfies ChartConfig

  const chartConfig2 = {
    jumlah_client: {
      label: "Client",
      color: "#fcc61d",
    },
    jumlah_dokumen : {
      label: "Dokumen",
      color: "#f5babb",
    },
    dinas_frekuensi: {
      label: "Service",
      color: "#60a5fa",
    },
} satisfies ChartConfig
  
  useEffect(() => {
    const tahunNow = new Date().getFullYear();
    const limaTahunTerakhir = (tahun : number) => {
      const arrayTahun = [];
      for(let i = 4; i >= 0; i--) {
        arrayTahun.push(tahun - i);
      }
      return arrayTahun;
    }
    const tahunList = limaTahunTerakhir(tahunNow);
    const fetchDashboard1 = async() => {
      const {data, error} = await supabase.from("statistik_client_dokumen_tahunan")
          .select("*")
          .in("tahun", tahunList);
      if(error) {
        console.log(error);
      } else {
        const hasil = tahunList.map((tahun) => {
          const found = data.find((d : DashboardDataItem1) => d.tahun === tahun)
            return {
              tahun,
              client: found?.jumlah_client as number?? 0,
              dokumen: found?.jumlah_dokumen as number?? 0,
          }
        })
        setFetchData1(hasil);
        console.log(hasil);
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
    <div className="w-full h-full flex flex-col relative bg-center bg-cover" style={{ backgroundImage: "url('/Los-Dol.jpg')" }}>
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