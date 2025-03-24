import React, { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { App } from './App';
import './index.css';
import '@mantine/dates/styles.css';

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
);
