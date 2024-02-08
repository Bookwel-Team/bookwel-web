import { useState } from 'react';
import { GoSearch as GoSearchIcon } from 'react-icons/go';
import { staticBooks, staticCategory } from './statics';

export const Books = () => {
  const [category, setCategory] = useState('History');

  const handleClick = (category: string) => () => setCategory(category);

  return (
    <div className='w-screen h-screen flex flex-col justify-start items-center p-4'>
      <div className='w-1/3 relative'>
        <input type='text' placeholder='Search book' className='input input-bordered bg-white w-full rounded-full' />
        <span className='absolute top-1/2 -translate-y-1/2 right-1 text-white bg-secondary p-2 rounded-full shadow-lg'>
          <GoSearchIcon size={24} />
        </span>
      </div>
      <div className='mt-5 mb-1 py-4 w-5/6 flex flex-nowrap overflow-x-auto justify-center items-center overflow-y-hidden'>
        {staticCategory.map(label => (
          <div
            onClick={handleClick(label)}
            key={label}
            className={`py-3 px-9 border cursor-pointer border-secondary mx-2 ${category === label ? 'bg-secondary text-white' : 'text-secondary'}`}
          >
            <p>{label}</p>
          </div>
        ))}
      </div>
      <div className='h-[85%] mt-4 w-5/6 overflow-y-auto'>
        <div className='flex w-full flex-wrap justify-center'>
          {staticBooks.map(data => (
            <div key={data.name} className='w-[20%] h-[23rem] m-4 bg-slate-50 relative'>
              <img src={data.image || ''} className='absolute top-0 left-0 w-full h-full object-cover' alt={data.name} />
              <div className='absolute p-3 bottom-0 bg-gradient-to-t from-secondary to-transparent'>
                <h1 className='font-bold text-white'>{data.name}</h1>
                <p className='text-white'>{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
