/* eslint-disable react-hooks/exhaustive-deps */
import { Book, Category } from '@onitsiky/bookwel-typescript-client';
import { useEffect } from 'react';
import { BsTriangle } from 'react-icons/bs';
import { GoSearch as GoSearchIcon } from 'react-icons/go';
import { CategoryFilter } from '.';
import { TGetAllUser } from '../../providers';
import { bookProvider } from '../../providers/book-provider';
import { BookCardCover } from '../../common/components';
import { useFetch } from '../../common/hooks';

export const Books = () => {
  const { fetch, data, isLoading } = useFetch<Book[], TGetAllUser>(bookProvider.getAll);

  const handleCategoryChange = (category: Category) => {
    fetch({ category: category.name });
  };

  useEffect(() => {
    if (!isLoading && data === null) {
      fetch({ author: '', category: '' });
    }
  }, []);

  return (
    <div className='w-screen h-screen flex flex-col justify-start items-center p-4'>
      <div className='w-1/3 relative'>
        <input type='text' placeholder='Search book' className='input input-bordered bg-white w-full rounded-full' />
        <span className='absolute active:shadow-sx active:scale-[0.95] cursor-pointer top-1/2 -translate-y-1/2 right-1 text-white bg-secondary p-2 rounded-full shadow-lg'>
          <GoSearchIcon size={24} />
        </span>
      </div>
      <CategoryFilter onChange={handleCategoryChange} />
      <div className='h-[85%] mt-4 w-5/6 overflow-y-auto'>
        <div className='flex w-full flex-wrap justify-center'>
          {!isLoading && data && data.length > 0 && data.map(data => <BookCardCover key={data.id} userId={localStorage.getItem('userId') || ''} book={data} />)}
          {isLoading && (
            <div className='w-[20%] h-[23rem] m-4  relative flex items-center justify-center'>
              <div>
                <span className=''>
                  <BsTriangle className='m-2 animate-spin text-primary' size={24} />
                </span>
              </div>
            </div>
          )}
          {!isLoading && data && data.length === 0 && (
            <div className='w-[20%] h-[23rem] m-4  relative flex items-center justify-center'>
              <div className='w-[50vw]'>
                <h1 className='text-2xl text-primary'>No available books for know.</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
