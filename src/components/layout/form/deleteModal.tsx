import { Button } from "@/components/ui/button";
import { useEditClient } from "@/context/clientContext";
import { useModal } from "@/context/modalContext";
import { useEffect } from "react";

const DeleteModal = () => {
    const {isOpenDeleteClient,closeModalDeleteClient, isOpenDeleteDocument, closeModalDeleteDocument} = useModal();
    const {selectedRow} = useEditClient();

    useEffect(() => {
        if (isOpenDeleteClient) {
          document.body.style.overflow = "hidden"; // matikan scroll
        } else {
          document.body.style.overflow = "auto"; // aktifkan scroll
        }
        return () => {
          document.body.style.overflow = "auto"; // jaga-jaga kalau komponen unmount
        };
        
      }, [isOpenDeleteClient]);
    
      if (!isOpenDeleteClient) return null;
    

    return (
        <> {isOpenDeleteClient && (
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                onClick={closeModalDeleteClient}
            >
                <div className="bg-gray-500 p-[2rem] rounded-md w-[25rem] shadow-lg"
                onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation() }
                >  
                    <h2>Apakah anda yakin untuk menghapus client dengan nama 
                       <span className="font-bold"> {selectedRow?.nama_perusahaan}</span>  ?
                    </h2>
                    <div className="flex flex-row justify-around mt-[3rem]">
                        <Button className="w-[5rem] bg-red-600" variant="destructive"
                            onClick={closeModalDeleteClient}
                        >
                            Iya
                        </Button>
                        <Button className="w-[5rem] bg-amber-600" variant="secondary"
                            onClick={closeModalDeleteClient}
                        >
                            Tidak
                        </Button>
                    </div>
                </div>

            </div>
        )}

        {isOpenDeleteDocument && (
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                onClick={closeModalDeleteDocument}
            >
                <div className="bg-gray-500 p-[2rem] rounded-md w-[25rem] shadow-lg"
                onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation() }
                >  
                    <h2>Apakah anda yakin untuk menghapus dokumen dengan nama 
                       <span className="font-bold"> Berita Acara Penertiban</span>  ?
                    </h2>
                    <div className="flex flex-row justify-around mt-[3rem]">
                        <Button className="w-[5rem] bg-red-600" variant="destructive"
                            onClick={closeModalDeleteDocument}
                        >
                            Iya
                        </Button>
                        <Button className="w-[5rem] bg-amber-600" variant="secondary"
                            onClick={closeModalDeleteDocument}
                        >
                            Tidak
                        </Button>
                    </div>
                </div>

            </div>
        )}
       
        </>
    )
}

export default DeleteModal;