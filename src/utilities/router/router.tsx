import { createBrowserRouter } from 'react-router-dom';
import { Books, Home, SignIn, SignUp, CategoryPage } from '../../pages';
import { AuthLayout, NeedAuth } from '../Layouts';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <NeedAuth />,
    children: [
      {
        path: '/books',
        element: <Books />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
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
  },
]);
