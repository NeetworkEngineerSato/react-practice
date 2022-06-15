import React from 'react';
import { Footer } from '../Footer';
import { cartAdded } from '../shopSlice';
import { CartCardList } from './CartCardList';
import { Header } from './Header';

export function CartList() {
  return (
    <>
      <Header />
      <CartCardList />
      <Footer addButtonAction={cartAdded()} />
    </>
  );
}
