export class ValidationService {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateCNPJ(cnpj: string): boolean {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    return cleanCNPJ.length === 14 || cleanCNPJ.length === 11; // CNPJ or CPF
  }

  static validateCEP(cep: string): boolean {
    const cleanCEP = cep.replace(/\D/g, '');
    return cleanCEP.length === 8;
  }

  static validatePhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  }

  static validateRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  static validateClientForm(data: {
    name: string;
    email: string;
    telephone: string;
    cnpj: string;
    cep: string;
    address: string;
    city: string;
  }): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!this.validateRequired(data.name)) {
      errors.name = 'Nome do cliente é obrigatório';
    }

    if (!this.validateRequired(data.email)) {
      errors.email = 'Email é obrigatório';
    } else if (!this.validateEmail(data.email)) {
      errors.email = 'Email inválido';
    }

    if (!this.validateRequired(data.telephone)) {
      errors.telephone = 'Telefone é obrigatório';
    } else if (!this.validatePhone(data.telephone)) {
      errors.telephone = 'Telefone inválido';
    }

    if (!this.validateRequired(data.cnpj)) {
      errors.cnpj = 'CNPJ é obrigatório';
    } else if (!this.validateCNPJ(data.cnpj)) {
      errors.cnpj = 'CNPJ inválido';
    }

    if (!this.validateRequired(data.address)) {
      errors.address = 'Endereço é obrigatório';
    }

    // CEP e Cidade não são obrigatórios na validação do frontend
    // mas serão preenchidos automaticamente se possível

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

