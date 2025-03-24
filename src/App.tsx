import React from 'react';
import { MantineProvider } from '@mantine/core';
import { ToastContainer } from 'react-toastify';

import { Router } from './Router';

import './App.css';
import '@mantine/core/styles.css';
import { Header } from './components/Header';

export const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Router />
      <ToastContainer />
    </MantineProvider>
  );
};
