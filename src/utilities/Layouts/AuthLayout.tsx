import { Outlet } from 'react-router-dom';
import LOGO from '../../assets/login-logo.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const AuthLayout = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full h-full sm:w-3/4 lg:w-2/3 xl:w-1/2 sm:h-2/3 bg-white rounded-2xl p-3 flex justify-around items-center'>
        <div className='basis-0 lg:basis-1/2 relative flex justify-center items-center'>
          <LazyLoadImage src={LOGO} alt='logo' />
        </div>
        <div className='basis-full lg:basis-1/2 flex justify-center items-center'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
