import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { leaveServer } from "@/lib/appwrite/api";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import Loader from "../shared/Loader";
export const LeaveServerModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isOpen, data, type, onClose } = useModal();
  const { member: thisMember } = data;
  console.log(thisMember);

  const isModalOpen = isOpen && type === "leaveServer";
  const callLeaveServer = async () => {
    setIsLoading(true);
    const response = await leaveServer(thisMember!.$id);
    console.log(response);
    navigate("/servers/@me");
    setIsLoading(false);
    onClose();
    window.location.reload();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-primary dark:bg-[#1E1F22] p-0 overflow-hidden">
        <DialogHeader className="p-5">
          <DialogTitle className="text-[18px] px-0 font-bold pb-2">
            Leave '{thisMember?.servers?.name}'?
          </DialogTitle>
          <div>
            <Label className="text-sm text-zinc-500 dark:text-primary/70">
              Are you sure you want to leave {thisMember?.servers?.name}? You
              won't be able to join this server unless you are re-invited.
            </Label>
          </div>
        </DialogHeader>
        <DialogFooter className="right-0 down-0">
          <div className="flex w-full justify-end h-16 items-center mt-2 gap-x-2 bg-zinc-200 dark:bg-zinc-800">
            <Button
              className="w-20 h-10 hover:underline hover:underline-offset-2"
              variant="text"
              onClick={() => {
                onClose();
              }}
            >
              No
            </Button>
            <Button
              className="min-w-20 h-10 mr-8"
              variant="destructive"
              onClick={callLeaveServer}
            >
              {isLoading ? (
                <div className="flex gap-2">
                  <Loader color="white" /> Leaving...
                </div>
              ) : (
                "Yes"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
