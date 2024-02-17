import { AiResponse } from '@onitsiky/bookwel-typescript-client';
import { ChangeEvent, useState } from 'react';
import { BsRobot as BsRobotIcon, BsTriangle } from 'react-icons/bs';
import BACKGROUND from '../../assets/banner-bg.jpg';
import Logo from '../../assets/logo-no-bg.png';
import { aiProvider } from '../../providers/ai-provider';

export const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatResponse, setChatResponse] = useState<AiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setCurrentMessage(message);
      setMessage('');
      if (message) {
        const res = await aiProvider.chat(message);
        setChatResponse(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div style={{ backgroundImage: `url(${BACKGROUND})` }} className='bg-cover bg-no-repeat flex justify-center items-center h-[93.4vh]'>
      <div className='h-5/6 flex justify-center items-center'>
        <div className='p-10 glass text-gray-100 rounded-box text-center h-full overflow-hidden max-w-[95vw]'>
          <h1 className='text-7xl mb-4'>BookWel</h1>
          {!chatResponse.length || !currentMessage ? (
            <>
              <div className=''>
                <img src={Logo} alt='BookWel logo' className='mx-auto' />
              </div>
              <div className='mb-4 text-left'>
                <p>Welcome to BookWel, your personalized book recommendation app!</p>
                <p>Tired of wandering aimlessly in literary landscapes?</p>
                <p>BookWel takes the guesswork out of finding your next captivating read. </p>
                <p>Powered by intelligent algorithms and curated by bibliophiles like you, it's your own personal librarian in your pocket.</p>
              </div>
            </>
          ) : (
            <div className='mb-4 text-left h-[65%]'>
              <p>You: {currentMessage}</p>
              <br />
              <p>Here are some results for your query</p>
              <div className='mt-2 overflow-scroll overflow-x-hidden scrollbar-hide h-full'>
                {chatResponse.map(item => (
                  <div className='collapse collapse-arrow bg-base-200 my-1'>
                    <input type='radio' name='my-accordion-2' />
                    <div className='collapse-title text-xl font-medium'>
                      {item.title}
                      <p className='font-thin font-xs'>
                        by {item.author} - {item.category}
                      </p>
                    </div>
                    <div className='collapse-content'>
                      <p>Synopsis: </p>
                      <p>{item.synopsis}</p>
                      <br />
                      <p>Why this book?</p>
                      <p>{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className='absolute bottom-3 left-1/2 -translate-x-1/2 w-11/12'>
            <div className='w-full relative'>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  onChange={handleChange}
                  placeholder='Message Chat...'
                  name='chatbot-input'
                  className='input input-bordered bg-white w-full text-gray-500 rounded-full'
                  value={message}
                />
                <span className='absolute top-1/2 -translate-y-1/2 right-1 text-white bg-secondary p-2 rounded-full shadow-lg' data-cy='bot-btn'>
                  {isLoading ? <BsTriangle className='m-2 animate-spin text-primary' size={24} /> : <BsRobotIcon onClick={handleSubmit} size={24} />}
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
