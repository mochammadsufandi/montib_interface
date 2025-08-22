"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useModal } from "@/context/modalContext"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useEditDocument } from "@/context/documentContext"

type DocumentInput = {
  nomor_surat : string,
  nama_dokumen : string,
  jenis_dokumen : string,
  url : string,
  tanggal_dibuat : Date,
  clientId : number,
}


const documentFormSchema = z.object({
  nomor_surat: z.string().min(1, {
    message: "nomor surat minimal 1 karakter",
  }),
  bagian_pengendalian : z.string().min(1),
  nama_dokumen: z.string().min(8, {
    message : "alamat minimal 8 karakter"
  }),
  jenis_dokumen: z.string(),
  url: z.string(),
  dinas_frekuensi: z.string(),
  tanggal_dibuat: z.string(),
  clientId : z.number()
})

export function DocumentEditForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      bagian_pengendalian:"",
      nama_dokumen: "",
      jenis_dokumen: "",
      url: "",
    },
  })

  const {isOpenEditDocument, closeModalEditDocument} = useModal();
  const {selectedRowDocument} = useEditDocument()
  const [tanggalSurat, setTanggalSurat] = useState<string>("");
  const clients = [
    {
      id : 1,
      nama_client : "Radio Eldity, PT"
    },
    {
      id : 2,
      nama_client : "Singoedan Media Network, PT"
    },
    {
      id : 3,
      nama_client : "PT Telekomunikasi Indonesia"
    },
    {
      id : 4,
      nama_client : "PT XL Smart Telecom Sejahtera"
    },
  ]

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof documentFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data : DocumentInput = {
      ...values,
      clientId : +values.clientId,
      nomor_surat : `B-${values.nomor_surat}/Balmon.15/SP.03.${values.bagian_pengendalian}${tanggalSurat}`,
      tanggal_dibuat : new Date(values.tanggal_dibuat)
    }
    console.log(data)
  }

  useEffect(() => {
    if (isOpenEditDocument) {
      document.body.style.overflow = "hidden"; // matikan scroll
    } else {
      document.body.style.overflow = "auto"; // aktifkan scroll
    }
    if(selectedRowDocument) {
      console.log(selectedRowDocument.tanggal_dibuat.toLocaleDateString())
      // const
      form.reset({
        nomor_surat : selectedRowDocument.nomor_surat.split("/")[0].split("-")[1],
        bagian_pengendalian : selectedRowDocument.nomor_surat.split("/")[2].split(".")[2],
        nama_dokumen : selectedRowDocument.nama_dokumen,
        jenis_dokumen : selectedRowDocument.jenis_dokumen,
        clientId : +selectedRowDocument.clientId,
        tanggal_dibuat : selectedRowDocument.tanggal_dibuat.toISOString().split(":")[0]
      })
    }

    return () => {
      document.body.style.overflow = "auto"; // jaga-jaga kalau komponen unmount
    };
  }, [isOpenEditDocument,selectedRowDocument,form]);

  if (!isOpenEditDocument) return null;

  return (
    <> {isOpenEditDocument && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-scroll" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          onClick={closeModalEditDocument}
        >
          <div className="bg-gray-400 p-[2rem] rounded-md w-[40%] shadow-lg mt-[6rem]"
            onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation() }
          >
            <div className="flex flex-row justify-between pb-[1rem]">
              <h1 className="text-[1.5rem] font-bold">Edit Document</h1>
              <button onClick={closeModalEditDocument} className="w-fit">
                <Image
                  src={"/closeIcon.svg"}
                  alt={"Close Icon"}
                  width={20}
                  height={20}
                />
              </button>    
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <h1 className="">Nomor Surat</h1>
                <div className="flex flex-row justify-baseline items-center gap-x-2">
                  <h1 className="w-fit h-9 py-1 px-[0.5rem] border rounded-md">B-</h1>
                  <FormField
                    control={form.control}
                    name="nomor_surat"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="545a" {...field} type="number" min={0} className="w-[5rem]"/>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <h1 className="w-fit h-9 py-1 px-[0.5rem] border rounded-md">/Balmon.15</h1>
                  <h1 className="w-fit h-9 py-1 px-[0.5rem] border rounded-md">/SP.03</h1>
                  <FormField
                    control={form.control}
                    name="bagian_pengendalian"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <select 
                            id="service"
                            {...field}
                            className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-[4rem] min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
                                    focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                                      aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                          >
                              <option></option>
                              <option>01</option>
                              <option>02</option>
                              <option>03</option>
                              <option>04</option>
                              <option>05</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <h1 className="w-[5rem] h-9 py-1 px-[0.5rem] border rounded-md">{tanggalSurat}</h1>
                </div>
                <FormField
                  control={form.control}
                  name="nama_dokumen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem]">Nama Dokumen</FormLabel>
                      <FormControl>
                        <Input className="text-black" placeholder="Berita Acara Klarifikasi Pemenuhan Peraturan" {...field} />
                      </FormControl>
                      <FormMessage className="text-white" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jenis_dokumen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem]">Jenis Dokumen</FormLabel>
                      <FormControl>
                        <select 
                          id="service"
                          {...field}
                          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
                                  focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                                    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        >
                          <option>Select Option</option>
                          <option>Surat Teguran</option>
                          <option>BA Penghentian Pemancaran SFR</option>
                          <option>BA Klarifikasi Kesanggupan Pemenuhan PP</option>
                          <option>BA Pengamanan APT</option>
                          <option>BA Pemeriksaan (Remote Site)</option>
                          <option>BA Pemeriksaan (Open Shelter)</option>
                          <option>Surat Pemberitahuan Penetapan Denda (SPPD)</option>
                        </select>
                      </FormControl>
                      <FormMessage className="text-white"/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem]">URL</FormLabel>
                      <FormControl>
                        <Input className="text-black" placeholder="https://balmonjambi/folder/dokumen-penertiban" {...field} />
                      </FormControl>
                      <FormMessage className="text-white" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dinas_frekuensi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem]">Dinas Frekuensi</FormLabel>
                      <FormControl>
                        <select 
                          id="service"
                          {...field}
                          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
                                  focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                                    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        >
                          <option>Select Option</option>
                          <option>Standard</option>
                          <option>Maritime</option>
                          <option>FM/AM/DVB-T</option>
                          <option>Amatir</option>
                          <option>Trunking</option>
                          <option>Point to Point</option>
                          <option>Free to Air/Unlicensed</option>
                        </select>
                      </FormControl>
                      <FormMessage className="text-white"/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem]">ClientId</FormLabel>
                      <FormControl>
                        <select 
                          id="service"
                          {...field}
                          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
                                  focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                                    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        > <option>Select Option</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>{client.nama_client}</option>
                        ))
                        }
                        </select>
                      </FormControl>
                      <FormMessage className="text-white" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tanggal_dibuat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem]">Tanggal Dibuat</FormLabel>
                      <FormControl>
                        <Input className="text-black" type="date" placeholder="shadcn" {...field} 
                          onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                            field.onChange(e);
                            const date = new Date(e.target.value);
                            if(!isNaN(date.getTime())) {
                              const month = String(date.getMonth() + 1).padStart(2,"0");
                              const year = date.getFullYear();
                              setTanggalSurat(`/${month}/${year}`)
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-white" />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
       )}
    </>
  )
}
