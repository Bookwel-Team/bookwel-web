import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from '../../utilities/constants';
import { BsTriangle } from 'react-icons/bs';
import './Home.css';
import Logo from '../../assets/logo-nobg.png';
import { GoSearch as GoSearchIcon } from 'react-icons/go';
import Navbar from './components/Navbar';

export const Home = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     navigate(LOGIN_PAGE);
  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }, 2000);
  // }, [navigate]);

  return (
    <div className='w-screen'>
      <div className='header__banner h-screen w-full'>
        <Navbar />
        <div className='h-5/6 flex justify-center items-center'>
          <div className='p-10 glass text-gray-100 rounded-box text-center'>
            <div className=''>
              <img src={Logo} alt='bookKwell logo' className='mx-auto' />
            </div>
            <h1 className='text-7xl mb-4'>BookKwell</h1>
            <div className='mb-4'>
              <p>Welcome to BookWel, your personalized book recommendation app!</p>
              <p>Tired of wandering aimlessly in literary landscapes?</p>
              <p>BookWel takes the guesswork out of finding your next captivating read. </p>
              <p>Powered by intelligent algorithms and curated by bibliophiles like you, it's your own personal librarian in your pocket.</p>
            </div>
            <div className='w-full relative'>
              <input type='text' placeholder='Search book' className='input input-bordered bg-white w-full text-gray-500 rounded-full' />
              <span className='absolute top-1/2 -translate-y-1/2 right-1 text-white bg-secondary p-2 rounded-full shadow-lg'>
                <GoSearchIcon size={24} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
