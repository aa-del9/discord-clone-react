import { useModal } from "@/hooks/use-model-store";
import { useUserContext } from "@/hooks/use-user-context";
import { getServerInfoFromInviteCode } from "@/lib/appwrite/api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const InvitePage = () => {
  const params = useParams();
  const { user } = useUserContext();
  const { onOpen } = useModal();
  useEffect(() => {
    getServerInfoFromInviteCode(params.inviteCode!).then((response) => {
      console.log(response, !user?.$id);
      user?.$id && onOpen("invitation", { serverDetail: response });
    });
  }, []);
  return (
    <div className="w-[100vw] h-[100vh] bg-[url('/assets/background.png')] bg-cover" />
  );
};

export default InvitePage;
