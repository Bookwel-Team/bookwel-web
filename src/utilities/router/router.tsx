import { createBrowserRouter } from 'react-router-dom';
import { Home, SignIn, SignUp } from '../../pages';
import { AuthLayout } from '../Layouts';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: 'error',
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
]);
