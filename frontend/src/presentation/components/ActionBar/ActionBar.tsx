import React from 'react';
import styled from 'styled-components';

const ActionBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
  gap: 16px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
  max-width: 800px;
`;

const NewRegisterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const SearchInput = styled.input`
  padding: 10px 10px 10px 36px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: #F5F5F5;
  font-size: 14px;
  width: 100%;
  min-width: 300px;
  max-width: 400px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::placeholder {
    color: #999999;
  }
`;

const RecordsCount = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 14px;
`;

interface ActionBarProps {
  onNewClient: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  recordsCount: number;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  onNewClient,
  searchTerm,
  onSearchChange,
  recordsCount,
}) => {
  return (
    <ActionBarContainer>
      <LeftSection>
        <NewRegisterButton onClick={onNewClient}>
          <span>+</span>
          <span>Novo Registro</span>
        </NewRegisterButton>
        <SearchContainer>
          <SearchIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </SearchContainer>
      </LeftSection>
      <RecordsCount>{recordsCount} Registros</RecordsCount>
    </ActionBarContainer>
  );
};

