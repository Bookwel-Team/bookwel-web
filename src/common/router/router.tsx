import { createBrowserRouter } from 'react-router-dom';
import { Books, Home, SignIn, SignUp, CategoryPage, NotFound, Profile } from '../../pages';
import { AuthLayout, NeedAuth } from '../Layouts';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <NeedAuth />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
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
