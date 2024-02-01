import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./routes/auth/AuthPage";
import LoginForm from "@/routes/auth/LoginForm";
import RegisterForm from "@/routes/auth/RegisterForm";
import HomePage from "@/routes/_root/HomePage";
import PrivateRoutes from "@/lib/utils/PrivateRoutes";
import RootLayout from "@/routes/_root/RootLayout";

const App = () => {
  return (
    <main>
      <Routes>
        <Route element={<AuthPage />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route index element={<RootLayout />} />
          {/* <Route path="/app" element={<SplashScreen />} /> */}
          <Route path="/app" element={<HomePage />} />
        </Route>
      </Routes>
      {/* <p className="underline">discord clone</p>
      <Button
        onClick={() => {
          navigate("/login");
        }}
      >
        Click me
      </Button> */}
    </main>
  );
};

export default App;
