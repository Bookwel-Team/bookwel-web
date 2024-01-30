'use client';
import { Button, RHFPasswordInput, RHFTextInput } from '@/components';
import { useAuth } from '@/context/auth-context';
import { useFetch } from '@/hooks/useFetch';
import { authProvider } from '@/providers/auth-provider';
import { FieldErrorMessage } from '@/utilities/constants/field-error-messages';
import { TLoginInput, loginResolver } from '@/utilities/resolvers/login-resolver';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaLock as FaLockIcon, FaUser as FaUserIcon } from 'react-icons/fa';

const HOME_PAGE = '/home';

const Page = () => {
  const form = useForm<TLoginInput>({ mode: 'all', resolver: loginResolver });
  const { setUser } = useAuth();
  const { isLoading, data: user, fetch, error } = useFetch<User, typeof authProvider.signIn>(authProvider.signIn);
  const router = useRouter();

  useEffect(() => {
    if (!error && !!user) {
      setUser(user);
      router.push(HOME_PAGE);
    }
    if (error) {
      form.setError('password', { message: (error.response?.data as any)?.error?.message || FieldErrorMessage.authFailed });
    }
  }, [user, error, setUser, form, router]);

  const handleSubmit = form.handleSubmit(({ password, email }) => fetch(email, password));

  return (
    <div>
      <h1 className='text-2xl font-bold mb-7'>Sign In</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className='basis-2/3'>
          <RHFTextInput label='Email' name='email' className='pr-10' hideLabel startIcon={<FaUserIcon />} />
          <RHFPasswordInput label='Password' name='password' hideLabel startIcon={<FaLockIcon />} />
          <Button label='Submit' isLoading={isLoading} type='submit' className='w-full' />
          <div className='mt-2 flex justify-between'>
            <Link href='/signup' className='text-blue-500 hover:text-blue-700 underline'>
              Forgot password ?
            </Link>
            <Link href='/signup' className='text-blue-500 hover:text-blue-700 underline'>
              Create account ?
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default Page;
