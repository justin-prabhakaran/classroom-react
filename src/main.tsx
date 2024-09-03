import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import LoginPage from './features/auth/presentation/pages/LoginPage';
import Error from './features/auth/presentation/pages/Error';


const router = createBrowserRouter([
  {
    path : "/",
    element : <LoginPage />
  },
  {
    path:'*',
    element: <Error />
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
