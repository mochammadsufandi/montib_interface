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
import supabase from "@/lib/db"
import { useToast } from "@/context/toastContext"

type DocumentInput = {
  nomor_surat : string,
  nama_dokumen : string,
  bagian_pengendalian? : string,
  jenis_dokumen : string,
  dinas_frekuensi? : string,
  url? : string,
  tanggal_dibuat : Date,
  clientId : number,
  file? : File
}

type ClientType = {
    id : string,
    nama_client : string,
    alamat_client : string,
    dinas_frekuensi : string,
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
  dinas_frekuensi: z.string().optional(),
  tanggal_dibuat: z.string(),
  clientId : z.string(),
  file : z.file().optional(),
})

export function DocumentEditForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      bagian_pengendalian:"",
      nama_dokumen: "",
      jenis_dokumen: "",
    },
  })

  const {isOpenEditDocument, closeModalEditDocument} = useModal();
  const {selectedRowDocument} = useEditDocument()
  const [tanggalSurat, setTanggalSurat] = useState<string>("");
  const [clients, setClients] = useState<ClientType[]>([]);
  const [service, setService] = useState("");
  const {setIsOpenToast, setDuration, setMessage, setType} = useToast();

    async function uploadFile(file:File) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `documents/${fileName}`;
      const {error} = await supabase.storage.from("Document").upload(filePath, file);
      if(error) {
        console.log(error);
        setIsOpenToast();
        setDuration(2000);
        setMessage(error.message);
        setType("error")
      }
      return filePath;
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof documentFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const crudeParams : DocumentInput = {
      ...values,
      clientId : +values.clientId,
      nomor_surat : `B-${values.nomor_surat}/Balmon.15/SP.03.${values.bagian_pengendalian}${tanggalSurat}`,
      tanggal_dibuat : new Date(values.tanggal_dibuat)
    }
    const {bagian_pengendalian, dinas_frekuensi, file, ...documentParams} = crudeParams;
    console.log(bagian_pengendalian,dinas_frekuensi,file)
    let filePath : string | undefined = "";
    let publicUrl : string = ""
    if(crudeParams.file) {
      const oldPath = selectedRowDocument?.url.split("/Document/")[1] as string;
      const {error} = await supabase.storage.from("Document").remove([oldPath])
      if(error) {
        console.log(error)
        setIsOpenToast();
        setDuration(2000);
        setMessage(error.message);
        setType("error")
      }
      filePath = await uploadFile(crudeParams.file);  
      const {data} = supabase.storage.from("Document").getPublicUrl(filePath as string);
      publicUrl = data.publicUrl;
    } else {
      publicUrl = documentParams.url as string;
    }

    const {error} = await supabase.from("Documents").update({
    ...documentParams,
    url : publicUrl
    }).eq("id", selectedRowDocument?.document_id);
    if(error) {
        console.log(error);
        setIsOpenToast();
        setDuration(2000);
        setMessage(error.message);
        setType("error")
    } else {
        console.log(error);
        setIsOpenToast();
        setDuration(2000);
        setMessage(`Edit Document ${documentParams.nama_dokumen} Berhasil` );
        setType("success")
        form.reset({
          nama_dokumen : "",
          nomor_surat : "",
          bagian_pengendalian : "",
          jenis_dokumen : "",
          file : undefined,
          dinas_frekuensi : "",
          clientId : "",
          tanggal_dibuat : ""
        })
    }

  }

  useEffect(() => {
    if (isOpenEditDocument) {
      document.body.style.overflow = "hidden"; // matikan scroll
    } else {
      document.body.style.overflow = "auto"; // aktifkan scroll
    }
    console.log(selectedRowDocument)
    if(selectedRowDocument) {
      const arrayDate = selectedRowDocument.tanggal_dibuat.toLocaleDateString().split("/");
      const day = arrayDate[0].padStart(2,"0");
      const month = arrayDate[1].padStart(2,"0");
      const year = arrayDate[2];
      const formatDate = `${year}-${day}-${month}`;
      form.reset({
        nomor_surat : selectedRowDocument.nomor_surat.split("/")[0].split("-")[1],
        bagian_pengendalian : selectedRowDocument.nomor_surat.split("/")[2].split(".")[2],
        nama_dokumen : selectedRowDocument.nama_dokumen,
        jenis_dokumen : selectedRowDocument.jenis_dokumen,
        clientId : selectedRowDocument.clientId,
        tanggal_dibuat : formatDate
      })
      const date = new Date(selectedRowDocument.tanggal_dibuat.toLocaleDateString())

      if(!isNaN(date.getTime())) {
        const month = String(date.getMonth() + 1).padStart(2,"0");
        const year = date.getFullYear();
        setTanggalSurat(`/${month}/${year}`)
      }
    }

      const fetchClient = async() => {
      const {data,error} = await supabase.from("Client").select("*").eq("dinas_frekuensi", service)
        if(error) {
          console.log(error)
        } else {
          const formattedData = data.map((item) => ({
                    ...item,
                    id : (item.id as number).toString(),    
                    tanggal_dibuat : new Date(item.tanggal_dibuat),
                }));
          setClients(formattedData);
        }
    }
    fetchClient();

    return () => {
      document.body.style.overflow = "auto"; // jaga-jaga kalau komponen unmount
    };
  }, [isOpenEditDocument,selectedRowDocument,form, service, ]);

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
                          <Input placeholder="545a" {...field}  className="w-[5rem]"/>
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
                          <option>Undangan Klarifikasi</option>
                          <option>BA Klarifikasi/Verifikasi APT</option>
                          <option>Surat Teguran</option>
                          <option>BA Penghentian Pemancaran SFR</option>
                          <option>BA Klarifikasi Kesanggupan Pemenuhan PP</option>
                          <option>BA Pengamanan APT</option>
                          <option>BA Serah Terima APT</option>
                          <option>BA Pemeriksaan (Remote Site)</option>
                          <option>BA Pemeriksaan (Open Shelter)</option>
                          <option>Risalah Hasil Pemeriksaan Stasiun Radio</option>
                          <option>BA Pemeriksaan APT</option>
                          <option>Surat Pemberitahuan Penetapan Denda (SPPD)</option>
                        </select>
                      </FormControl>
                      <FormMessage className="text-white"/>
                    </FormItem>
                  )}
                />
               <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem]">File</FormLabel>
                      <FormControl>
                        <Input 
                          className="text-black" 
                          type="file" 
                          name ={field.name} 
                          required={false}
                          placeholder="https://balmonjambi/folder/dokumen-penertiban"
                          onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            field.onChange(file)
                          }} 
                        />
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
                            onChange={(e : React.ChangeEvent<HTMLSelectElement>) => {
                              const value = e.target.value;
                              field.onChange(value);
                              setService(e.target.value);
                            }} 
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
                            <option>Toko APT</option>
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
