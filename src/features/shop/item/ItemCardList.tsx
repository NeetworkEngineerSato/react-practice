import { Stack } from '@mui/material';
import { Item } from '../shopSlice';
import { ItemCardMemo } from './ItemCard';
import React, { useEffect } from 'react';

export function ItemCardList(props: { items: Item[] }) {
  useEffect(() => document.querySelector('input')?.focus(), []);

  return (
    <Stack my={2} spacing={2}>
      {props.items.map((item) => (
        <ItemCardMemo key={item.id} item={item} />
      ))}
    </Stack>
  );
}
