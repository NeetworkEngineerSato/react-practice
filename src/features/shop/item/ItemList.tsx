import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { Footer } from '../Footer';
import { getActiveTotalPrice, Item, itemAdded } from '../shopSlice';
import { Header } from './Header';
import { ItemCardList } from './ItemCardList';
import React from 'react';

export function ItemList() {
  const state = useAppSelector((state) => state);
  const { cartId } = useParams<{ cartId: string }>();

  if (!cartId) {
    return <Navigate to="/" />;
  }

  const cart = state.shop.carts.entities[cartId];

  if (!cart) {
    return <Navigate to="/" />;
  }

  const items = cart.itemIds
    .map((id) => state.shop.items.entities[id])
    .filter((item): item is Item => !!item);

  return (
    <>
      <Header
        cartTitle={cart.title}
        totalPrice={getActiveTotalPrice(...items)}
      />
      <ItemCardList items={items} />
      <Footer addButtonAction={itemAdded({ cartId })} />
    </>
  );
}
