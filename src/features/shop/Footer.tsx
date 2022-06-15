import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { Fab, Stack } from '@mui/material';
import { AnyAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import React from 'react';

export function Footer(props: { addButtonAction: AnyAction }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      sx={{ position: 'sticky', bottom: 0, pointerEvents: 'none' }}
    >
      <AddButton addButtonAction={props.addButtonAction} />
      <HomeButton />
      <AddButton addButtonAction={props.addButtonAction} />
    </Stack>
  );
}

function AddButton(props: { addButtonAction: AnyAction }) {
  const dispatch = useAppDispatch();

  return (
    <Fab
      onClick={() => dispatch(props.addButtonAction)}
      color="primary"
      aria-label="home"
      sx={{ pointerEvents: 'auto' }}
    >
      <AddIcon />
    </Fab>
  );
}

function HomeButton() {
  const navigate = useNavigate();

  return (
    <Fab
      onClick={() => navigate('/')}
      color="primary"
      aria-label="add"
      sx={{ pointerEvents: 'auto' }}
    >
      <HomeIcon />
    </Fab>
  );
}
