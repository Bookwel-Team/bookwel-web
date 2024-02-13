/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { GiFeather } from 'react-icons/gi';
import { GoDownload } from 'react-icons/go';
import { LuBook } from 'react-icons/lu';
import { BookCardCoverProps } from './type';
import { useFetch } from '../../hooks';
import { reactionProvider } from '../../../providers/reaction-provider';
import { BookReaction, ReactionStatus } from '@onitsiky/bookwel-typescript-client';
import { TDownloadBook, TGetBookReaction, TReactToBook } from '../../../providers';
import { BsTriangle } from 'react-icons/bs';
import { bookProvider } from '../../../providers/book-provider';

export const BookCardCover: FC<BookCardCoverProps> = ({ book, needReaction = true, userId }) => {
  const { fetch: reactToBook } = useFetch<BookReaction, TReactToBook>(reactionProvider.reactToBook);
  const { fetch: getBookReaction, data: reaction, isLoading: reactionLoading } = useFetch<BookReaction, TGetBookReaction>(reactionProvider.getBookReaction);
  const { fetch: downloadBook, isLoading: downloadBookLoading } = useFetch<void, TDownloadBook>(bookProvider.downloadBook);

  useEffect(() => {
    if (needReaction && userId && book.id) {
      getBookReaction(book.id, userId);
    }
  }, []);

  const handleReact = () => {
    console.log(needReaction, userId, book.id);
    if (needReaction && userId && book.id) {
      const bookId = book.id;
      reactToBook(bookId, userId, reaction?.reactionStatus === ReactionStatus.LIKE ? ReactionStatus.UNSET : ReactionStatus.LIKE).then(() => {
        getBookReaction(bookId, userId);
      });
    }
  };

  const handleDownload = () => {
    if (book.title && book.fileLink) {
      downloadBook(book.title, book.fileLink);
    }
  };

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
          <span
            onClick={handleDownload}
            data-cy='download-button'
            className='active:shadow-sx active:scale-[0.95] cursor-pointer top-1/2  text-white bg-primary p-2 rounded-full shadow-lg'
          >
            {downloadBookLoading ? <BsTriangle className='animate-spin text-white' size={24} /> : <GoDownload size={24} />}
          </span>
          {needReaction && (
            <span
              onClick={handleReact}
              className={`relative active:shadow-sx active:scale-[0.95] cursor-pointer top-1/2  text-white ${reaction?.reactionStatus === ReactionStatus.LIKE ? 'bg-error' : 'bg-primary'} p-2 rounded-full shadow-lg`}
            >
              {reactionLoading ? <BsTriangle className='animate-spin text-white' size={24} /> : <FaRegHeart data-cy='reaction-button' size={24} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
