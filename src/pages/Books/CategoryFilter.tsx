import { Category } from '@onitsiky/bookwel-typescript-client';
import { FC, useEffect, useState } from 'react';
import { TGetAllCategory } from '../../providers';
import { categoryProvider } from '../../providers/category-provider';
import { useFetch } from '../../utilities/hooks';
import { CategoryFilterProps } from '.';

export const CategoryFilter: FC<CategoryFilterProps> = ({ onChange }) => {
  const { data, fetch, isLoading } = useFetch<Category[], TGetAllCategory>(categoryProvider.getAll);

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (data === null && !isLoading) {
      fetch();
    }
  }, []);

  const handleChange = (category: Category) => () => {
    setCurrentCategory(currentCategory);
    onChange(category);
  };

  return (
    <div>
      {data &&
        data.length > 0 &&
        !isLoading &&
        data.map(category => (
          <span
            onClick={handleChange(category)}
            key={category.id}
            className={`py-3 px-5 border cursor-pointer border-secondary mx-2 ${currentCategory?.id === category.id ? 'bg-secondary text-white' : 'text-secondary'}`}
          >
            <span className=''>{category.name}</span>
          </span>
        ))}
    </div>
  );
};
