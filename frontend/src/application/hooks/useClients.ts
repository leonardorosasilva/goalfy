import { useState, useEffect, useCallback } from 'react';
import type { Client, ClientFormData } from '../../domain/entities/Client';
import { clientApi } from '../../infrastructure/api/clientApi';

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClients = useCallback(async (search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientApi.getAll(search);
      setClients(data);
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients(searchTerm);
  }, [fetchClients, searchTerm]);

  const createClient = async (data: ClientFormData): Promise<Client> => {
    setLoading(true);
    setError(null);
    try {
      const newClient = await clientApi.create(data);
      await fetchClients(searchTerm);
      return newClient;
    } catch (err) {
      const errorMessage = 'Erro ao criar cliente';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id: number, data: ClientFormData): Promise<Client> => {
    setLoading(true);
    setError(null);
    try {
      const updatedClient = await clientApi.update(id, data);
      await fetchClients(searchTerm);
      return updatedClient;
    } catch (err) {
      const errorMessage = 'Erro ao atualizar cliente';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await clientApi.delete(id);
      await fetchClients(searchTerm);
    } catch (err) {
      const errorMessage = 'Erro ao deletar cliente';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    clients,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  };
};

