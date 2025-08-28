"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { ClientDataType } from "@/pages/service"
import { useRouter } from "next/router"
import { useModal } from "@/context/modalContext"
import { useEditClient } from "@/context/clientContext"
import { useEditDocument } from "@/context/documentContext"
import { DocumentDataType } from "@/pages/[nama_client]"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  type: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  type,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex : 0,
    pageSize : 10
  })
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange : setSorting,
    getSortedRowModel : getSortedRowModel(),
    onPaginationChange : setPagination,
    getPaginationRowModel : getPaginationRowModel(),
    state : {
      sorting,
      pagination
    }
  })

  const router = useRouter();
  const {openModalEditClient, openModalDeleteClient, openModalEditDocument, openModalDeleteDocument, isOpenDeleteClient} = useModal();
  const {setSelectedRowClient} = useEditClient();
  const {setSelectedRowDocument} = useEditDocument();

  return (
    <div className="overflow-hidden rounded-md border mt-[3rem] mx-[2rem]">
      <Table className="">
        { type === "client" ? (
          <TableHeader className="bg-blue-300 text-[1rem]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="text-center">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-bold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        ) : (
          <TableHeader className="text-[1rem]" style={{ backgroundColor: "rgba(150,242,215)" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-bold py-[2rem] border-2 border-black text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        )} {
          type === "client" ? (
          <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="w-[30rem] max-w-[30rem] whitespace-normal break-words">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {cell.column.id === "detail" ? (
                      <Button className="bg-white" variant={"outline"}
                        onClick={() => {
                          console.log(row.original)
                            setSelectedRowClient(row.original as ClientDataType);
                            router.push(`/${(row.original as ClientDataType).nama_client}`)
                        }}
                      >
                        <Image src={"/detailsIcon.svg"} alt="detail" width={25} height={25}></Image>
                      </Button>
                    ) : cell.column.id === "action" ? (
                        <>
                          <Button className="bg-white max-w-fit max-h-fit" variant={"outline"}
                            onClick={() => {
                              openModalEditClient()
                              setSelectedRowClient(row.original as ClientDataType)
                            }}
                          >
                            <Image src={"/editIcon.svg"} alt="edit" width={25} height={25}></Image>
                          </Button>
                          <Button className="bg-white" variant={"outline"}
                            onClick={() => {
                              openModalDeleteClient()
                              console.log(isOpenDeleteClient)
                              setSelectedRowClient(row.original as ClientDataType)
                            }}
                          >
                            <Image src={"/deleteIcon.svg"} alt="delete" width={25} height={25}></Image>
                          </Button>
                        </>
                      ) : (
                        ""
                      )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        ) : (
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="w-[30rem] max-w-[30rem] whitespace-normal break-words">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    { cell.column.id === "action" ? (
                      <>
                          <Button className="bg-white max-w-fit max-h-fit" variant={"outline"}
                            onClick={() => {
                              openModalEditDocument()
                              setSelectedRowDocument(row.original as DocumentDataType)
                            }}
                          >
                            <Image src={"/editIcon.svg"} alt="edit" width={25} height={25}></Image>
                          </Button>
                          <Button className="bg-white" variant={"outline"}
                            onClick={() => {
                              openModalDeleteDocument()
                              setSelectedRowDocument(row.original as DocumentDataType)
                            }}
                          >
                            <Image src={"/deleteIcon.svg"} alt="delete" width={25} height={25}></Image>
                          </Button>
                        </>
                    ) : (
                      ""
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
          )
        }
        
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 px-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
      </div>
    </div>
  )
}