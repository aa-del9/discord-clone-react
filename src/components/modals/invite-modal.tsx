import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { useUserContext } from "@/hooks/use-user-context";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export const InviteModal = () => {
  const { isOpen, onClose, data, type } = useModal();
  const { servers } = data;
  const { user } = useUserContext();
  const [isCopied, setIsCopied] = useState(false);
  console.log(user);
  const isModalOpen = isOpen && type === "invite";
  const origin = useOrigin();
  const inviteUrl = origin + "/invite/" + servers?.inviteCode;

  const onCopy = () => {
    setIsCopied(true);
    console.log("copied");
    navigator.clipboard.writeText(inviteUrl);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite friends to server
          </DialogTitle>
          <div className="p-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Server Invite Link
            </Label>
            <div className="flex items-center mt-2 gap-x-2 bg-zinc-700 rounded-md">
              <Input
                disabled
                className="bg-transparent border-transparent text-primary"
                value={inviteUrl}
              />

              <Button
                onClick={onCopy}
                className="w-20 h-7 mx-2"
                variant="indigo"
              >
                {isCopied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
