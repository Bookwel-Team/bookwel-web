import { FC } from 'react';
import { BookCardCoverProps } from './type';

export const BookCardCover: FC<BookCardCoverProps> = ({ book, needReaction = true }) => {
  return (
    <div>
      <div className='w-72 h-80 shadow-lg relative m-2 p-2 bg-white image-full'>
        <h1 className='text-xl'>{book.title}</h1>
        <div className='py-2 px-4 rounded-lg bg-primary w-fit'>
          <p>{book.category}</p>
        </div>
        <p>{book.title}</p>
        {needReaction}
      </div>
    </div>
  );
};
