import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import "@/index.css";
import { ThemeProvider } from "@/components/providers/theme-provider.tsx";
import AuthProvider from "@/context/AuthContext.tsx";
import { QueryProvider } from "@/lib/react-query/QueryProvider.tsx";
import { ModalProvider } from "./components/providers/modal-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="discord-theme">
        <QueryProvider>
          <AuthProvider>
            <ModalProvider />
            <App />
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
