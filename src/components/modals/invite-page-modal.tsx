import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { useUserContext } from "@/hooks/use-user-context";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { createMember } from "@/lib/appwrite/api";

export const InvitePageModal = () => {
  const { isOpen, data, type } = useModal();
  const { serverDetail } = data;
  const isModalOpen = isOpen && type === "invitation";
  const { user } = useUserContext();

  const acceptInvite = async () => {
    await createMember({
      role: "guest",
      servers: serverDetail?.$id ? serverDetail?.$id : "",
      userid: user?.accountid,
    }).then(
      (res) => {
        console.log(res);
        return res;
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="bg-background text-primary p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <div className="flex flex-col items-center gap-y-6">
            <div className="relative group flex justify-center bg-zinc-800 items-center mx-3 h-20 w-20  rounded-full overflow-hidden">
              {serverDetail?.imageUrl ? (
                <img
                  className="object-cover h-full w-full"
                  src={serverDetail?.imageUrl}
                  alt="image"
                />
              ) : (
                <div className="text-xl">
                  {serverDetail?.name.charAt(0)
                    ? serverDetail?.name.charAt(0) +
                      serverDetail?.name.split(" ")[1]?.charAt(0)
                    : ""}
                </div>
              )}
            </div>
            <DialogTitle className="text-md text-center font-thin text-primary/">
              You have been invited to join
            </DialogTitle>
            <Label className="text-lg font-bold dark:text-primary">
              {serverDetail?.name}
            </Label>
          </div>

          <div className="pt-3 pb-8">
            <div className="flex justify-center mt-2 gap-x-20 rounded-md">
              <Button
                className="w-20 h-7 mx-2"
                variant="indigo"
                onClick={acceptInvite}
              >
                Accept
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
