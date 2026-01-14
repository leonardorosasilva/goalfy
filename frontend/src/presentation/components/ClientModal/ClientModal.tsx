import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';
import type { ClientFormData } from '../../../domain/entities/Client';
import { ValidationService } from '../../../domain/services/validationService';
import { useCep } from '../../../application/hooks/useCep';
import { 
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoDocumentTextOutline,
  IoLocationOutline,
} from "react-icons/io5";
import Registro from '../../../assets/reg.png';

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
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  justify-content: flex-end;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const HeaderIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  
  svg {
    color: currentColor;
  }
`;

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.spacing.xl};
  font-weight: 500;
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
  font-weight: bold;
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



const getInputIcon = (fieldName: string): React.ReactNode => {
  switch (fieldName) {
    case 'name':
      return <IoPersonOutline size={18} />;
    case 'email':
      return <IoMailOutline size={18} />;
    case 'telephone':
      return <IoCallOutline size={18} />;
    case 'cnpj':
      return <IoDocumentTextOutline size={18} />;
    case 'address':
      return <IoLocationOutline size={18} />;
    default:
      return <IoLocationOutline size={18} />;
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

  const handleAddressInput = (value: string) => {
    handleChange('address', value);
  };

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
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
          <HeaderLeft style={{ paddingLeft: '24px', paddingTop: '24px' }}>
            <HeaderIcon>
            <img src={Registro} alt="Document Icon" />
            </HeaderIcon>
            <ModalTitle>Novo Cliente</ModalTitle>
          </HeaderLeft>
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

