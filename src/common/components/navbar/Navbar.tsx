import { FaUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { authProvider } from '../../../providers';
import { LOGIN_PAGE, PROFILE_PAGE } from '../../constants/paths';

const menu = [
  { label: 'Profile', path: PROFILE_PAGE, icon: <FaUser /> },
  { label: 'Logout', path: LOGIN_PAGE, action: authProvider.logout, icon: <MdLogout /> },
];

export const Navbar = () => {
  return (
    <div className='navbar fixed bg-white shadow-md z-50'>
      <div className='flex-1'>
        <Link to={'/'} className='text-secondary text-xl font-semibold tracking-wide ml-6'>
          BOOKWEL
        </Link>
      </div>
      <div className='flex-none gap-2'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link to='/chat'>Chatbot</Link>
          </li>
        </ul>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img alt='Tailwind CSS Navbar component' src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
          </div>
          <ul tabIndex={0} className='mt-3 z-[1] gap-2 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
            {menu.map(({ action, icon, label, path }) => (
              <li key={label}>
                <Link to={path} onClick={action} className='py-3 text-md flex bg-white'>
                  <span className='flex-1'>{label}</span>
                  {icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
