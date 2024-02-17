import { UserProfile } from '@onitsiky/bookwel-typescript-client';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaMailBulk, FaUser } from 'react-icons/fa';
import { ProfileCardProps } from '.';
import { Button, RHFTextInput } from '../../common/components';
import { useFetch } from '../../common/hooks';
import { profileResolver } from '../../common/resolvers/profile-resolver';
import { TUpdateOneUser, userProvider } from '../../providers';
import { useSnackbar } from 'notistack';

export const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {
  const form = useForm({ mode: 'all', resolver: profileResolver, defaultValues: { ...profile } });
  const { fetch, isLoading, error } = useFetch<UserProfile, TUpdateOneUser>(userProvider.updateOne);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = form.handleSubmit(async data => {
    await fetch(data);
    if (!error) {
      enqueueSnackbar('Profile updated successfully!', { className: 'bg-success' });
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col w-full items-end'>
          <RHFTextInput disabled={isLoading} startIcon={<FaUser />} className='flex-grow' label='First name' placeholder='ex: Doe' name='firstName' />
          <RHFTextInput disabled={isLoading} startIcon={<FaUser />} className='flex-grow' label='Last name' placeholder='ex: John' name='lastName' />
          <RHFTextInput startIcon={<FaMailBulk />} className='flex-grow' label='Email' type='email' disabled name='email' />
          <Button label='Save' type='submit' isLoading={isLoading} />
        </div>
      </form>
    </FormProvider>
  );
};
