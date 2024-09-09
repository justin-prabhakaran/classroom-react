import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import DependencyProvider from './Dependency';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DependencyProvider>
        <App />
    </DependencyProvider>
  </StrictMode>,
)
