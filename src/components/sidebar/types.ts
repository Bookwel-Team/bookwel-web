import { ColHTMLAttributes, Dispatch, ReactNode, SetStateAction } from 'react';

export interface SidebarContextType {
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
}

export interface SidebarProviderProps {
  children: ReactNode;
}

export type SidebarTriggerProps = ColHTMLAttributes<HTMLSpanElement>;
