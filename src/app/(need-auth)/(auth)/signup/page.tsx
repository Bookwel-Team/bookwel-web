'use client';
import { Button, RHFPasswordInput, RHFTextInput } from '@/components';
import { useAuth } from '@/context/auth-context';
import { useFetch } from '@/hooks/useFetch';
import { TSingUp, authProvider } from '@/providers';
import { HOME_PAGE } from '@/utilities/constants';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaLock as FaLockIcon, FaMailBulk as FaMailBulkIcon, FaUser as FaUserIcon } from 'react-icons/fa';

const Page = () => {
  const form = useForm({ mode: 'all' });
  const { setUser } = useAuth();
  const { isLoading, data: user, fetch, error } = useFetch<User, TSingUp>(authProvider.signUp);
  const router = useRouter();

  useEffect(() => {
    if (!error && !!user) {
      setUser(user);
      router.push(HOME_PAGE);
    }
    if (error) {
      form.setError('password', { message: (error.response?.data as any)?.error?.message });
    }
  }, [user, error, setUser, form, router]);

  const handleSubmit = () => form.handleSubmit(({ password, email }) => fetch(email, password));
  return (
    <div>
      <h1 className='text-2xl font-bold mb-7'>Sign Up</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className='basis-2/3'>
          <RHFTextInput label='Email' name='email' className='pr-10' hideLabel startIcon={<FaMailBulkIcon />} />
          <RHFPasswordInput label='Password' name='password' hideLabel startIcon={<FaLockIcon />} />
          <RHFPasswordInput label='Confirm password' name='confirmPassword' hideLabel startIcon={<FaLockIcon />} />
          <Button label='Submit' isLoading={isLoading} type='submit' className='w-full' />
          <div className='mt-2'>
            <Link href='/signin' className='text-blue-500 hover:text-blue-700 underline'>
              Already have account ?
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default Page;
