import Logo from '@/assets/logo.svg';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-full h-full sm:w-3/4 lg:w-2/3 xl:w-1/2 sm:h-2/3 bg-white rounded-2xl p-3 flex justify-around items-center'>
        <div className='basis-1/2 relative flex justify-center items-center'>
          <div className='w-[15rem] h-[15rem] rounded-full bg-neutral flex justify-center items-center relative p-8'>
            <Image src={Logo} alt='Logo' className='object-contain w-full' />
          </div>
        </div>
        <div className='basis-1/2'>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
