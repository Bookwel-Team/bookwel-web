'use client';
import { RHFPasswordInput, RHFTextInput } from '@/components';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { FaLock as FaLockIcon, FaUser as FaUserIcon } from 'react-icons/fa';

const Page = () => {
  const form = useForm({ mode: 'all' });

  const handleSubmit = () => {
    form.setError('username', { message: 'Username' });
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-7'>Sign In</h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='basis-2/3'>
          <RHFTextInput label='Username' name='username' className='pr-10' hideLabel startIcon={<FaUserIcon />} />
          <RHFPasswordInput label='Password' name='password' hideLabel startIcon={<FaLockIcon />} />
          <button type='submit' className='btn btn-primary w-full'>
            Submit
          </button>
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
