import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./routes/auth/AuthPage";
import LoginForm from "@/routes/auth/LoginForm";
import RegisterForm from "@/routes/auth/RegisterForm";
import PrivateRoutes from "@/lib/utils/PrivateRoutes";
import RootLayout from "@/routes/main/RootLayout";
import ServerIdLayout from "./routes/main/servers/ServerIdLayout";
import InvitePage from "./routes/invite/InvitePage";

const App = () => {
  return (
    <main className="h-[100vh]">
      <Routes>
        <Route element={<AuthPage />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<RootLayout />}>
            <Route path="/servers/:serverId" element={<ServerIdLayout />} />
          </Route>
          <Route path="/invite/:inviteCode" element={<InvitePage />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
