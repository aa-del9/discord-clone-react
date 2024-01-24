import LoginModal from "@/components/modals/LoginModal";
interface LoginPageProps {
  toRegister: boolean;
}
const LoginPage = ({ toRegister }: LoginPageProps) => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[url('/assets/background.png')] bg-cover">
      {toRegister ? null : <LoginModal />}
    </div>
  );
};

export default LoginPage;
