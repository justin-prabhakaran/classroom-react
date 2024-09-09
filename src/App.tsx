
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './features/auth/presentation/pages/Error';
import LoginPage from './features/auth/presentation/pages/LoginPage';


function App() {


  return (
    <>
    <BrowserRouter>
        <Routes>
            
            <Route path='/' element= {<LoginPage />}/>
            
            <Route path='*' element= {<ErrorPage/>}/>
            
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App