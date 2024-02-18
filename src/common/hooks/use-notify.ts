/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'debounce';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';

export const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMemo(() => debounce((message: string, className = '') => enqueueSnackbar(message, { className }), 200), []);
};
