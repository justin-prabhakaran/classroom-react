import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import DependencyProvider from "./DependencyProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./features/auth/presentation/pages/Error";
import App from "./features/auth/presentation/pages/LoginPage";
import Home from "./features/auth/presentation/pages/Home";


import { Provider } from "react-redux";
import { store } from "./core/redux/store";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DependencyProvider>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/homepage" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Provider>
      </DependencyProvider>

    </BrowserRouter>
  </StrictMode>
);
