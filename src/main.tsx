import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./routes/auth/AuthPage.tsx";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <AuthPage toRegister={false} /> },
  { path: "/register", element: <AuthPage toRegister={true} /> },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="discord-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
