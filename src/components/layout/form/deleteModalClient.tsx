import { Button } from "@/components/ui/button";
import { useEditClient } from "@/context/clientContext";
import { useModal } from "@/context/modalContext";
import { useToast } from "@/context/toastContext";
import supabase from "@/lib/db";
import { useEffect } from "react";

const DeleteModalClient = () => {
    const { isOpenDeleteClient, closeModalDeleteClient} = useModal();
    const {selectedRowClient} = useEditClient();
    const {setIsOpenToast, setDuration, setMessage, setType} = useToast();

      
    useEffect(() => {
        if (isOpenDeleteClient) {
          document.body.style.overflow = "hidden"; // matikan scroll
        } else {
          document.body.style.overflow = "auto"; // aktifkan scroll
        }
        console.log(isOpenDeleteClient)
        return () => {
          document.body.style.overflow = "auto"; // jaga-jaga kalau komponen unmount
        };
        
      }, [isOpenDeleteClient]);
    
      if (!isOpenDeleteClient) return null;
    
      const deleteClient = async(id : string) => {
        console.log(selectedRowClient?.client_id);
        const {error} = await supabase.from("Client").delete().eq("id", id);
        
        setIsOpenToast()
        if(error) {
            setMessage(error.details);
            setType("error");
        } else {
            setMessage(`delete client ${selectedRowClient?.nama_client} berhasil`);
            setDuration(2000);
            setType("success");
        }
      }
    

    return (
        <>  
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                onClick={closeModalDeleteClient}
            >
                <div className="bg-gray-400 p-[2rem] rounded-md w-[25rem] shadow-lg"
                onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation() }
                >  
                    <h2>Apakah anda yakin untuk menghapus client dengan nama 
                    <span className="font-bold"> {selectedRowClient?.nama_client}</span>  ?
                    </h2>
                    <div className="flex flex-row justify-around mt-[3rem]">
                        <Button className="w-[5rem] bg-red-600" variant="destructive"
                            onClick={async() => {
                                deleteClient(selectedRowClient?.client_id as string);
                                closeModalDeleteClient();
                            }}
                        >
                            Iya
                        </Button>
                        <Button className="w-[5rem]" variant="secondary"
                            onClick={closeModalDeleteClient}
                        >
                            Tidak
                        </Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DeleteModalClient;