import { FC, ReactElement, cloneElement } from 'react';
import { TButtonProps } from './type';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { BsTriangle } from 'react-icons/bs';

export const Button: FC<TButtonProps> = ({ label, className, color = 'primary', icon, isLoading, disabled, ...others }) => {
  return (
    <div className='relative'>
      <button className={`btn btn-${color} text-center ${className} ${others}`} disabled={isLoading || disabled}>
        {icon && cloneElement(icon as ReactElement, { size: 17, className: 'm-2 -translate-y-[1px]' })}
        {label}
        {isLoading && (
          <span className='animate-spin'>
            <BsTriangle className={`m-2 -translate-y-[1px] text-${color}`} size={17} />
          </span>
        )}
      </button>
    </div>
  );
};
