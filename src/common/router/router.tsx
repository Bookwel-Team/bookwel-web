import { createBrowserRouter } from 'react-router-dom';
import { Books, Chatbot, SignIn, SignUp, CategoryPage, NotFound, Profile, Home, UploadBook } from '../../pages';
import { AuthLayout, NeedAuth } from '../Layouts';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/',
    element: <NeedAuth />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/chat',
        element: <Chatbot />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/upload-book',
        element: <UploadBook />
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/auth/signin',
        element: <SignIn />,
      },
      {
        path: '/auth/signup',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/categories',
    element: <CategoryPage />,
    errorElement: <NotFound />,
  },
]);
