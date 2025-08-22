import { Button } from "@/components/ui/button";
import { useEditDocument } from "@/context/documentContext";
import { useModal } from "@/context/modalContext";
import { useEffect } from "react";

const DeleteModalDocument = () => {
    const {isOpenDeleteDocument, closeModalDeleteDocument} = useModal();
    const {selectedRowDocument} = useEditDocument();

      
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
                            onClick={closeModalDeleteDocument}
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