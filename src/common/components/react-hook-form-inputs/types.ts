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

export interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  accept: string;
  label: string;
  hideLabel?: boolean;
  hideAll?: boolean;
  containerClassName?: string;
  getFileChange?: (newFile: File) => void;
}

export interface InputAutocomplete {
  items: string[];
  name: string;
  loadItems: boolean;
  label: string;
  onChange(val: string): void;
}
