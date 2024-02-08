import { User } from 'firebase/auth';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TSingIn, authProvider } from '../../providers';
import { RHFTextInput, RHFPasswordInput, Button } from '../../utilities/components';
import { HOME_PAGE, FieldErrorMessage } from '../../utilities/constants';
import { useAuth } from '../../utilities/context/auth-context';
import { useFetch } from '../../utilities/hooks';
import { TLoginInput, loginResolver } from '../../utilities/resolvers';
import { FaLock as FaLockIcon, FaUser as FaUserIcon } from 'react-icons/fa';
import { SING_UP_PAGE } from '../../utilities/constants/path';

export const SignIn = () => {
  const form = useForm<TLoginInput>({ mode: 'all', resolver: loginResolver });
  const { setUser } = useAuth();
  const { isLoading, data: user, fetch, error } = useFetch<User, TSingIn>(authProvider.signIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!error && !!user) {
      setUser(user);
      navigate(HOME_PAGE);
    }
    if (error) {
      form.setError('password', { message: (error.response?.data as any)?.error?.message || FieldErrorMessage.authFailed });
    }
  }, [user, error, setUser, form, navigate]);

  const handleSubmit = form.handleSubmit(({ password, email }) => fetch(email, password));

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
