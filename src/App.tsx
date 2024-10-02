import {useDispatch} from "react-redux";
import {AppDispatch} from "./core/redux/store.tsx";
import {useEffect} from "react";
import {getCurrentUser} from "./features/auth/redux/AuthActions.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./features/auth/presentation/pages/LoginPage.tsx";
import Home from "./features/auth/presentation/pages/Home.tsx";
import ErrorPage from "./features/auth/presentation/pages/Error.tsx";
import ProtectedRoute from "./features/auth/presentation/pages/ProtectedRoute.tsx";

function App() {
    const dispatch : AppDispatch = useDispatch();

    useEffect(() => {
        const init =  async () => {
            try {
                await dispatch(getCurrentUser());
            }
            catch (e){
                console.error(e);
            }
        }
        init();
    }, [dispatch]);

    return (
        <BrowserRouter>

                <Routes>
                    <Route path="/" element={<LoginPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="Home" element={<Home />} />
                    </Route>

                    <Route path="*" element={<ErrorPage/>} />
                </Routes>

        </BrowserRouter>
    )
}

export default App
