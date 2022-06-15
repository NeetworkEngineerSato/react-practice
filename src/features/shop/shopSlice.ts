import {
  createEntityAdapter,
  createSlice,
  EntityId,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';

export type Cart = {
  id: EntityId;
  title: string;
  itemIds: EntityId[];
};

export type Item = {
  id: EntityId;
  name: string;
  price: string;
  quantity: string;
  isActive: boolean;
  cartId: EntityId;
};

const cartAdapter = createEntityAdapter<Cart>();
const itemAdapter = createEntityAdapter<Item>();

const initialState = {
  carts: cartAdapter.getInitialState(),
  items: itemAdapter.getInitialState(),
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    cartAdded: (state) => {
      const cart = newCart();

      for (let i = 0; i < 5; i++) {
        const item = newItem(cart.id);
        cart.itemIds.push(item.id);
        itemAdapter.addOne(state.items, item);
      }

      cartAdapter.addOne(state.carts, cart);
    },
    cartUpdated: (
      state,
      action: PayloadAction<{ id: EntityId; changes: Partial<Cart> }>
    ) => {
      cartAdapter.updateOne(state.carts, action);
    },
    cartDeleted: (state, action: PayloadAction<{ id: EntityId }>) => {
      const cart = state.carts.entities[action.payload.id];

      if (!cart) {
        return;
      }

      itemAdapter.removeMany(state.items, cart.itemIds);
      cartAdapter.removeOne(state.carts, cart.id);
    },
    itemAdded: (state, action: PayloadAction<{ cartId: EntityId }>) => {
      const cart = state.carts.entities[action.payload.cartId];

      if (!cart) {
        return;
      }

      const item = newItem(cart.id);
      cart.itemIds.push(item.id);
      itemAdapter.addOne(state.items, item);
    },
    itemUpdated: (
      state,
      action: PayloadAction<{ id: EntityId; changes: Partial<Item> }>
    ) => {
      itemAdapter.updateOne(state.items, action);
    },
    itemDeleted: (state, action: PayloadAction<{ id: EntityId }>) => {
      const item = state.items.entities[action.payload.id];

      if (!item) {
        return;
      }

      itemAdapter.removeOne(state.items, item.id);

      const cart = state.carts.entities[item.cartId];

      if (!cart) {
        return;
      }

      cart.itemIds = cart.itemIds.filter((itemId) => itemId !== item.id);
    },
  },
});

export const {
  cartAdded,
  cartUpdated,
  cartDeleted,
  itemAdded,
  itemUpdated,
  itemDeleted,
} = shopSlice.actions;

export default shopSlice.reducer;

function newCart(): Cart {
  return { id: nanoid(), title: '', itemIds: [] };
}

function newItem(cartId: EntityId): Item {
  return {
    id: nanoid(),
    name: '',
    price: '',
    quantity: '1',
    isActive: true,
    cartId,
  };
}

export function getActiveTotalPrice(...items: Item[]): string {
  return getTotalPrice(...items.filter((item) => item.isActive));
}

export function getTotalPrice(...items: Item[]): string {
  const validValueItems = items.filter(
    (item) =>
      !new BigNumber(item.price).isNaN() &&
      !new BigNumber(item.quantity).isNaN()
  );

  if (validValueItems.length === 0) {
    return '0';
  }

  return validValueItems
    .map((item) => new BigNumber(item.price).times(item.quantity))
    .reduce((subtotal1, subtotal2) => subtotal1.plus(subtotal2))
    .toFormat();
}
