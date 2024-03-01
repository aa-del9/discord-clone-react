import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import "@/index.css";
import { ThemeProvider } from "@/components/providers/theme-provider.tsx";
import AuthProvider from "@/context/AuthContext.tsx";
import { QueryProvider } from "@/lib/react-query/QueryProvider.tsx";
import { ModalProvider } from "./components/providers/modal-provider";
import ServerProvider from "./context/ServerContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="light" storageKey="discord-theme">
      <QueryProvider>
        <AuthProvider>
          <ServerProvider>
            <ModalProvider />
            <App />
          </ServerProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  </BrowserRouter>
);
