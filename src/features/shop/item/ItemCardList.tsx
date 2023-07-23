import { Stack } from '@mui/material';
import { Item, itemDragEnded } from '../shopSlice';
import { ItemCardMemo } from './ItemCard';
import React, { useEffect } from 'react';
import { SortableArea } from '../../dnd/SortableArea';
import { SortableItem } from '../../dnd/SortableItem';
import { useAppDispatch } from '../../../app/hooks';

export function ItemCardList(props: { items: Item[] }) {
  const items = props.items;
  const dispatch = useAppDispatch();
  useEffect(() => document.querySelector('input')?.focus(), []);

  return (
    <SortableArea
      items={items}
      onDragEnd={(e) => {
        const { active, over } = e;
        if (over !== null) {
          dispatch(
            itemDragEnded({
              activeID: active.id,
              overID: over.id,
              cartId: items[0].cartId,
            }),
          );
        }
      }}
    >
      <Stack my={2} spacing={2}>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id as string}>
            <ItemCardMemo item={item} />
          </SortableItem>
        ))}
      </Stack>
    </SortableArea>
  );
}
