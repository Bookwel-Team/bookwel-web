'use client';

import { AxiosError } from 'axios';
import { useState } from 'react';

export const useFetch = <T, F extends (...args: any) => any>(promise: F | Promise<T>) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const _fetcher = async (...args: Parameters<F>) => {
    try {
      setLoading(true);
      const res = await (typeof promise === 'function' ? promise(...args) : promise);
      setData(res);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    data,
    error,
    fetch: _fetcher,
  };
};
