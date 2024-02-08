import { FC, ReactElement, cloneElement } from 'react';
import { BsTriangle } from 'react-icons/bs';
import { TButtonProps } from './type';

export const Button: FC<TButtonProps> = ({ label, className, color = 'primary', icon, isLoading, disabled, ...others }) => {
  const buttonColor = `btn-${color}`;

  return (
    <div className='relative'>
      <button className={`btn ${buttonColor} text-center ${className} ${others}`} disabled={isLoading || disabled}>
        {icon &&
          cloneElement(icon as ReactElement, {
            size: 17,
            className: 'm-2 -translate-y-[1px]',
          })}
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
