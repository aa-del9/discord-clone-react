import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export const InviteModal = () => {
  const { isOpen, onClose, data, type } = useModal();
  const { serverDetail } = data;
  const [isCopied, setIsCopied] = useState(false);
  const isModalOpen = isOpen && type === "invite";
  const origin = useOrigin();
  const inviteUrl = origin + "/invite/" + serverDetail?.inviteCode;

  const onCopy = () => {
    setIsCopied(true);
    console.log("copied");
    navigator.clipboard.writeText(inviteUrl);
  };

  const onModalClose = () => {
    onClose();
    setIsCopied(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
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
                id="inviteUrlInput"
                className="bg-transparent border-transparent text-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                value={inviteUrl}
                readOnly
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
