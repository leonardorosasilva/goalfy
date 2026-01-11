import React from 'react';
import styled from 'styled-components';
import reg from '../../../assets/reg.png';
import { IoPersonOutline } from "react-icons/io5";


const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Logo = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: #2C3E50;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;



const Registro = () => (
  <img src={reg} alt="Document Icon" />
);

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  color: #2C3E50;
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MembersInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 13px;
  font-weight:500;
  color: #949FA6;

`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 12px;
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LeftSection>
        <Logo>Goalfy</Logo>
        <TitleSection>
          <Registro />
          <Title>Registro de Clientes</Title>
        </TitleSection>
      </LeftSection>
      <RightSection>
        <MembersInfo>
          <IoPersonOutline size={16} color="#949FA6"/> Membros(01)
        </MembersInfo>
        <Avatar>👤</Avatar>
      </RightSection>
    </HeaderContainer>
  );
};

