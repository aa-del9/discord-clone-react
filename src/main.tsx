import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./routes/auth/AuthPage.tsx";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import HomePage from "./routes/home/HomePage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <AuthPage toRegister={false} /> },
  { path: "/register", element: <AuthPage toRegister={true} /> },
  { path: "/app", element: <HomePage /> },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="discord-theme">
      <QueryProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
