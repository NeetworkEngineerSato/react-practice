import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, IconButton, Stack, TextField } from '@mui/material';
import { EntityId } from '@reduxjs/toolkit';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { Cart, cartDeleted, cartUpdated } from '../shopSlice';

export const CartCardMemo = React.memo(CartCard);

export function CartCard(props: { cart: Cart }) {
  const cart = props.cart;

  return (
    <Card>
      <CardContent>
        <TitleField cartId={cart.id} cartTitle={cart.title} />
      </CardContent>

      <CardContent>
        <Stack direction="row" justifyContent="space-evenly">
          <EditButton cartId={cart.id} />
          <DeleteButton cartId={cart.id} />
          <EditButton cartId={cart.id} />
        </Stack>
      </CardContent>
    </Card>
  );
}

function TitleField(props: { cartId: EntityId; cartTitle: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <TextField
      label="Title"
      defaultValue={props.cartTitle}
      onChange={(e) =>
        dispatch(
          cartUpdated({
            id: props.cartId,
            changes: { title: e.target.value },
          })
        )
      }
      onKeyUp={(e) => {
        if (e.key.toLowerCase() === 'enter') {
          navigate(`/${props.cartId}`);
        }
      }}
      onFocus={(e) => e.target.select()}
      fullWidth
    />
  );
}

function EditButton(props: { cartId: EntityId }) {
  const navigate = useNavigate();

  return (
    <IconButton onClick={() => navigate(`/${props.cartId}`)}>
      <EditIcon fontSize="large" color="disabled" />
    </IconButton>
  );
}

function DeleteButton(props: { cartId: EntityId }) {
  const dispatch = useAppDispatch();

  return (
    <IconButton onClick={() => dispatch(cartDeleted({ id: props.cartId }))}>
      <DeleteIcon fontSize="large" color="disabled" />
    </IconButton>
  );
}
