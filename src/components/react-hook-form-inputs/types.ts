import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  disabled?: boolean;
  type?: string;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  hideLabel?: boolean;
  containerClassName?: string;
  onClickEndIcon?: () => void;
}

export type PasswordInputProps = Omit<InputProps, 'endIcon' | 'toggleVisibility' | 'type'>;
