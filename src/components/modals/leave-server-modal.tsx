import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { leaveServer } from "@/lib/appwrite/api";
export const LeaveServerModal = () => {
  const navigate = useNavigate();
  const { isOpen, data, type, onClose } = useModal();
  const { thisMember } = data;
  console.log(thisMember);

  const isModalOpen = isOpen && type === "leaveServer";
  const callLeaveServer = () => {
    const response = leaveServer(thisMember?.$id ? thisMember?.$id : "");
    console.log(response);
    navigate("/servers/@me");
    onClose();
  };

  const redirectToServer = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="bg-background text-primary p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <div className="flex flex-col items-center gap-y-6">
            <>
              <DialogTitle className="text-md text-center font-thin text-primary">
                Are you sure! you want to leave the server
              </DialogTitle>
            </>
          </div>

          <div className="pt-3 pb-8">
            <div className="flex justify-center mt-2 gap-x-20 rounded-md ">
              <Button
                className=" h-7 mx-2 ring-offset-none focus-visible:ring-0 focus-visible:ring-offset-0"
                variant="indigo"
                onClick={callLeaveServer}
              >
                Yes
              </Button>
              <Button
                className=" h-7 mx-2 ring-offset-none focus-visible:ring-0 focus-visible:ring-offset-0"
                variant="destructive"
                onClick={redirectToServer}
              >
                No
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
