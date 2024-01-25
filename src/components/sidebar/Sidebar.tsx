import { FC, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { SidebarContext, useSidebarContext } from './context';
import { SidebarProviderProps } from './types';

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [status, setStatus] = useState(true);
  return <SidebarContext.Provider value={{ status, setStatus }}>{children}</SidebarContext.Provider>;
};

export const SideBar = () => {
  const { isOpen } = useSidebarContext();
  return (
    <div
      className={`basis-[20rem] bg-sidebar h-screen relative transition-all duration-200 items-center flex flex-col overflow-hidden ${!isOpen && 'basis-[5rem]'}`}
    >
      <div className='w-full text-purple-400 flex items-center absolute text-nowrap flex-shrink left-0 top-8'>
        <div
          className={`shrink-0  flex justify-center items-center transition-all duration-500 bg-white mr-5 m-2 ${isOpen ? 'rounded-[50%]  w-[3.9rem] h-[3.9rem] ' : 'w-[3.9rem] rounded-md h-[3.9rem]'}`}
        >
          <FaUser className='text-2xl' />
        </div>
        {<span className={` text-lg text-white transition-all duration-200`}>This is the title</span>}
      </div>
    </div>
  );
};
