import axios from 'axios';
import type { Client, ClientFormData } from '../../domain/entities/Client';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const clientApi = {
  getAll: async (search?: string): Promise<Client[]> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<Client[]>('/clients', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Client> => {
    const response = await apiClient.get<Client>(`/clients/${id}`);
    return response.data;
  },

  create: async (data: ClientFormData): Promise<Client> => {
    const response = await apiClient.post<Client>('/clients', data);
    return response.data;
  },

  update: async (id: number, data: ClientFormData): Promise<Client> => {
    const response = await apiClient.put<Client>(`/clients/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/clients/${id}`);
  },
};

