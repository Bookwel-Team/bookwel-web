import { FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  return (
    <div className='navbar bg-gray-800 bg-opacity-75 sticky top-0'>
      <div className='container mx-auto'>
        <div className='flex-1'>
          <Link className='btn btn-ghost text-xl' to='/'>
            bookKwell
          </Link>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link className='' to='/auth/signin'>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
