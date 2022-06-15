import { Stack } from '@mui/material';
import React from 'react';
import { useAllCarts } from '../../../app/hooks';
import { CartCardMemo } from './CartCard';

export function CartCardList() {
  const carts = useAllCarts();

  return (
    <Stack my={2} spacing={2}>
      {carts.map((cart) => (
        <CartCardMemo key={cart.id} cart={cart} />
      ))}
    </Stack>
  );
}
