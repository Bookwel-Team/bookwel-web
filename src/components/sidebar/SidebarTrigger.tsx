import { FC } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSidebarContext } from '..';
import { SidebarTriggerProps } from './types';

export const SidebarTrigger: FC<SidebarTriggerProps> = props => {
  const { toggleSidebar, isOpen } = useSidebarContext();
  const { className, ...others } = props;

  return (
    <span
      {...others}
      onClick={toggleSidebar}
      className={`${className} p-2 bg-sidebar rounded-full -translate-x-1/2 cursor-pointer hover:scale-110 hover:-translate-x-1/3 text-neutral transition-all duration-200`}
    >
      {!isOpen ? <FaChevronRight /> : <FaChevronLeft />}
    </span>
  );
};
