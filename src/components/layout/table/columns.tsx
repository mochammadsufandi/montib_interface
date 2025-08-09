"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { ReactNode } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Document = {
  id: string
  nama_perusahaan : string,
  alamat : string,
  jumlah_berkas : number,
  tanggal_terakhir_berkas : Date,
  detail : ReactNode,
  action : ReactNode
}

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "nama_perusahaan",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Perusahaan
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
  },
  {
    accessorKey: "alamat",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Alamat
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
  },
  {
    accessorKey: "jumlah_berkas",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jumlah Berkas
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
  },
  {
    accessorKey: "tanggal_terakhir_berkas",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Terakhir Berkas
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
