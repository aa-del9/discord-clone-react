import { useEffect, useState } from "react";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "../modals/invite-modal";
import { InvitePageModal } from "../modals/invite-page-modal";
import { LeaveServerModal } from "../modals/leave-server-modal";
import { ServerSettingsModal } from "../modals/server-settings-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <InvitePageModal />
      <LeaveServerModal />
      <ServerSettingsModal />
    </>
  );
};
