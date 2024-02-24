import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Volume2 } from "lucide-react";
import {
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-model-store";
import FileUploader from "../shared/FileUploader";
import { useUserContext } from "@/hooks/use-user-context";
import { createServer } from "@/lib/appwrite/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@radix-ui/react-checkbox";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  image: z.array(
    z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
  ),
});

export const CreateChannelModal = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [error, setError] = useState<string>("");
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createChannel";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.displayName.split(" ")[0] + "'s server",
      image: [],
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, user);
    const server = await createServer({
      name: values.name,
      image: values.image[0],
      creatorid: user?.accountid,
      createdAt: new Date(),
    });
    console.log(server);

    if (!server?.$id) {
      setError("Something went wrong.");
      return;
    }
    form.reset();
    navigate("/servers/" + server.$id);
    window.location.reload();
    console.log(server);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl">Create Channel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=" px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs primary:text-secondary/20">
                      Channel Type
                    </FormLabel>
                    <FormControl>
                      <div className=" flex p-2 bg-zinc-300/50 ">
                        <Volume2 />
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter server name"
                          {...field}
                        />

                        <Checkbox />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button type="submit" variant="default" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
