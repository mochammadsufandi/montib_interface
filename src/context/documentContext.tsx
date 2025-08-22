"use client";

import React, { createContext, useContext, useState } from "react";
import {DocumentDataType} from "@/pages/[nama_client]"


type ClientContextType = {
  selectedRowDocument: DocumentDataType | null;
  setSelectedRowDocument: (row: DocumentDataType | null) => void;
};

const DocumentContext = createContext<ClientContextType | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRowDocument, setSelectedRowDocument] = useState<DocumentDataType | null>(null);

  return (
    <DocumentContext.Provider value={{ selectedRowDocument, setSelectedRowDocument }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useEditDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) throw new Error("useEditDocument must be used within DocumentProvider");
  return context;
};
