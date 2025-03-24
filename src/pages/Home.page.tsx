import React from 'react';
import { Button } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';

export const HomePage = () => {
  return (
    <div>
      <h1>My awesome short url</h1>
      <NavLink to={routes.create}>
        <Button fullWidth mb="md">
          Create short url
        </Button>
      </NavLink>
      <NavLink to={routes.panel}>
        <Button fullWidth>Manage short urls</Button>
      </NavLink>
    </div>
  );
};
