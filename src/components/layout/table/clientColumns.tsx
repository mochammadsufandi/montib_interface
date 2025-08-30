"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { ReactNode } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
  client_id: string
  nama_client : string,
  alamat_client : string,
  jumlah_berkas : number,
  tanggal_terakhir_berkas : Date,
  detail : ReactNode,
  action : ReactNode
}

export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "nama_client",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button className="flex flex-row items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Perusahaan 
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      )
    },
  },
  {
    accessorKey: "alamat_client",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button className="flex flex-row items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Alamat
          <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      )
    },
  },
  {
    accessorKey: "jumlah_berkas",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button className="flex flex-row items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jumlah Berkas
          <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      )
    },
  },
  {
    accessorKey: "tanggal_terakhir_berkas",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button className="flex flex-row items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Terakhir Berkas
          <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      )
    },
  },
  {
    header: "Detail",
    accessorKey : "detail",
    cell : ({row}) => row.original.detail
  },
  {
    header: "Action",
    accessorKey : "action",
    cell : ({row}) => row.original.detail
  },
]
