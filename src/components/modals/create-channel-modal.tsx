import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Volume2, Hash } from "lucide-react";
import {
  DialogHeader,
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Loader from "../shared/Loader";
import { useEffect } from "react";
import { useServerContext } from "@/hooks/use-server-context";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Channel name is required.",
  }),
  channelType: z.enum(["text", "voice"], {
    required_error: "Channel type is required.",
  }),
});

export const CreateChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { createServerChannels, editServerChannels } = useServerContext();
  const { member, channelType, channel, isEditChannel } = data;
  const isModalOpen = isOpen && type === "createChannel";
  console.log(isEditChannel);
  console.log(channelType);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      channelType: channelType,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // both context calls
    console.log(values, channel);

    if (isEditChannel) {
      // edit channel
      await editServerChannels(values.name, channel?.$id ? channel.$id : "");
    } else {
      console.log(values);
      await createServerChannels({
        name: values.name,
        type: values.channelType,
        server: member?.servers?.$id ? member.servers.$id : "",
        creatorid: member?.$id ? member.$id : "",
      });
    }
    onClose();
    form.reset();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (channelType) {
      form.setValue("channelType", channelType);
    }
  }, [channelType, form]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white max-w-[460px] text-primary dark:bg-[#1E1F22] p-0 sm:rounded-[14px]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl">Create Channel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=" px-6">
              <FormField
                control={form.control}
                name="channelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs primary:text-secondary/20">
                      Channel Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="hover:bg-zinc-300/100 hover:dark:bg-zinc-600 hover:cursor-pointer">
                          <div className="sm:rounded-[8px] flex items-center w-full h-14 bg-zinc-300/50 dark:bg-zinc-700/50 rounded-md hover:bg-zinc-300/100 hover:dark:bg-zinc-600">
                            <Hash className="opacity-[0.6] mx-3" />
                            <FormLabel
                              className="flex flex-1 flex-col text-md font-normal hover:cursor-pointer"
                              // onClick={voiceDivClicked}
                            >
                              Text
                              <p className="text-xs text-primary/60 mt-1">
                                Send messages, images, GIFs, emoji, opinions,
                                and puns
                              </p>
                            </FormLabel>
                            <RadioGroupItem
                              disabled={isEditChannel}
                              value="text"
                              className="mr-5 w-5 h-5"
                              checked={field.value === "text"}
                            />
                          </div>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0 hover:bg-zinc-600 hover:cursor-pointer">
                          <div className="sm:rounded-[8px] flex flex-1 items-center w-full h-14 bg-zinc-300/50 dark:bg-zinc-700/50 rounded-md hover:bg-zinc-300/100 hover:dark:bg-zinc-600 hover:cursor-pointer">
                            <Volume2 className="opacity-[0.6] mx-3" />
                            <FormLabel
                              className="flex flex-1 flex-col text-md font-normal hover:cursor-pointer"
                              // onClick={voiceDivClicked}
                            >
                              Voice
                              <p className="text-xs text-primary/60 mt-1">
                                Hang out together with voice, video, and screen
                                share
                              </p>
                            </FormLabel>
                            <RadioGroupItem
                              disabled={isEditChannel}
                              checked={field.value === "voice"}
                              value="voice"
                              className="mr-5 w-5 h-5"
                            />
                          </div>
                        </FormItem>
                      </RadioGroup>
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
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-primary">
                      channel name
                    </FormLabel>
                    <FormControl>
                      <div className="sm:rounded-[4px] flex bg-zinc-300/50 dark:bg-background justify-center items-center">
                        {form.getValues("channelType") == "text" ? (
                          <Hash className="w-5 h-5 ml-2 opacity-[0.7]" />
                        ) : (
                          <Volume2 className="w-5 h-5 ml-2 opacity-[0.7]" />
                        )}
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 dark:bg-background border-0 focus-visible:ring-0 text-primary focus-visible:ring-offset-0"
                          placeholder={
                            !isEditChannel ? "new-channel" : channel?.name
                          }
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4">
              <Button type="submit" variant="default" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex gap-2">
                    <Loader /> {!isEditChannel ? "Creating..." : "Editing..."}
                  </div>
                ) : !isEditChannel ? (
                  "Create"
                ) : (
                  "Edit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
