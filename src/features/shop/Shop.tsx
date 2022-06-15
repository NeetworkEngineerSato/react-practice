import React from 'react';
import { Route, Routes } from 'react-router';
import { CartList } from './cart/CartList';
import { ItemList } from './item/ItemList';

export function Shop() {
  return (
    <Routes>
      <Route path="*" element={<CartList />} />
      <Route path="/:cartId" element={<ItemList />} />
    </Routes>
  );
}
