import { User } from 'firebase/auth';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TSingUp, TCreateUser, authProvider, userProvider } from '../../providers';
import { RHFTextInput, RHFPasswordInput, Button } from '../../utilities/components';
import { LOGIN_PAGE } from '../../utilities/constants';
import { useAuth } from '../../utilities/context/auth-context';
import { useFetch } from '../../utilities/hooks';
import { FaLock as FaLockIcon, FaMailBulk as FaMailBulkIcon } from 'react-icons/fa';
import { signUpResolver } from '../../utilities/resolvers';
import { CATEGORIES } from '../../utilities/constants/path';

export const SignUp = () => {
  const form = useForm({ mode: 'all', resolver: signUpResolver });
  const { setUser } = useAuth();
  const { isLoading, data: user, fetch, error } = useFetch<User, TSingUp>(authProvider.signUp);
  const { fetch: createUser, isLoading: loadCreate, error: errorUser, data: userCreated } = useFetch<User, TCreateUser>(userProvider.createUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!error && !!user && !errorUser && !!userCreated) {
      navigate(CATEGORIES);
    }
    if (!error && !!user) {
      setUser(user);
      createUser({ firebaseId: user.uid });
    }
    if (error) {
      form.setError('password', { message: (error.response?.data as any)?.error?.message });
    }
  }, [user, error, setUser, form, navigate, errorUser, userCreated]);

  const handleSubmit = form.handleSubmit(({ password, email }) => fetch(email, password));
  return (
    <div>
      <h1 className='text-2xl font-bold mb-7'>Sign Up</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className='basis-2/3'>
          <RHFTextInput label='Email' name='email' className='pr-10' hideLabel startIcon={<FaMailBulkIcon />} />
          <RHFPasswordInput label='Password' name='password' hideLabel startIcon={<FaLockIcon />} />
          <RHFPasswordInput label='Confirm password' name='confirmPassword' hideLabel startIcon={<FaLockIcon />} />
          <Button label='Submit' isLoading={isLoading || loadCreate} type='submit' className='w-full' />
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
