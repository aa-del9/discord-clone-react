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
import { checkIfMember, createMember } from "@/lib/appwrite/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const InvitePageModal = () => {
  const navigate = useNavigate();
  const { isOpen, data, type, onClose } = useModal();
  const { serverDetail } = data;
  const isModalOpen = isOpen && type === "invitation";
  const { user } = useUserContext();
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const acceptInvite = async () => {
    await checkIfMember(
      user?.accountid ? user?.accountid : "",
      serverDetail?.$id ? serverDetail?.$id : ""
    ).then(
      (res) => {
        console.log(res);

        res !== undefined
          ? console.log("Already a member")
          : createMember({
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
        setIsJoined(true);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const redirectToServer = () => {
    navigate("/servers/" + serverDetail?.$id);
    onClose();
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="bg-background text-primary p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <div className="flex flex-col items-center gap-y-6">
            {!isJoined ? (
              <>
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
              </>
            ) : (
              <>
                <DialogTitle className="text-lg text-center font-bold text-primary/">
                  Server joined
                </DialogTitle>
                <Label className="text-md font-thin text-center w-[360px] dark:text-primary/70">
                  We have beamed the info to your Discord app. You can continue
                  to your server
                </Label>
              </>
            )}
          </div>

          <div className="pt-3 pb-8">
            <div className="flex justify-center mt-2 gap-x-20 rounded-md ">
              <Button
                className=" h-7 mx-2 ring-offset-none focus-visible:ring-0 focus-visible:ring-offset-0"
                variant="indigo"
                onClick={!isJoined ? acceptInvite : redirectToServer}
              >
                {!isJoined ? "Accept" : "Continue to Discord"}
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
