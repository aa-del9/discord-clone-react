import { useModal } from "@/hooks/use-model-store";
import { getServerInfoFromInviteCode } from "@/lib/appwrite/api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const InvitePage = () => {
  const params = useParams();
  const { onOpen } = useModal();
  useEffect(() => {
    getServerInfoFromInviteCode(
      params?.inviteCode ? params?.inviteCode : ""
    ).then((response) => {
      console.log(response);
      onOpen("invitation", { serverDetail: response });
    });
  }, []);
  return (
    <div className="w-[100vw] h-[100vh] bg-[url('/assets/background.png')] bg-cover" />
  );
};

export default InvitePage;
