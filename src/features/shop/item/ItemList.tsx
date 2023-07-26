import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { Footer } from '../Footer';
import { getActiveTotalPrice, itemAdded } from '../shopSlice';
import { Header } from './Header';
import { ItemCardList } from './ItemCardList';
import React from 'react';

export function ItemList() {
  const shop = useAppSelector((state) => state.shop);
  const { cartId } = useParams<{ cartId: string }>();

  if (!cartId) {
    return <Navigate to="/" />;
  }

  const cart = shop.carts.entities[cartId];

  if (!cart) {
    return <Navigate to="/" />;
  }

  const items = cart.itemIds
    .map((id) => shop.items.entities[id])
    .flatMap((item) => item ?? []);

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
