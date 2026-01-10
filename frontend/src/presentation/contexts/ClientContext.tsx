import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useClients } from '../../application/hooks/useClients';
import type { Client, ClientFormData } from '../../domain/entities/Client';

interface ClientContextType {
  clients: Client[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  createClient: (data: ClientFormData) => Promise<Client>;
  updateClient: (id: number, data: ClientFormData) => Promise<Client>;
  deleteClient: (id: number) => Promise<void>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const clientsData = useClients();

  return <ClientContext.Provider value={clientsData}>{children}</ClientContext.Provider>;
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
};

