'use client';

import SoftButton from '../../utilities/components/button/SoftButton';
import { GoSearch as GoSearchIcon } from 'react-icons/go';
import { FaChevronRight } from 'react-icons/fa';
import { useFetch } from '../../utilities/hooks';
import { Category, CrupdateReaction, ReactionStatus } from '@onitsiky/bookwel-typescript-client';
import { TCategory, TReaction } from '../../providers';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../utilities/context/auth-context';
import { IoClose } from 'react-icons/io5';
import { reactionProvider, categoryProvider } from '../../providers';
import { BsTriangle } from 'react-icons/bs';

type ReactableCategory = Category & CrupdateReaction;

export const CategoryPage = () => {
  const [resultSearch, setResult] = useState<ReactableCategory[]>([]);
  const [reactableCategory, setReactable] = useState<ReactableCategory[]>([]);

  const [isLoading, setLoad] = useState(false);
  const { fetch: reactCat } = useFetch<Category, TReaction>(reactionProvider.reactCategory);

  const { fetch, data: categoryList, isLoading: loadCategory } = useFetch<Category[], TCategory>(categoryProvider.getAll);
  const { uid: userId } = useAuth();
  const reactableTemplate: CrupdateReaction = {
    reactor_id: userId,
    reaction_status: ReactionStatus.UNSET,
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const localSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const newList = reactableCategory?.reduce(
      (list, category) => (category.name?.toLocaleLowerCase().includes(name.toLocaleLowerCase()) ? [...list, category] : [...list]),
      [] as Category[]
    ) as Category[];
    setResult(newList);
  };

  const resetSearch = () => {
    setResult([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  const categoryToReactable = (category: Category) => {
    return { ...reactableTemplate, ...category };
  };

  const reactAllCategory = () => {
    setLoad(true);
    reactableCategory.forEach(one => {
      reactCat(one.id as string, one);
    });

    setLoad(false);
  };

  const reactOneCategory = (category: ReactableCategory) => {
    const one = { ...category };
    one.reaction_status = one.reaction_status === ReactionStatus.LIKE ? ReactionStatus.UNSET : ReactionStatus.LIKE;
    setReactable(prev => prev.map(item => (item.id === category.id ? one : item)));
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (categoryList) {
      setReactable(categoryList.map(one => categoryToReactable(one)));
    }
  }, [categoryList, setReactable, categoryToReactable]);

  return (
    <div className='flex items-center justify-center relative min-h-screen '>
      <div className='card w-96 bg-white '>
        <h1 className='text-2xl text-center text-black font-bold mt-5 '>What are your interests ?</h1>
        <div className='card-body items-center text-center w-full'>
          <div className='w-full relative mb-4 text-'>
            <input
              type='text'
              placeholder='Search category'
              ref={inputRef}
              name='categorySearch'
              className='input input-bordered bg-white w-full rounded-full'
              onChange={localSearch}
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
          <div className='btn-group space-y-2 space-x-2 max-h-60 p-3 overflow-y-auto'>
            {resultSearch.length > 0
              ? resultSearch?.map(one => (
                  <SoftButton
                    label={`${one.name}`}
                    active={one.reaction_status === ReactionStatus.LIKE}
                    clickFn={() => reactOneCategory(one)}
                    key={`©at-${one.id}`}
                  />
                ))
              : reactableCategory?.map(one => (
                  <SoftButton
                    label={`${one.name}`}
                    active={one.reaction_status === ReactionStatus.LIKE}
                    clickFn={() => reactOneCategory(one)}
                    key={`©at-search-${one.id}`}
                  />
                ))}
            {loadCategory && (
              <span className='animate-spin'>
                <BsTriangle className={`m-2 -translate-y-[1px]}`} size={17} />
              </span>
            )}
          </div>
          <div>
            <button
              className='btn btn-outline mt-4 text-center rounded-3xl bg-primary text-white dark:hover:bg-primary self-right'
              style={{ minHeight: '5px', height: '40px', right: 0 }}
              onClick={reactAllCategory}
            >
              Next <FaChevronRight />
              {isLoading && (
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
