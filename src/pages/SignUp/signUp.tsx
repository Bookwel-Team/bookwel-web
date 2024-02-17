/* eslint-disable react-hooks/exhaustive-deps */
import { Whoami } from '@onitsiky/bookwel-typescript-client';
import { User } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaLock as FaLockIcon, FaMailBulk as FaMailBulkIcon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Button, RHFPasswordInput, RHFTextInput } from '../../common/components';
import { LOGIN_PAGE } from '../../common/constants';
import { CATEGORIES_PAGE } from '../../common/constants/paths';
import { useAuth } from '../../common/context/auth-context';
import { useFetch } from '../../common/hooks';
import { signUpResolver } from '../../common/resolvers';
import { getErrorMessage } from '../../common/utils';
import { TCreateUser, TSingUp, TWhoami, authProvider, userProvider } from '../../providers';

export const SignUp = () => {
  const form = useForm({ mode: 'all', resolver: signUpResolver });
  const { setUser } = useAuth();
  const { isLoading, data: user, fetch, error } = useFetch<User, TSingUp>(authProvider.signUp);
  const { fetch: createUser, data: createdUser, isLoading: loadCreate, error: errorUser } = useFetch<User, TCreateUser>(userProvider.createUser);
  const { fetch: getWhoami, data: whoami, isLoading: isWhoamiLoading, error: whoamiError } = useFetch<Whoami, TWhoami>(userProvider.whoami);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      form.setError('password', { message: getErrorMessage(error, 'authFailed') });
      return () => {};
    }
    user && createUser({ firebaseId: user.uid, profile: { email: user.email || '' } });
  }, [user]);

  useEffect(() => {
    if (errorUser) {
      enqueueSnackbar(getErrorMessage(errorUser), { className: 'error' });
      return () => {};
    }
    createdUser && getWhoami();
  }, [createdUser]);

  useEffect(() => {
    if (whoamiError) {
      enqueueSnackbar(getErrorMessage(whoamiError), { className: 'error' });
    } else if (whoami) {
      user && setUser(user);
      navigate(CATEGORIES_PAGE);
    }
  }, [whoami]);

  const handleSubmit = form.handleSubmit(({ password, email }) => fetch(email, password));

  return (
    <div>
      <h1 className='text-2xl font-bold mb-7'>Sign Up</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className='basis-2/3'>
          <RHFTextInput label='Email' name='email' className='pr-10' hideLabel startIcon={<FaMailBulkIcon />} />
          <RHFPasswordInput label='Password' name='password' hideLabel startIcon={<FaLockIcon />} />
          <RHFPasswordInput label='Confirm password' name='confirmPassword' hideLabel startIcon={<FaLockIcon />} />
          <Button label='Submit' isLoading={isLoading || loadCreate || isWhoamiLoading} type='submit' className='w-full' />
          <div className='mt-2'>
            <Link to={LOGIN_PAGE} className='text-blue-500 hover:text-blue-700 underline'>
              Already have account ?
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
