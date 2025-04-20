import React from 'react';
import styled from 'styled-components';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.errorLight};
  color: ${props => props.theme.colors.error};
  border-radius: 4px;
  margin: 1rem 0;
`;

const ErrorIcon = styled(FaExclamationCircle)`
  font-size: 1.2rem;
`;

const ErrorMessage = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorIcon />
      <span>{message}</span>
    </ErrorContainer>
  );
};

export default ErrorMessage; 