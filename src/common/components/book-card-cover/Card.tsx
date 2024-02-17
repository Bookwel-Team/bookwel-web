/* eslint-disable react-hooks/exhaustive-deps */
import { Book, BookReaction, CrupdateReaction, ReactionStatus } from '@onitsiky/bookwel-typescript-client';
import { FC, useEffect } from 'react';
import { BsTriangle } from 'react-icons/bs';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { GiFeather } from 'react-icons/gi';
import { GoDownload } from 'react-icons/go';
import { LuBook } from 'react-icons/lu';
import { TDownloadBook, TGetOneBook, TReactToBook } from '../../../providers';
import { bookProvider } from '../../../providers/book-provider';
import { reactionProvider } from '../../../providers/reaction-provider';
import { useFetch } from '../../hooks';
import { getCached } from '../../utils';
import { BookCardCoverProps } from './type';

export const BookCardCover: FC<BookCardCoverProps> = ({ book, needReaction = true }) => {
  const { data: currentBook, fetch: getCurrentBook, isLoading: isCurrentBookLoading } = useFetch<Book, TGetOneBook>(bookProvider.getOne);
  const { fetch: reactToBook, isLoading: isReactionLoading } = useFetch<BookReaction, TReactToBook>(reactionProvider.reactToBook);
  const { fetch: downloadBook, isLoading: downloadBookLoading } = useFetch<void, TDownloadBook>(bookProvider.downloadBook);

  useEffect(() => {
    getCurrentBook(book.id || '');
  }, [book]);

  const handleReact = (reaction: ReactionStatus) => async () => {
    const userId = getCached.userBackendId();

    if (needReaction && userId && currentBook?.id) {
      const bookId = currentBook?.id;
      const data: CrupdateReaction = {
        reactorId: userId,
        reactionStatus: reaction === book.reactionStatistics?.byCurrentUser ? ReactionStatus.UNSET : reaction,
      };
      await reactToBook(bookId, data).then(() => {});
      getCurrentBook(book.id || '');
    }
  };

  const handleDownload = () => {
    if (currentBook?.title && currentBook?.fileLink) {
      downloadBook(currentBook?.title, currentBook?.fileLink);
    }
  };

  return (
    <div key={currentBook?.id} className='w-[17rem] h-[12rem] shadow-lg m-4 p-4 rounded-lg bg-slate-50 relative overflow-hidden'>
      {isCurrentBookLoading && (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <BsTriangle className='animate-spin text-white' size={24} />
        </div>
      )}
      {!isCurrentBookLoading && (
        <>
          <h1 className='text-2xl font-bold text-primary mb-6'>{currentBook?.title}</h1>
          <div className='flex items-center gap-4'>
            <GiFeather size={24} />
            <p>{currentBook?.author}</p>
          </div>
          <div className='flex mt-2 items-center gap-4'>
            <LuBook size={24} />
            <p>{currentBook?.category}</p>
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
              <span
                onClick={handleReact(ReactionStatus.LIKE)}
                className={`relative active:shadow-sx active:scale-[0.95] cursor-pointer top-1/2  text-white ${currentBook?.reactionStatistics?.byCurrentUser === ReactionStatus.LIKE ? 'bg-green-600' : 'bg-primary'} p-2 rounded-full shadow-lg`}
              >
                {isReactionLoading ? <BsTriangle className='animate-spin text-white' size={24} /> : <FaThumbsUp data-cy='reaction-button' size={24} />}
              </span>
              <span
                onClick={handleReact(ReactionStatus.DISLIKE)}
                className={`relative active:shadow-sx active:scale-[0.95] cursor-pointer top-1/2  text-white ${currentBook?.reactionStatistics?.byCurrentUser === ReactionStatus.DISLIKE ? 'bg-error' : 'bg-primary'} p-2 rounded-full shadow-lg`}
              >
                {isReactionLoading ? <BsTriangle className='animate-spin text-white' size={24} /> : <FaThumbsDown data-cy='reaction-button' size={24} />}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
