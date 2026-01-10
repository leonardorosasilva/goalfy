import React from 'react';
import styled from 'styled-components';
import type { Client } from '../../../domain/entities/Client';

const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  overflow: hidden;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.colors.background};
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<{ $isHighlighted?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme, $isHighlighted }) =>
    $isHighlighted ? '#F8F9FA' : theme.colors.white};
  transition: background-color 0.2s;

  &:hover:not(:last-child) {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

interface ClientTableProps {
  clients: Client[];
  loading?: boolean;
}

export const ClientTable: React.FC<ClientTableProps> = ({ clients, loading }) => {
  if (loading) {
    return (
      <TableContainer>
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          Carregando...
        </div>
      </TableContainer>
    );
  }

  if (clients.length === 0) {
    return (
      <TableContainer>
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          Nenhum cliente encontrado
        </div>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Nome do Cliente</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Telefone</TableHeaderCell>
            <TableHeaderCell>CNPJ</TableHeaderCell>
            <TableHeaderCell>Endereço</TableHeaderCell>
            <TableHeaderCell>Cidade</TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {clients.map((client, index) => {
            const isLastRow = index === clients.length - 1;
            return (
              <TableRow key={client.id} $isHighlighted={isLastRow}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.telephone}</TableCell>
                <TableCell>{client.cnpj}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>{client.city}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

