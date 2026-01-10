import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header/Header';
import { ActionBar } from '../components/ActionBar/ActionBar';
import { ClientTable } from '../components/ClientTable/ClientTable';
import { ClientModal } from '../components/ClientModal/ClientModal';
import { useClientContext } from '../contexts/ClientContext';
import type { ClientFormData } from '../../domain/entities/Client';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ClientRegisterPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    clients,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    createClient,
  } = useClientContext();

  const handleCreateClient = async (data: ClientFormData) => {
    await createClient(data);
  };

  return (
    <PageContainer>
      <Header />
      <ActionBar
        onNewClient={() => setIsModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        recordsCount={clients.length}
      />
      {error && (
        <div style={{ padding: '16px', backgroundColor: '#fee', color: '#c00', textAlign: 'center' }}>
          {error}
        </div>
      )}
      <ClientTable clients={clients} loading={loading} />
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateClient}
      />
    </PageContainer>
  );
};

