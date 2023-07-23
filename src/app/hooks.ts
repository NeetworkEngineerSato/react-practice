import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Cart } from '../features/shop/shopSlice';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAllCarts = () => {
  const carts = useAppSelector((state) => state.shop.carts);
  return carts.ids
    .map((id) => carts.entities[id])
    .filter((cart): cart is Cart => !!cart);
};
