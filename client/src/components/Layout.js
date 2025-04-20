// frontend/src/components/Layout.js
import React from 'react';
import Header from './Header';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
