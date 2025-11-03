"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"

export type ChartDataPoint<K extends string, T extends Record<string, number>> = {
  [key in K]: string | number
} & T

export type ChartConfigType<T extends string> = {
  [key in T]: {
    label: string
    color: string
  }
}

type DashboardProps<K extends string, T extends string> = {
  type : string
  chartData: ChartDataPoint<K, Record<T, number>>[]
  chartConfig: ChartConfigType<T>
}

export function DashboardChart<K extends string, T extends string>({
  type,
  chartData,
  chartConfig
} : DashboardProps<K,T>) {
  return (
    <> {type === "tahun" ?  
      <Card className="h-min-[200px] w-[40%]">
        <h2 className="text-center text-xl">Jumlah Client dan Dokumen dalam 5 tahun terakhir</h2>
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="tahun"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  // tickFormatter={(value) => value.slice(0, 3)}
                >
                </XAxis>
                <ChartTooltip content={<ChartTooltipContent indicator="line"/>} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="client" fill="var(--color-client)" radius={4} />
                <Bar dataKey="dokumen" fill="var(--color-dokumen)" radius={4} />
            </BarChart>
        </ChartContainer>
      </Card> 
      : (
      <Card className="h-min-[200px] w-[40%]">
        <h2 className="text-center text-xl">Jumlah Client dan Dokumen Tiap Service</h2>
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  className="text-[12px]"
                  dataKey="dinas_frekuensi"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 11)}
                >
                </XAxis>
                <ChartTooltip content={<ChartTooltipContent indicator="line"/>} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="jumlah_client" fill="var(--color-jumlah_client)" radius={4} />
                <Bar dataKey="jumlah_dokumen" fill="var(--color-jumlah_dokumen)" radius={4} />
            </BarChart>
        </ChartContainer>
      </Card> 
    )} 
    </>
   
  )
}
