/* eslint-disable react-hooks/exhaustive-deps */
import { Category, CategoryCrupdateReaction, CategoryReaction, ReactionStatus } from '@onitsiky/bookwel-typescript-client';
import debounce from 'debounce';
import { useSnackbar } from 'notistack';
import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';
import { BsTriangle } from 'react-icons/bs';
import { FaSave } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { CategoryEditionProps } from '.';
import { Button, SoftButton } from '../../common/components';
import { useFetch } from '../../common/hooks';
import { getCached, getErrorMessage } from '../../common/utils';
import { TCategory, TReactToCategory, categoryProvider, reactionProvider } from '../../providers';

export const CategoryEdition: FC<CategoryEditionProps> = ({ selectedCategories, action, onDone }) => {
  const { fetch, data: categoryList, isLoading: loadCategory } = useFetch<Category[], TCategory>(categoryProvider.getAll);
  const {
    fetch: reactToCategory,
    isLoading: categoryReactionLoading,
    error: categoryReactionError,
  } = useFetch<CategoryReaction[], TReactToCategory>(reactionProvider.reactToCategory);
  const [categoriesCrupdateReaction, setCategoriesCrupdateReaction] = useState<Record<string, CategoryCrupdateReaction>>(selectedCategories || {});
  const { enqueueSnackbar } = useSnackbar();

  const onChangeFetch = useMemo(() => debounce((e: ChangeEvent<HTMLInputElement>) => fetch(e.target.value.length > 0 ? e.target.value : undefined), 1000), []);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetSearch = () => {
    if (inputRef.current) inputRef.current.value = '';
    fetch();
  };

  const reactToAllCategory = () => {
    reactToCategory(Object.values(categoriesCrupdateReaction)).then(() => {
      if (!categoryReactionError) {
        onDone && onDone();
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

    if (!!categoriesCrupdateReaction[category.id || ''] && categoriesCrupdateReaction[category.id || ''].reactionStatus === ReactionStatus.LIKE) {
      currentCategoryCrupdateReaction.reactionStatus = ReactionStatus.UNSET;
    }

    const currentCategoriesCrupdateReaction = { ...categoriesCrupdateReaction, [category.id || '']: currentCategoryCrupdateReaction };

    return setCategoriesCrupdateReaction(currentCategoriesCrupdateReaction);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className='w-11/12'>
      <div className='w-full relative mb-7'>
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
          <GoSearch size={24} />
        </span>
      </div>
      <div className='min-h-[40vh]'>
        <div className='max-h-[60vh] w-full overflow-y-auto p-3 flex relative gap-2 flex-wrap justify-start items-start'>
          {categoryList &&
            categoryList.length > 0 &&
            !loadCategory &&
            categoryList.map(category => (
              <SoftButton
                label={`${category.name}`}
                active={category.reactionStatistics?.byCurrentUser === ReactionStatus.LIKE || (selectedCategories && !!selectedCategories[category.id || ''])}
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
      </div>
      <div className='w-full flex justify-between'>
        {action}
        <Button icon={<FaSave />} label='Save' onClick={reactToAllCategory} isLoading={categoryReactionLoading} />
      </div>
    </div>
  );
};
