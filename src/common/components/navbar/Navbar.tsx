import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { LOGIN_PAGE } from '../../constants/path';
import { authProvider } from '../../../providers';

export const Navbar = () => {
  return (
    <div className='navbar fixed bg-white shadow-md z-50'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>daisyUI</a>
      </div>
      <div className='flex-none gap-2'>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img alt='Tailwind CSS Navbar component' src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
          </div>
          <ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
            <li>
              <Link to={LOGIN_PAGE} onClick={authProvider.logout} className='py-3 text-md flex bg-white'>
                <span className='flex-1'>Logout</span>
                <MdLogout />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
