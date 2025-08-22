"use client";

import React, { createContext, useContext, useState } from "react";
import {ClientDataType} from "@/pages/service"


type ClientContextType = {
  selectedRowClient: ClientDataType | null;
  setSelectedRowClient: (row: ClientDataType | null) => void;
  service : string,
  setService : (params : string) => void;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRowClient, setSelectedRowClient] = useState<ClientDataType | null>(null);
  const [service, setService] = useState<string>("");

  return (
    <ClientContext.Provider value={{ selectedRowClient, setSelectedRowClient, service, setService }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useEditClient = () => {
  const context = useContext(ClientContext);
  if (!context) throw new Error("useEditClient must be used within ClientProvider");
  return context;
};
