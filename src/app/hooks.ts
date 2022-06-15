import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Cart } from '../features/shop/shopSlice';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAllCarts = () =>
  useAppSelector((state) =>
    state.shop.carts.ids
      .map((id) => state.shop.carts.entities[id])
      .filter((cart): cart is Cart => !!cart)
  );
