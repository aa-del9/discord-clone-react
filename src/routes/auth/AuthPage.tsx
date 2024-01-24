import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
interface LoginPageProps {
  toRegister: boolean;
}
const AuthPage = ({ toRegister }: LoginPageProps) => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[url('/assets/background.png')] bg-cover">
      {toRegister ? <RegisterModal /> : <LoginModal />}
    </div>
  );
};

export default AuthPage;
