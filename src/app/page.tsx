'use client';

import { LOGIN_PAGE } from '@/utilities/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BsTriangle } from 'react-icons/bs';

export default function Home() {
  const route = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      route.push(LOGIN_PAGE);
      return () => {
        clearTimeout(timeout);
      };
    }, 2000);
  }, [route]);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div>
        <span className=''>
          <BsTriangle className='m-2 animate-spin text-primary' size={24} />
        </span>
      </div>
    </div>
  );
}
