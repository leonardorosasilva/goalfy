import axios from 'axios';

export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const cepApi = {
  getAddressByCep: async (cep: string): Promise<CepResponse | null> => {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      if (cleanCep.length !== 8) {
        return null;
      }

      const response = await axios.get<CepResponse>(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );

      if (response.data.erro) {
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching CEP:', error);
      return null;
    }
  },
};

