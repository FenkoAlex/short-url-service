import React, { useState } from 'react';
import { Blockquote, Button, TextInput, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { toast } from 'react-toastify';

import { apiRoutes } from '../routes';
import { Header } from '../components/Header';

export const CreatePage = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      originalUrl: '',
      alias: '',
      expiresAt: null,
    },

    validate: {
      originalUrl: (value) => {
        try {
          new URL(value);
          return null;
        } catch {
          return 'Wrong format, URL should looks like: https://my-short-url.com';
        }
      },
    },
  });
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState('');

  async function handleSubmit(formFields: ReturnType<typeof form.getValues>) {
    setLoading(true);
    setShortUrl('');
    const response = await fetch(apiRoutes.createUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    });
    if (response.status === 201) {
      const result: string = await response.text();
      setShortUrl(result);
      form.reset();
    } else {
      const result = await response.json();
      toast.error(result?.message || 'Something went wrong, try again later');
    }
    setLoading(false);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Copied to clipboard');
  };

  return (
    <>
      <Header />
      <div>
        <h1>Create short link</h1>
        {shortUrl && (
          <Blockquote
            color="green"
            mb="xl"
            cite="Click to copy"
            onClick={handleCopy}
          >
            <Title order={3}>{shortUrl}</Title>
          </Blockquote>
        )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            mb="md"
            label="Original URL"
            size="lg"
            placeholder="https://my-short-url.com"
            key={form.key('originalUrl')}
            withAsterisk
            required
            {...form.getInputProps('originalUrl')}
          />
          <TextInput
            label="Alias"
            mb="md"
            size="lg"
            maxLength={20}
            key={form.key('alias')}
            {...form.getInputProps('alias')}
          />
          <DatePickerInput
            label="Expires at"
            minDate={new Date()}
            key={form.key('expiresAt')}
            placeholder="Pick date"
            size="md"
            mb="md"
            {...form.getInputProps('expiresAt')}
          />

          <Button type="submit" loading={loading}>
            Create
          </Button>
        </form>
      </div>
    </>
  );
};
