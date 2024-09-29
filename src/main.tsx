import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./features/auth/presentation/pages/Error";

import Home from "./features/auth/presentation/pages/Home";


import { Provider } from "react-redux";
import { store } from "./core/redux/store";
// import App from "./App";
import LoginPage from "./features/auth/presentation/pages/LoginPage";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <DependencyProvider> */}
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="Home" element={<Home />} />
        </Routes>
      </Provider>
      {/* </DependencyProvider> */}

    </BrowserRouter>
  </StrictMode>
);
