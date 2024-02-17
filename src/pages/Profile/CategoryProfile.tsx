/* eslint-disable react-hooks/exhaustive-deps */
import { Category, CategoryCrupdateReaction, ReactionStatus } from '@onitsiky/bookwel-typescript-client';
import { useCallback, useEffect, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button } from '../../common/components';
import { useFetch } from '../../common/hooks';
import { getCached } from '../../common/utils';
import { TGetAllCategory, categoryProvider } from '../../providers';
import { CategoryEdition } from '.';
import { FaX } from 'react-icons/fa6';
import { BsTriangle } from 'react-icons/bs';

const categoryListToObject = (categories: Category[]) => {
  const res: Record<string, CategoryCrupdateReaction> = {};
  const userId = getCached.userBackendId();
  categories.forEach(category => {
    res[category.id || ''] = { categoryId: category.id, reactionStatus: category.reactionStatistics?.byCurrentUser, reactorId: userId || '' };
  });
  return res;
};

export const CategoryProfile = () => {
  const { fetch, data, isLoading } = useFetch<Category[], TGetAllCategory>(categoryProvider.getAll);

  const getUserCategories = useCallback(() => {
    const userId = getCached.userBackendId();
    fetch(undefined, userId || '');
  }, []);

  useEffect(() => {
    getUserCategories();
  }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleShowDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };
  const handleCloseDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
    getUserCategories();
  };

  return (
    <div className='w-full '>
      <div className='divider'>Categories</div>
      <div className='w-full flex gap-2 flex-wrap pb-8'>
        {data &&
          data
            .filter(category => category.reactionStatistics?.byCurrentUser === ReactionStatus.LIKE)
            .map(category => (
              <div key={category.name} className="py-3 px-5 border cursor-pointer border-secondary 'bg-secondary text-secondary">
                <p>{category.name}</p>
              </div>
            ))}
        {isLoading ||
          (!data && (
            <div className='w-full h-60 flex justify-center items-center'>
              <span className='animate-spin'>
                <BsTriangle className={`m-2 -translate-y-[1px] text-primary`} size={17} />
              </span>
            </div>
          ))}
      </div>
      <div className='w-full text-end'>
        <Button label='Edit' icon={<FaEdit />} onClick={handleShowDialog} />
      </div>
      <dialog ref={dialogRef} className='modal'>
        <div className='modal-box w-8/12 min-h-[70vh] max-w-5xl flex flex-col'>
          <div className=''>
            <h3 className='font-bold text-lg'>Edit category</h3>
          </div>
          <div className='flex-grow flex justify-center items-center'>
            {data && (
              <CategoryEdition
                selectedCategories={categoryListToObject(data.filter(category => category?.reactionStatistics?.byCurrentUser === ReactionStatus.LIKE) || [])}
                action={
                  <form method='dialog'>
                    <Button label='Cancel' icon={<FaX />} />
                  </form>
                }
                onDone={handleCloseDialog}
              />
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};
