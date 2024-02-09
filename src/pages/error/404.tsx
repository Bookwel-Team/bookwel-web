import { FaBook, FaChevronRight, FaRobot } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const pages = [
    {
      icon: <FaBook />,
      label: 'Home Page',
      description: 'Discover our incontestable book list.',
      url: '/books',
    },
    {
        icon: <FaRobot />,
        label: 'Chat book',
        description: 'Another point of view may be?',
        url: '/',
      },
  ];

  const navigate = useNavigate();
  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-white py-48'>
        <div className='flex flex-col'>
          <div className='flex flex-col items-center'>
            <div className='text-indigo-500 font-bold text-7xl'>404 ERROR</div>
            <div className='font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-5'>This page does not exist</div>
            <div className='text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-3'>The page you are looking for could not be found.</div>
          </div>
          <div className='flex flex-col mt-10'>
            <div className='text-gray-400 font-bold uppercase'>Continue With</div>
            {pages.map(page => (
              <div className='flex flex-col items-stretch mt-5' onClick={() => navigate(`${page.url}`)}>
                <div
                  className='flex flex-row group px-4 py-8
                    border-t hover:cursor-pointer
                    transition-all duration-200 delay-100'
                >
                  <div className='rounded-xl bg-blue-100 px-3 py-2 md:py-4' style={{ fontSize: '2rem' }}>
                    {page.icon}
                  </div>
                  <div className='grow flex flex-col pl-5 pt-2'>
                    <div className='font-bold text-sm md:text-lg lg:text-xl group-hover:underline'>{page.label}</div>
                    <div
                      className='font-semibold text-sm md:text-md lg:text-lg
                            text-gray-400 group-hover:text-gray-500
                            transition-all duration-200 delay-100'
                    >
                      {page.description}
                    </div>
                  </div>
                  <div className='text-gray-400 mdi-24px my-auto pr-2 group-hover:text-gray-700 transition-all duration-200 delay-100'>
                    <FaChevronRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
