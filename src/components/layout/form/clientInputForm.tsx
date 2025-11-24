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
import { useEffect } from "react"
import supabase from "@/lib/db"
import { useToast } from "@/context/toastContext"
import { useEditClient } from "@/context/clientContext"

const clientFormSchema = z.object({
  nama_client: z.string().min(2, {
    message: "nama client minimal 2 karakter.",
  }),
  alamat_client: z.string().min(5, {
    message : "alamat minimal 5 karakter"
  }),
  dinas_frekuensi : z.string()
})

export function ClientInputForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      nama_client: "",
      alamat_client: "",
      dinas_frekuensi: ""
    },
  })

  const {isOpenInputClient, closeModalInputClient} = useModal();
  const {setIsOpenToast, setMessage, setDuration, setType} = useToast();
  const {setService,service} = useEditClient();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof clientFormSchema>) {
    const {error} = await supabase.from("Client").insert({
      ...values
    })
    setIsOpenToast();
    if(error) {
      setType("error");
      setMessage(error.message);
      setDuration(2000);
    } else {
      setType("success");
      setMessage(`Client ${values.nama_client} berhasil ditambahkan`);
      setDuration(2000);
      setService(service);
      form.reset({
        nama_client : "",
        alamat_client : "",
        dinas_frekuensi : ""
      })
    }
  }

  useEffect(() => {
    if (isOpenInputClient) {
      document.body.style.overflow = "hidden"; // matikan scroll
    } else {
      document.body.style.overflow = "auto"; // aktifkan scroll
    }
    console.log(isOpenInputClient)

    return () => {
      document.body.style.overflow = "auto"; // jaga-jaga kalau komponen unmount
    };
  }, [isOpenInputClient]);

  if (!isOpenInputClient) return null;

  return (
    <> {isOpenInputClient && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          onClick={closeModalInputClient}
        >
          <div className="bg-gray-400 p-[2rem] rounded-md w-[30%] shadow-lg"
            onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation() }
          >
            <div className="flex flex-row justify-between pb-[1rem]">
               <h1 className="text-[1.5rem] font-bold">Input Client</h1>
              <button onClick={closeModalInputClient} className="w-fit">
                <Image
                  src={"/closeIcon.svg"}
                  alt={"Close Icon"}
                  width={20}
                  height={20}
                />
              </button>    
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="nama_client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem]">Nama Client</FormLabel>
                      <FormControl>
                        <Input placeholder="Telkomsel, PT" {...field} />
                      </FormControl>
                      <FormMessage className="text-white"/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alamat_client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem]">Alamat Client</FormLabel>
                      <FormControl>
                        <Input className="text-black" placeholder="Jalan Raya Tangkit No 1, Kabupaten Muaro Jambi" {...field} />
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
                          <option>Toko APT</option>
                        </select>
                      </FormControl>
                      <FormMessage className="text-white"/>
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
