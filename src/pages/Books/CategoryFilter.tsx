/* eslint-disable react-hooks/exhaustive-deps */
import { Category } from '@onitsiky/bookwel-typescript-client';
import { FC, useEffect, useState } from 'react';
import { TGetAllCategory } from '../../providers';
import { categoryProvider } from '../../providers/category-provider';
import { useFetch } from '../../utilities/hooks';
import { CategoryFilterProps } from '.';
import style from './style.module.css';

export const CategoryFilter: FC<CategoryFilterProps> = ({ onChange }) => {
  const { data, fetch, isLoading } = useFetch<Category[], TGetAllCategory>(categoryProvider.getAll);

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (data === null && !isLoading) {
      fetch();
    }
  }, []);

  const handleChange = (category: Category) => () => {
    setCurrentCategory(category);
  };

  useEffect(() => {
    if (currentCategory) {
      onChange({ ...currentCategory, name: currentCategory.name === 'None' ? undefined : currentCategory.name });
    }
  }, [currentCategory]);

  return (
    <div className={style.categoryFilterContainer}>
      <div className='flex justify-start items-center w-max'>
        {data &&
          data.length > 0 &&
          !isLoading &&
          [{ name: 'None' } as Category, ...data].map(category => (
            <div
              onClick={handleChange(category)}
              key={category.name}
              className={`py-3 px-5 border cursor-pointer border-secondary mx-2 ${currentCategory?.id === category.id ? 'bg-secondary text-white' : 'text-secondary'}`}
            >
              <p className={style.filterLabel}>{category.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
