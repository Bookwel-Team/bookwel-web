import { FC } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { GiFeather } from 'react-icons/gi';
import { GoDownload } from 'react-icons/go';
import { LuBook } from 'react-icons/lu';
import { BookCardCoverProps } from './type';

export const BookCardCover: FC<BookCardCoverProps> = ({ book, needReaction = true }) => {
  return (
    <div key={book.id} className='w-[17rem] h-[12rem] shadow-lg m-4 p-4 rounded-lg bg-slate-50 relative overflow-hidden'>
      <h1 className='text-2xl font-bold text-primary mb-6'>{book.title}</h1>
      <div className='flex items-center gap-4'>
        <GiFeather size={24} />
        <p>{book.author}</p>
      </div>
      <div className='flex mt-2 items-center gap-4'>
        <LuBook size={24} />
        <p>{book.category}</p>
      </div>
      <div className='flex absolute bottom-0 left-0 w-full p-3 justify-end items-center'>
        <div className='flex gap-3'>
          <span className='active:shadow-sx active:scale-[0.95] cursor-pointer top-1/2  text-white bg-primary p-2 rounded-full shadow-lg'>
            <GoDownload size={24} />
          </span>
          {needReaction && (
            <span className='active:shadow-sx active:scale-[0.95] cursor-pointer top-1/2  text-white bg-primary p-2 rounded-full shadow-lg'>
              <FaRegHeart data-cy='reaction-button' size={24} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
