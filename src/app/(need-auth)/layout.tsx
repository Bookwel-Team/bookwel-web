'use client';

import { AuthProvider } from '@/context/auth-context';

const NeedAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default NeedAuthLayout;
