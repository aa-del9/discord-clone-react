import { useState } from "react";
import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { leaveServer } from "@/lib/appwrite/api";
import Loader from "../shared/Loader";
export const KickMemberModal = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { isOpen, onClose, data, type } = useModal();
  const { member } = data;
  const isModalOpen = isOpen && type === "kickMember";

  const onModalClose = () => {
    onClose();
  };

  const kickMember = async () => {
    setLoading(true);
    const res = await leaveServer(member?.$id ? member?.$id : "");
    console.log(res);
    if (res.$id) {
      onModalClose();
      setLoading(false);
      return;
    }
    setLoading(false);
    console.log("error");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent className="bg-white text-primary dark:bg-[#1E1F22] p-0 overflow-hidden">
        <DialogHeader className=" p-5">
          <DialogTitle className="text-[18px] px-0 font-bold pb-2">
            Kick @{member?.userid?.displayName} from the server
          </DialogTitle>
          <div>
            <Label className="text-sm text-zinc-500 dark:text-primary/70">
              Are you sure you want to kick {member?.userid?.displayName} from
              the server? They will be able to join with a new invite link.
            </Label>
          </div>
        </DialogHeader>
        <DialogFooter className="right-0 down-0">
          <div className="flex w-full justify-end h-16 items-center mt-2 gap-x-2 bg-zinc-200 dark:bg-zinc-800">
            <Button
              onClick={onModalClose}
              className="w-20 h-10 hover:underline hover:underline-offset-2"
              variant="text"
            >
              Cancel
            </Button>
            <Button
              onClick={kickMember}
              className=" min-w-20 h-10 mr-8"
              variant="destructive"
            >
              {isLoading ? (
                <div className="flex gap-2">
                  <Loader color="white" /> Kicking...
                </div>
              ) : (
                "Kick"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
