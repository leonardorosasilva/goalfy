import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';
import type { ClientFormData } from '../../../domain/entities/Client';
import { ValidationService } from '../../../domain/services/validationService';
import { useCep } from '../../../application/hooks/useCep';

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const HeaderIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  
  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 12px;
  color: #999999;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.error : 'transparent')};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: #F5F5F5;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.primary)};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::placeholder {
    color: #999999;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ModalFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientFormData) => Promise<void>;
  initialData?: ClientFormData;
}

const SquareArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M15 9L21 3M21 3H15M21 3V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const getInputIcon = (fieldName: string): React.ReactNode => {
  switch (fieldName) {
    case 'name':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    case 'email':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
          <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    case 'telephone':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'cnpj':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
          <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
          <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    case 'address':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    default:
      return '📍';
  }
};

export const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    telephone: '',
    cnpj: '',
    cep: '',
    address: '',
    city: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchAddressByCep } = useCep();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        email: '',
        telephone: '',
        cnpj: '',
        cep: '',
        address: '',
        city: '',
      });
    }
    setErrors({});
  }, [isOpen, initialData]);

  // Handler para campo de endereço
  const handleAddressInput = (value: string) => {
    handleChange('address', value);
  };

  // Quando perder foco no endereço, tentar extrair e buscar CEP
  const handleAddressBlur = async () => {
    if (formData.address) {
      // Tentar extrair CEP do endereço (formato: 12345-678 ou 12345678)
      const cepMatch = formData.address.match(/\b(\d{5}-?\d{3})\b/);
      if (cepMatch) {
        const cep = cepMatch[1].replace(/-/g, '');
        if (ValidationService.validateCEP(cep) && cep !== formData.cep) {
          const cepData = await fetchAddressByCep(cep);
          if (cepData) {
            const addressWithoutCep = formData.address.replace(/\b\d{5}-?\d{3}\b/, '').trim();
            const fullAddress = cepData.logradouro 
              ? (addressWithoutCep ? `${cepData.logradouro}, ${addressWithoutCep}` : cepData.logradouro)
              : formData.address;
            
            setFormData((prev) => ({
              ...prev,
              cep: cep,
              city: cepData.localidade || prev.city,
              address: fullAddress,
            }));
          }
        }
      }
    }
  };

  const handleCepBlur = async () => {
    if (formData.cep && ValidationService.validateCEP(formData.cep)) {
      const cepData = await fetchAddressByCep(formData.cep);
      if (cepData) {
        setFormData((prev) => ({
          ...prev,
          address: cepData.logradouro ? (prev.address || cepData.logradouro) : prev.address,
          city: cepData.localidade || prev.city,
        }));
      }
    }
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Garantir que CEP e Cidade tenham valores padrão se vazios
    const dataToSubmit = {
      ...formData,
      cep: formData.cep || '',
      city: formData.city || '',
    };
    
    const validation = ValidationService.validateClientForm(dataToSubmit);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(dataToSubmit);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ClientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderLeft>
            <HeaderIcon>
              <SquareArrowIcon />
            </HeaderIcon>
            <ModalTitle>Novo Cliente</ModalTitle>
          </HeaderLeft>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nome do Cliente</Label>
              <InputContainer>
                <InputIcon>{getInputIcon('name')}</InputIcon>
                <Input
                  type="text"
                  placeholder="Digite aqui..."
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  $hasError={!!errors.name}
                />
              </InputContainer>
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <InputContainer>
                <InputIcon>{getInputIcon('email')}</InputIcon>
                <Input
                  type="email"
                  placeholder="Digite aqui..."
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  $hasError={!!errors.email}
                />
              </InputContainer>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Telefone</Label>
              <InputContainer>
                <InputIcon>{getInputIcon('telephone')}</InputIcon>
                <Input
                  type="tel"
                  placeholder="Digite aqui..."
                  value={formData.telephone}
                  onChange={(e) => handleChange('telephone', e.target.value)}
                  $hasError={!!errors.telephone}
                />
              </InputContainer>
              {errors.telephone && <ErrorMessage>{errors.telephone}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>CNPJ</Label>
              <InputContainer>
                <InputIcon>{getInputIcon('cnpj')}</InputIcon>
                <Input
                  type="text"
                  placeholder="Digite aqui..."
                  value={formData.cnpj}
                  onChange={(e) => handleChange('cnpj', e.target.value)}
                  $hasError={!!errors.cnpj}
                />
              </InputContainer>
              {errors.cnpj && <ErrorMessage>{errors.cnpj}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Endereço</Label>
              <InputContainer>
                <InputIcon>{getInputIcon('address')}</InputIcon>
                <Input
                  type="text"
                  placeholder="Digite aqui..."
                  value={formData.address}
                  onChange={(e) => handleAddressInput(e.target.value)}
                  onBlur={handleAddressBlur}
                  $hasError={!!errors.address}
                />
              </InputContainer>
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </FormGroup>

            {/* Campo CEP oculto mas funcional - será preenchido automaticamente pelo endereço */}
            <FormGroup style={{ display: 'none' }}>
              <Label>CEP</Label>
              <InputContainer>
                <InputIcon>{getInputIcon('address')}</InputIcon>
                <Input
                  type="text"
                  placeholder="Digite aqui..."
                  value={formData.cep}
                  onChange={(e) => handleChange('cep', e.target.value)}
                  onBlur={handleCepBlur}
                  $hasError={!!errors.cep}
                />
              </InputContainer>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <SubmitButton type="button" disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? 'Salvando...' : 'Novo Registro'}
          </SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

