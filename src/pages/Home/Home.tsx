import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsTriangle } from 'react-icons/bs';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/books');
      return () => {
        clearTimeout(timeout);
      };
    }, 2000);
  }, [navigate]);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div>
        <span className=''>
          <BsTriangle className='m-2 animate-spin text-primary' size={24} />
        </span>
      </div>
    </div>
  );
};
