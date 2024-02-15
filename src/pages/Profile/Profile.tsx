export const Profile = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='h-2/3 w-1/2 bg-white rounded-lg shadow-md relative p-10'>
        <div className='skeleton h-40 w-40 rounded-full top-0 -translate-y-1/2 absolute left-[10%]'>
          {/* <img
            src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
            alt='profile-image'
            className='object-cover h-40 w-40 rounded-full z-0'
          /> */}
        </div>
        <div className='h-10'></div>
        <div className='h-20  my-3 skeleton'></div>
        <div className='h-20 bg-slate-300 my-3'></div>
        <div className='h-20 bg-slate-300 my-3'></div>
      </div>
    </div>
  );
};
