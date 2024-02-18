/* eslint-disable react-hooks/exhaustive-deps */
import { User } from '@onitsiky/bookwel-typescript-client';
import { useEffect } from 'react';
import { BsTriangle } from 'react-icons/bs';
import { ProfileCard } from '.';
import { useFetch } from '../../common/hooks';
import { TGetOneUser, userProvider } from '../../providers';

export const Profile = () => {
  const { data, fetch, isLoading } = useFetch<User, TGetOneUser>(userProvider.getOne);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='min-h-[25rem] w-[37rem] bg-white rounded-lg shadow-sm p-10 relative'>
        {!isLoading && data && data.profile ? (
          <ProfileCard profile={data.profile} />
        ) : (
          <div className='flex justify-center items-center h-full'>
            <span className='animate-spin'>
              <BsTriangle className='m-2 -translate-y-[1px] text-primary' size={17} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
