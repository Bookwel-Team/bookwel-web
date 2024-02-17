import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotify } from '.';
import { authProvider } from '../../providers';
import { LOGIN_PAGE } from '../constants';

export const useFetch = <T, F extends (...args: any[]) => any>(promise: F | Promise<T>) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const navigate = useNavigate();
  const notify = useNotify();

  const _fetcher = async (...args: Parameters<F>) => {
    try {
      setLoading(true);
      const res = await (typeof promise === 'function' ? promise(...args) : promise);
      setData(res as T);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 403 || error.response?.status === 401 || error.code === 'ERR_NETWORK') {
        notify('Token expired', 'bg-error');
        authProvider.logout();
        navigate(LOGIN_PAGE);
      }
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
