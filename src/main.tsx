import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import DependencyProvider from "./DependencyProvider";
import UserProvider from "./UserProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./features/auth/presentation/pages/Error";
import App from "./features/auth/presentation/pages/LoginPage";
import Home from "./features/auth/presentation/pages/Home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DependencyProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/homepage"  element= { <Home /> } />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserProvider>
      </DependencyProvider>

    </BrowserRouter>
  </StrictMode>
);
