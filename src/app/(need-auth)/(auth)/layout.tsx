import Image from 'next/image';
import LOGIN_LOGO from '@/assets/login-logo.png';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-full h-full sm:w-3/4 lg:w-2/3 xl:w-1/2 sm:h-2/3 bg-white rounded-2xl p-3 flex justify-around items-center'>
        <div className='basis-1/2 relative flex justify-center items-center'>
          <Image src={LOGIN_LOGO} alt='logo' />
        </div>
        <div className='basis-1/2 flex justify-center items-center'>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
