import { ButtonHTMLAttributes, ReactNode } from 'react';

export type TButtonProps = {
  isLoading?: boolean;
  icon?: ReactNode;
  label: string;
  color?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
