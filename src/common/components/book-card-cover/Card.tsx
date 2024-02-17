/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState } from 'react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { GiFeather } from 'react-icons/gi';
import { GoDownload } from 'react-icons/go';
import { LuBook } from 'react-icons/lu';
import { BookCardCoverProps } from './type';
import { useFetch } from '../../hooks';
import { reactionProvider } from '../../../providers/reaction-provider';
import { BookReaction, CrupdateReaction, ReactionStatus } from '@onitsiky/bookwel-typescript-client';
import { TDownloadBook, TReactToBook } from '../../../providers';
import { BsTriangle } from 'react-icons/bs';
import { bookProvider } from '../../../providers/book-provider';

export const BookCardCover: FC<BookCardCoverProps> = ({ book, needReaction = true, userId }) => {
  const { fetch: reactToBook } = useFetch<BookReaction, TReactToBook>(reactionProvider.reactToBook);
  const { fetch: downloadBook, isLoading: downloadBookLoading } = useFetch<void, TDownloadBook>(bookProvider.downloadBook);
  const [isReactionLoading, setIsReactionLoading] = useState(false);

  const handleReact = (reaction: ReactionStatus) => () => {
    setIsReactionLoading(true);
    console.log(needReaction, "user " + userId, "book " + book.id);
    if (needReaction && userId && book.id) {
      const bookId = book.id;
      const data : CrupdateReaction = {
        reactorId: userId,
        reactionStatus: reaction
      }
      reactToBook(bookId, data).then(() => {
      });
    }
    setIsReactionLoading(false);
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
            {downloadBookLoading ? <BsTriangle className='animate-spin text-white' size={24} /> :
              <GoDownload size={24} />}
          </span>
          <span
            onClick={handleReact(ReactionStatus.LIKE)}
            className={`relative active:shadow-sx active:scale-[0.95] cursor-pointer top-1/2  text-white ${book.reactionStatistics?.byCurrentUser === ReactionStatus.LIKE ? 'bg-green-600' : 'bg-primary'} p-2 rounded-full shadow-lg`}
          >
              {isReactionLoading ? <BsTriangle className='animate-spin text-white' size={24} /> :
                <FaThumbsUp data-cy='reaction-button' size={24} />}
            </span>
          <span
            onClick={handleReact(ReactionStatus.DISLIKE)}
            className={`relative active:shadow-sx active:scale-[0.95] cursor-pointer top-1/2  text-white ${book.reactionStatistics?.byCurrentUser === ReactionStatus.LIKE ? 'bg-error' : 'bg-primary'} p-2 rounded-full shadow-lg`}
          >
              {isReactionLoading ? <BsTriangle className='animate-spin text-white' size={24} /> :
                <FaThumbsDown data-cy='reaction-button' size={24} />}
            </span>
        </div>
      </div>
    </div>
  );
};
