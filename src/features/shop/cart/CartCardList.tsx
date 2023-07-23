import { Stack } from '@mui/material';
import React from 'react';
import { useAllCarts, useAppDispatch } from '../../../app/hooks';
import { CartCard } from './CartCard';
import { SortableItem } from '../../dnd/SortableItem';
import { SortableArea } from '../../dnd/SortableArea';
import { cartDragEnded } from '../shopSlice';

export function CartCardList() {
  const carts = useAllCarts();
  const dispatch = useAppDispatch();

  return (
    <SortableArea
      items={carts}
      onDragEnd={(e) => {
        const { active, over } = e;
        if (over !== null) {
          dispatch(cartDragEnded({ activeID: active.id, overID: over.id }));
        }
      }}
    >
      <Stack my={2} spacing={2}>
        {carts.map((cart) => (
          <SortableItem key={cart.id} id={cart.id as string}>
            <CartCard cart={cart} />
          </SortableItem>
        ))}
      </Stack>
    </SortableArea>
  );
}
