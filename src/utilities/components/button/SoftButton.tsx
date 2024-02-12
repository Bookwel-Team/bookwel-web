import { FC, useState } from 'react';

type ButtonPropsType = {
  label: string;
  active?: boolean;
  onClick: () => void;
};

const SoftButton: FC<ButtonPropsType> = ({ label, active, onClick }) => {
  const [isActive, setIsActive] = useState<boolean>(active || false);
  return (
    <button
      onClick={() => {
        onClick();
        setIsActive(!isActive);
      }}
      className={`btn ${isActive ? 'btn-primary dark:hover:text-primary dark:hover:bg-neutral' : 'bg-neutral dark:hover:bg-primary dark:hover:text-white'} flex-grow rounded-none`}
    >
      {label}
    </button>
  );
};

export default SoftButton;
