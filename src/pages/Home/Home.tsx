import { BsRobot as BsRobotIcon } from 'react-icons/bs';
import './Home.css';
import Logo from '../../assets/logo-nobg.png';
import Navbar from './components/Navbar';
import { ChangeEvent, useState } from 'react';

export const Home = () => {
  const [message, setMessage] = useState('');

  const handleClick = e => {
    try {
      e.preventDefault();
      if (message) {
        // Chat api handler
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

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
              <p>Welcome to BookKwell, your personalized book recommendation app!</p>
              <p>Tired of wandering aimlessly in literary landscapes?</p>
              <p>BookKwell takes the guesswork out of finding your next captivating read. </p>
              <p>Powered by intelligent algorithms and curated by bibliophiles like you, it's your own personal librarian in your pocket.</p>
            </div>
            <div className='w-full relative'>
              <form onSubmit={handleClick}>
                <input
                  type='text'
                  onChange={handleChange}
                  placeholder='Message Chat...'
                  className='input input-bordered bg-white w-full text-gray-500 rounded-full'
                  value={message}
                />
                <span className='absolute top-1/2 -translate-y-1/2 right-1 text-white bg-secondary p-2 rounded-full shadow-lg'>
                  <BsRobotIcon onClick={handleClick} size={24} />
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
