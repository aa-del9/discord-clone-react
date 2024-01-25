import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogTitle,
  Dialog,
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
import { ModeToggle } from "../ui/mode-toggle";
import { useNavigate } from "react-router-dom";
import { LoginVaidation } from "@/lib/validation";
import { loginUser } from "@/lib/appwrite/api";
import Loader from "../shared/Loader";

const LoginModal = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginVaidation>>({
    resolver: zodResolver(LoginVaidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof LoginVaidation>) => {
    console.log(values);
    await loginUser(values).then((res: unknown) => console.log("res", res));
  };

  return (
    <Dialog open>
      <DialogContent className="flex bg-background max-h-102 text-primary p-8 overflow-hidden max-w-[784px]">
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <ModeToggle />
        </div>
        <div className="grow px-0">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl text-center">
              Welcome back!
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              We're so excited to see you again!
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs text-primary dark:text-primary">
                      Email or phone number
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-200/60 dark:bg-input border-0 focus-visible:ring-0 ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs dark:text-primary">
                      password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isLoading}
                        className="bg-zinc-200/60 dark:bg-input  border-0 
                                    focus-visible:ring-0 ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col ">
                <Button
                  variant="link"
                  className="text-xs text-link px-0 justify-start"
                >
                  Forgot your password?
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-indigo text-indigo-foreground text-base mt-2 hover:bg-indigo rounded-[3px] px-4 py-0.5"
                  type="submit"
                >
                  {isLoading ? (
                    <div className="flex gap-2">
                      <Loader /> Loading...
                    </div>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="flex flex-col">
            <div className="h-3">
              <p className="text-xs text-zinc-900 dark:text-zinc-400">
                Need an account?{" "}
                <Button
                  variant="link"
                  className="text-xs text-link px-0"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              </p>
            </div>
          </div>
        </div>
        <div className="h-100 w-8"></div>
        <div className="flex flex-col max-w-[240px] align-center justify-center space-y-[8px]">
          <div className="text-center text-xl font-bold">
            Log in with QR Code
          </div>
          <div className="text-center text-sm text-wrap">
            Scan this with the <strong>Discord mobile app</strong> to log in
            instantly.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
