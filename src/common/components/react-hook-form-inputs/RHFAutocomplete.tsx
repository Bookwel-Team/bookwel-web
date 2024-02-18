import { ChangeEvent, useRef, useState } from 'react';
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { BsTriangle } from 'react-icons/bs';
import { useFormContext } from 'react-hook-form';
import { InputAutocomplete } from './types';

export const RHFAutocomplete = (props: InputAutocomplete) => {
  const { items, label, onChange, resetValue, loadItems, name, ...others } = props;
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const { watch, setValue } = useFormContext();

  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = '';
    resetValue();
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setOpen(true);
  };
  const onClick = (item: string) => {
    setValue(name, item);
  };
  return (
    <div className='my-3 w-full relative'>
      <div className='text-neutral label'>
        <span className='label-text'>{label}</span>
        {watch(name) && <span className=' label-text rounded-xl p-1 ' style={{border: '1px solid black'}}>{watch(name)}</span>}
      </div>
      <div ref={ref} className='relative w-full'>
        <input
          {...others}
          type='text'
          ref={inputRef}
          placeholder='Search category'
          name={name}
          className='input input-bordered bg-white w-full rounded-full'
          onChange={inputChange}
        />
        <span
          onClick={resetInput}
          className='text-primary absolute text-md text-center right-10 bottom-1.5 top-1.5 rounded-xl text-xl px-3 py-2 cursor-pointer'
        >
          <IoClose />
        </span>
        <span className='absolute top-1.5 bottom-1.5 right-1 p-2 cursor-pointer' onClick={() => setOpen(!open)} data-cy='autocomplete-show'>
          {open ? <IoMdArrowDropupCircle size={24} /> : <IoMdArrowDropdownCircle size={24} />}
        </span>

        {open &&
          (items && items.length > 0 ? (
            <div className='dropdown-content bg-gray-400 text-white top-14  max-h-96 overflow-auto flex-col rounded-md absolute z-10 w-full'>
              <ul className='menu menu-compact ' style={{ width: ref.current?.clientWidth }}>
                {items.map((item, index) => {
                  return (
                    <li
                      key={index}
                      tabIndex={index + 1}
                      onClick={() => {
                        onClick(item);
                        setOpen(false);
                      }}
                      className='border-b border-b-base-content/10 w-full dark:hover:bg-gray-300'
                    >
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
              {loadItems && (
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y1/2'>
                  <BsTriangle className='animate-spin origin-center text-secondary' size={17} />
                </div>
              )}
            </div>
          ) : (
            <p className='text-slate-400'>No category found.</p>
          ))}
      </div>
    </div>
  );
};
