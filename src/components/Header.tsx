import React from 'react';
import { NavLink as Link, useLocation } from 'react-router-dom';
import { NavLink } from '@mantine/core';

import { routes } from '../routes';

import S from './Header.module.css';

export const Header = () => {
  const location = useLocation();
  const isActive = (url: string) => {
    return url === location.pathname;
  };
  return (
    <nav className={S.header}>
      <Link to={routes.create}>
        <NavLink active={isActive(routes.create)} label="Create short url" />
      </Link>
      <Link to={routes.panel}>
        <NavLink active={isActive(routes.panel)} label="Manage short urls" />
      </Link>
    </nav>
  );
};
