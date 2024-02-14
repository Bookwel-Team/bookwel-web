import { AxiosError } from 'axios';
import { FieldErrorMessage } from '../constants';

export const getErrorMessage = (error: AxiosError, ifNull: keyof typeof FieldErrorMessage = 'unexpectedError') =>
  (error.response?.data as { message: string })?.message || FieldErrorMessage[ifNull];
