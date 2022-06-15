import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Card,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { EntityId } from '@reduxjs/toolkit';
import React, { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { getTotalPrice, Item, itemDeleted, itemUpdated } from '../shopSlice';

export const ItemCardMemo = React.memo(ItemCard);

export function ItemCard(props: { item: Item }) {
  const item = props.item;

  return (
    <Card
      sx={{
        p: 2,
        background: item.isActive ? undefined : grey[200],
      }}
    >
      <Stack spacing={2}>
        <TextFields item={item} />
        <SubTotal item={item} />
        <Buttons item={item} />
      </Stack>
    </Card>
  );
}

function TextFields(props: { item: Item }) {
  const dispatch = useAppDispatch();
  const item = props.item;

  const updateItemValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      itemUpdated({
        id: item.id,
        changes: { [e.target.name]: e.target.value },
      })
    );
  };

  const focusNextField = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key.toLowerCase() !== 'enter') {
      return;
    }

    const inputElementList = document.querySelectorAll('input');
    const textFieldArray = Array.from(inputElementList).filter(
      (element) => element.type === 'text' || element.type === 'number'
    );
    for (let i = 0; i < textFieldArray.length - 1; i++) {
      if (textFieldArray[i] === e.target) {
        textFieldArray[i + 1].focus();
        return;
      }
    }
  };

  const selectInputValue = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => e.target.select();

  const commonProps: TextFieldProps = {
    onChange: updateItemValue,
    onKeyUp: focusNextField,
    onFocus: selectInputValue,
    variant: 'outlined',
  };

  return (
    <>
      <TextField
        defaultValue={item.name}
        name="name"
        label="Name"
        {...commonProps}
      />
      <TextField
        defaultValue={item.price}
        name="price"
        label="Price"
        type="number"
        {...commonProps}
      />
      <TextField
        defaultValue={item.quantity}
        name="quantity"
        label="Quantity"
        type="number"
        {...commonProps}
      />
    </>
  );
}

function SubTotal(props: { item: Item }) {
  const item = props.item;

  return (
    <Card
      sx={{
        p: 2,
        background: item.isActive ? grey[50] : grey[200],
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Typography variant="body1" color="text.secondary" display="inline">
          Subtotal
        </Typography>
        <Typography display="inline" variant="h5">
          {getTotalPrice(item)}
        </Typography>
      </Stack>
    </Card>
  );
}

function Buttons(props: { item: Item }) {
  const item = props.item;

  return (
    <Stack direction="row" justifyContent="space-evenly">
      <ActiveButton item={item} />
      <DeleteButton itemId={item.id} />
      <ActiveButton item={item} />
    </Stack>
  );
}

function ActiveButton(props: { item: Item }) {
  const dispatch = useAppDispatch();
  const item = props.item;

  return (
    <Checkbox
      onClick={() =>
        dispatch(
          itemUpdated({
            id: item.id,
            changes: { isActive: !item.isActive },
          })
        )
      }
      checked={item.isActive}
      checkedIcon={<CheckBoxIcon fontSize="large" color="disabled" />}
      icon={<CheckBoxOutlineBlankIcon fontSize="large" color="disabled" />}
      tabIndex={-1}
    />
  );
}

function DeleteButton(props: { itemId: EntityId }) {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      onClick={() => dispatch(itemDeleted({ id: props.itemId }))}
      tabIndex={-1}
    >
      <DeleteIcon fontSize="large" color="disabled" />
    </IconButton>
  );
}
