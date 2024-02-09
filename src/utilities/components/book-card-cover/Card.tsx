import { FC } from 'react';
import { BookCardCoverProps } from './type';

export const BookCardCover: FC<BookCardCoverProps> = ({ book, needReaction = true }) => {
  return (
    <div key={book.id} className='w-[15rem] h-[23rem] m-4 bg-slate-50 relative'>
      <div className='absolute p-3 bottom-0 bg-gradient-to-t from-secondary to-transparent'>
        <h1 className='font-bold text-white'>{book.title}</h1>
        <p className='text-white'>{book.author}</p>
        <p className='text-white'>{book.category}</p>
        {needReaction && <div></div>}
      </div>
    </div>
  );
};
