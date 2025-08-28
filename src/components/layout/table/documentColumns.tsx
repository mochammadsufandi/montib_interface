"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { ReactNode } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Document = {
    document_id: string
    nomor_surat : string
    nama_dokumen : string
    jenis_dokumen : string
    url : string
    tanggal_dibuat : Date
    tanggal_diupload : Date
    dinas_frekuensi : string
    clientId : string
    action : ReactNode
}

export const DocumentColumns: ColumnDef<Document>[] = [
  {
    accessorKey: "nama_dokumen",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Dokumen
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
  },
  {
    accessorKey: "nomor_surat",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nomor Surat
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
  },
  {
    accessorKey: "jenis_dokumen",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jenis Dokumen
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
  },
  {
    accessorKey: "tanggal_dibuat1",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
           Tanggal Dibuat
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
  },
  {
    accessorKey: "tanggal_diupload",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center">
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
           Tanggal Upload
          </button>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
  },
  {
    header: "Action",
    accessorKey : "action",
    cell : ({row}) => row.original.action
  },
]
