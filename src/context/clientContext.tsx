"use client";

import React, { createContext, useContext, useState } from "react";
import {ClientDataType} from "@/pages/service"


type ClientContextType = {
  selectedRow: ClientDataType | null;
  setSelectedRow: (row: ClientDataType | null) => void;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRow, setSelectedRow] = useState<ClientDataType | null>(null);

  return (
    <ClientContext.Provider value={{ selectedRow, setSelectedRow }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useEditClient = () => {
  const context = useContext(ClientContext);
  if (!context) throw new Error("useEditClient must be used within ClientProvider");
  return context;
};
