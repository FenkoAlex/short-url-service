import React, { ChangeEvent, useState } from 'react';
import { Text, Button, Paper, TextInput, Title, List } from '@mantine/core';
import { toast } from 'react-toastify';

import { apiRoutes } from '../routes';
import { Header } from '../components/Header';

import S from './Panel.module.css';

type Info = {
  clickCount?: string;
  createdAt?: string;
  originalUrl?: string;
  ips?: string[];
};

export const PanelPage = () => {
  const [alias, setAlias] = useState('');
  const [info, setInfo] = useState<Info>({});
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAlias(e.target.value);
  };

  async function handleGetInfo() {
    if (!alias.length) {
      toast.warn('Type alias for search');
      return;
    }
    const response = await fetch(apiRoutes.getInfo(alias));
    const result = await response.json();
    if (response.status === 200) {
      if (result) {
        setInfo(result);
      } else {
        toast.warn('No info found.');
      }
    } else {
      toast.error(result?.message || 'Something went wrong, try again later');
    }
  }

  async function handleGetAnalytics() {
    if (!alias.length) {
      toast.warn('Type alias for search');
      return;
    }
    const response = await fetch(apiRoutes.getAnalytics(alias));
    const result = await response.json();
    if (response.status === 200) {
      if (result) {
        setInfo(result);
      } else {
        toast.warn('No analytics found.');
      }
    } else {
      toast.error(result?.message || 'Something went wrong, try again later');
    }
  }

  async function deleteUrl() {
    if (!confirm("You can't restore deleted url")) {
      return;
    }
    const response = await fetch(apiRoutes.deleteUrl(alias), {
      method: 'DELETE',
    });
    if (response.status === 200) {
      toast.success('Url has been deleted!');
      setInfo({});
    } else {
      toast.error('Something went wrong, try again later');
    }
  }

  return (
    <>
      <Header />
      <div>
        <h1>Manage short urls</h1>
        <TextInput
          mb="md"
          label="Alias"
          size="lg"
          value={alias}
          onChange={handleInputChange}
        />

        {!!Object.keys(info).length && (
          <Paper mb="md">
            {info.originalUrl && (
              <Title order={3}>
                Original url: <b>{info.originalUrl}</b>
              </Title>
            )}
            {info.clickCount && (
              <Text size="md">
                Click count: <b>{info.clickCount}</b>
              </Text>
            )}
            {info.createdAt && (
              <Text size="md">
                Created at: <b>{info.createdAt}</b>
              </Text>
            )}
            {info.ips && (
              <>
                <Text size="md">Last 5 IP address:</Text>
                <List>
                  {info.ips?.map((item) => <List.Item>{item}</List.Item>)}
                </List>
              </>
            )}
          </Paper>
        )}

        <div className={S.actionList}>
          <Button onClick={handleGetInfo}>Get info</Button>
          <Button onClick={handleGetAnalytics}>Get analytics</Button>
          <Button color="red" onClick={deleteUrl}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};
