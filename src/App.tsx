import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './utilities/router';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
      <RouterProvider router={AppRouter} />
    </SnackbarProvider>
  );
}

export default App;
