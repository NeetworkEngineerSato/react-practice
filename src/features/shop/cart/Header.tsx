import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

export function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Manual Shopping Cart
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
