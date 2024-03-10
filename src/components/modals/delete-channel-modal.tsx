import { useState } from "react";
import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useServerContext } from "@/hooks/use-server-context";

export const DeleteChannelModal = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { isOpen, onClose, data, type } = useModal();
  const { channel } = data;
  const { updateDeleteChannel } = useServerContext();
  const isModalOpen = isOpen && type === "deleteChannel";

  const onModalClose = () => {
    onClose();
  };

  const deleteChannel = async () => {
    setLoading(true);
    console.log(channel?.$id);

    const deletedChannel = await updateDeleteChannel(channel!.$id);
    console.log(deletedChannel);
    setLoading(false);
    onClose();
    console.log("error");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent className="bg-white text-primary dark:bg-[#1E1F22] p-0 overflow-hidden">
        <DialogHeader className=" p-5">
          <DialogTitle className="text-[18px] px-0 font-bold pb-2">
            Delete Channel
          </DialogTitle>
          <div>
            <Label className="text-sm text-zinc-500 dark:text-primary/70">
              Are you sure you want to delete #
              <span className="font-extrabold text-md">{channel?.name}</span>?
              This cannot be undone.
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
              onClick={deleteChannel}
              className=" min-w-20 h-10 mr-8"
              variant="destructive"
            >
              {isLoading ? (
                <div className="flex gap-2">
                  <Loader color="white" /> Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
