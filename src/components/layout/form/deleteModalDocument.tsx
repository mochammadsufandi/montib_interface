import { Button } from "@/components/ui/button";
import { useEditDocument } from "@/context/documentContext";
import { useModal } from "@/context/modalContext";
import { useToast } from "@/context/toastContext";
import supabase from "@/lib/db";
import { useEffect } from "react";

const DeleteModalDocument = () => {
    const {isOpenDeleteDocument, closeModalDeleteDocument} = useModal();
    const {selectedRowDocument} = useEditDocument();
    const {setDuration,setIsOpenToast,setMessage,setType} = useToast();

      
    useEffect(() => {
        if (isOpenDeleteDocument) {
          document.body.style.overflow = "hidden"; // matikan scroll
        } else {
          document.body.style.overflow = "auto"; // aktifkan scroll
        }
        console.log(isOpenDeleteDocument)
        return () => {
          document.body.style.overflow = "auto"; // jaga-jaga kalau komponen unmount
        };
        
      }, [isOpenDeleteDocument]);
    
      if (!isOpenDeleteDocument) return null;

    const deleteFile = async() => {
        const filePath = selectedRowDocument?.url.split("/Document/")[1] as string;
        const {error} = await supabase.storage.from("Document").remove([filePath])
         if(error) {
            console.log(error)
            setIsOpenToast();
            setDuration(2000);
            setMessage(error.message);
            setType("error")
            throw(error);
        }
    }   

    const deleteClient = async() => {
        try {
            await deleteFile();

            const {error} = await supabase.from("Documents").delete().eq("id", selectedRowDocument?.document_id);
            setIsOpenToast()
            if(error) {
                setMessage(error.details);
                setType("error");
            } else {
                setMessage(`delete client ${selectedRowDocument?.nama_dokumen} berhasil`);
                setDuration(2000);
                setType("success");
            }
        } catch (error) {
            console.log(error);
        }
      }

    return (
        <>  
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                onClick={closeModalDeleteDocument}
            >
                <div className="bg-gray-400 p-[2rem] rounded-md w-[25rem] shadow-lg"
                onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation() }
                >  
                    <h2>Apakah anda yakin untuk menghapus client dengan nama 
                    <span className="font-bold"> {selectedRowDocument?.nama_dokumen}</span>  ?
                    </h2>
                    <div className="flex flex-row justify-around mt-[3rem]">
                        <Button className="w-[5rem] bg-red-600" variant="destructive"
                            onClick={() => {
                                closeModalDeleteDocument()
                                deleteClient();
                            }}
                        >
                            Iya
                        </Button>
                        <Button className="w-[5rem]" variant="secondary"
                            onClick={closeModalDeleteDocument}
                        >
                            Tidak
                        </Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DeleteModalDocument;