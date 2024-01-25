import { createContext, useContext } from 'react';
import { SidebarContextType } from './types';

export const SidebarContext = createContext<SidebarContextType>({
  status: false,
  setStatus: () => {},
});

export const useSidebarContext = () => {
  const { setStatus, status } = useContext(SidebarContext);

  const toggleSidebar = () => setStatus(value => !value);
  const openSideBar = () => setStatus(true);
  const closeSideBar = () => setStatus(false);

  return {
    toggleSidebar,
    openSideBar,
    closeSideBar,
    isOpen: status,
  };
};
