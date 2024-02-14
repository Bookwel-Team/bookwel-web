/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Category, CategoryCrupdateReaction, CategoryReaction, ReactionStatus } from '@onitsiky/bookwel-typescript-client';
import debounce from 'debounce';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { BsTriangle } from 'react-icons/bs';
import { FaChevronRight } from 'react-icons/fa';
import { GoSearch as GoSearchIcon } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import SoftButton from '../../common/components/button/SoftButton';
import { HOME_PAGE } from '../../common/constants';
import { useFetch } from '../../common/hooks';
import { getCached, getErrorMessage } from '../../common/utils';
import { TCategory, TReactToCategory, categoryProvider, reactionProvider } from '../../providers';

export const CategoryPage = () => {
  const { fetch, data: categoryList, isLoading: loadCategory } = useFetch<Category[], TCategory>(categoryProvider.getAll);
  const {
    fetch: reactToCategory,
    isLoading: categoryReactionLoading,
    error: categoryReactionError,
  } = useFetch<CategoryReaction[], TReactToCategory>(reactionProvider.reactToCategory);
  const [categoriesCrupdateReaction, setCategoriesCrupdateReaction] = useState<Record<string, CategoryCrupdateReaction>>({});
  const { enqueueSnackbar } = useSnackbar();
  const onChangeFetch = useMemo(() => debounce((e: ChangeEvent<HTMLInputElement>) => fetch(e.target.value.length > 0 ? e.target.value : undefined), 1000), []);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const resetSearch = () => {
    if (inputRef.current) inputRef.current.value = '';
    fetch();
  };

  const reactToAllCategory = () => {
    reactToCategory(Object.values(categoriesCrupdateReaction)).then(() => {
      if (!categoryReactionError) {
        navigate(HOME_PAGE);
      } else {
        enqueueSnackbar(getErrorMessage(categoryReactionError), { className: 'bg-error' });
      }
    });
  };

  const reactOnCategory = (category: Category) => () => {
    const currentCategoryCrupdateReaction: CategoryCrupdateReaction = {
      categoryId: category.id,
      reactorId: getCached.userBackendId() || '',
      reactionStatus: ReactionStatus.LIKE,
    };
    const currentCategoriesCrupdateReaction = { ...categoriesCrupdateReaction, [category.id || '']: currentCategoryCrupdateReaction };

    if (category.reactionStatistics?.byCurrentUser === ReactionStatus.LIKE) {
      currentCategoriesCrupdateReaction[category.id || ''].reactionStatus = ReactionStatus.UNSET;
    }

    return setCategoriesCrupdateReaction(currentCategoriesCrupdateReaction);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className='flex items-center justify-center relative min-h-screen '>
      <div className='card w-full mx-2 sm:w-2/3 lg:w-1/3 xl:w-1/4 bg-white '>
        <h1 className='text-2xl text-center text-black font-bold mt-5 '>What are your interests ?</h1>
        <div className='card-body items-center text-center w-full'>
          <div className='w-full relative mb-4 text-'>
            <input
              type='text'
              placeholder='Search category'
              name='categorySearch'
              ref={inputRef}
              className='input input-bordered bg-white w-full rounded-full'
              onChange={onChangeFetch}
            />
            <span
              onClick={resetSearch}
              className='text-primary absolute text-md text-center right-10 bottom-1.5 top-1.5 rounded-xl text-xl px-3 py-2 cursor-pointer'
            >
              <IoClose />
            </span>
            <span className='absolute top-1/2 -translate-y-1/2 right-1 text-white bg-secondary p-2 rounded-full shadow-lg'>
              <GoSearchIcon size={24} />
            </span>
          </div>
          <div className='h-60 w-full overflow-y-auto p-3 flex relative gap-2 flex-wrap'>
            {categoryList &&
              categoryList.length > 0 &&
              !loadCategory &&
              categoryList.map(category => (
                <SoftButton
                  label={`${category.name}`}
                  active={category.reactionStatistics?.byCurrentUser === ReactionStatus.LIKE}
                  onClick={reactOnCategory(category)}
                  key={category.id}
                />
              ))}
            {categoryList && categoryList.length === 0 && !loadCategory && <p className='text-slate-400'>No category found.</p>}
            {loadCategory && (
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y1/2'>
                <BsTriangle className='animate-spin origin-center text-secondary' size={17} />
              </div>
            )}
          </div>
          <div>
            <button
              className='btn btn-outline mt-4 text-center rounded-3xl bg-primary text-white dark:hover:bg-primary self-right'
              style={{ minHeight: '5px', height: '40px', right: 0 }}
              data-cy='nextButton'
              onClick={reactToAllCategory}
            >
              Next <FaChevronRight />
              {categoryReactionLoading && (
                <span className='animate-spin'>
                  <BsTriangle className={`m-2 -translate-y-[1px]}`} size={17} />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
