import { FC, useState } from 'react';

type ButtonPropsType = {
  label: string;
  active?: boolean;
  clickFn: () => void;
};

const SoftButton: FC<ButtonPropsType> = ({ label, active, clickFn }) => {
  const [isActive, setIsActive] = useState<boolean>(active || false);
  return (
    <button
      onClick={() => {
        clickFn();
        setIsActive(!isActive);
      }}
      className={`btn ${isActive ? 'btn-primary dark:hover:text-primary dark:hover:bg-neutral' : 'bg-neutral dark:hover:bg-primary dark:hover:text-white'} rounded-none`}
    >
      {label}
    </button>
  );
};

export default SoftButton;
