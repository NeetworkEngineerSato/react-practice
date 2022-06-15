import React from 'react';
import { Container } from '@mui/system';
import { Shop } from './features/shop/Shop';

function App() {
  return (
    <Container maxWidth="sm" sx={{ paddingX: '0px' }}>
      <Shop />
    </Container>
  );
}

export default App;
