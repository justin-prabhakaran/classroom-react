import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import LoginPage from './features/auth/presentation/pages/LoginPage';


const router = createBrowserRouter([
  {
    path : "/login",
    element : <LoginPage />
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
