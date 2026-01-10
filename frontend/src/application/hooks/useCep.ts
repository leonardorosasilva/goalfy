import { useState, useCallback } from 'react';
import { cepApi } from '../../infrastructure/api/cepApi';
import type { CepResponse } from '../../infrastructure/api/cepApi';

export const useCep = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddressByCep = useCallback(async (cep: string): Promise<CepResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await cepApi.getAddressByCep(cep);
      if (!data) {
        setError('CEP não encontrado');
        return null;
      }
      return data;
    } catch (err) {
      setError('Erro ao buscar CEP');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchAddressByCep,
    loading,
    error,
  };
};

