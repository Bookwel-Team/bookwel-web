import { User } from 'firebase/auth';
import { FormProvider, useForm } from 'react-hook-form';
import { FaLock as FaLockIcon, FaUser as FaUserIcon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Button, RHFPasswordInput, RHFTextInput } from '../../common/components';
import { FieldErrorMessage, HOME_PAGE } from '../../common/constants';
import { SING_UP_PAGE } from '../../common/constants/path';
import { useAuth } from '../../common/context/auth-context';
import { useFetch } from '../../common/hooks';
import { TLoginInput, loginResolver } from '../../common/resolvers';
import { TSingIn, authProvider, userProvider } from '../../providers';

export const SignIn = () => {
  const form = useForm<TLoginInput>({ mode: 'all', resolver: loginResolver });
  const { setUser } = useAuth();
  const { isLoading, data: user, fetch, error } = useFetch<User, TSingIn>(authProvider.signIn);
  const navigate = useNavigate();

  const handleSubmit = form.handleSubmit(async ({ password, email }) => {
    await fetch(email, password);
    if (error || !user) {
      form.setError('password', { message: (error?.response?.data as any)?.error?.message || FieldErrorMessage.authFailed });
      return;
    }
    await userProvider.whoami();
    setUser(user);
    navigate(HOME_PAGE);
  });

  return (
    <div>
      <h1 className='text-2xl font-bold mb-7'>Sign In</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className='basis-2/3'>
          <RHFTextInput label='Email' name='email' className='pr-10' hideLabel startIcon={<FaUserIcon />} />
          <RHFPasswordInput label='Password' name='password' hideLabel startIcon={<FaLockIcon />} />
          <Button label='Submit' isLoading={isLoading} type='submit' className='w-full btn-primary' />
          <div className='mt-2 flex justify-between'>
            <Link to={SING_UP_PAGE} className='text-blue-500 hover:text-blue-700 underline'></Link>
            <Link to={SING_UP_PAGE} className='text-blue-500 hover:text-blue-700 underline'>
              Create account ?
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
