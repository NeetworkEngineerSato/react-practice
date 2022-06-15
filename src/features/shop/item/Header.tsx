import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';

export function Header(props: { cartTitle: string; totalPrice: string }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.cartTitle || 'No Title'}
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <ShoppingCartIcon fontSize="large" />
          <Typography variant="h5">{props.totalPrice}</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
