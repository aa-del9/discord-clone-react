import { useParams } from "react-router-dom";

const InvitePage = () => {
  const params = useParams();
  return (
    <div className="w-[100vw] h-[100vh] bg-[url('/assets/background.png')] bg-cover">
      <div>{params.inviteCode}</div>
    </div>
  );
};

export default InvitePage;
