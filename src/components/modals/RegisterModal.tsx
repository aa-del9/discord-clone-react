import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { useNavigate } from "react-router-dom";
import { SignupValidation } from "@/lib/validation";
import Loader from "../shared/Loader";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
const RegisterModal = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      email: "",
      displayName: "",
      username: "",
      password: "",
      day: 0,
      month: -1,
      year: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupValidation>) => {
    console.log(values);
    const newUser = await createUserAccount(values);
    console.log(newUser);
    if (!newUser) {
      return;
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/app");
    } else {
      return;
    }
  };

  return (
    <Dialog open>
      <DialogContent className="flex flex-col bg-background max-h-50 text-primary p-8 overflow-hidden max-w-[480px]">
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <ModeToggle />
        </div>
        <DialogHeader className="pb-1">
          <DialogTitle className="text-xl text-center">
            Create an account
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs text-primary dark:text-primary">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreatingUser}
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
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs text-primary dark:text-primary">
                    Display name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreatingUser}
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs text-primary dark:text-primary">
                    username
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreatingUser}
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
                      disabled={isCreatingUser}
                      className="bg-zinc-200/60 dark:bg-input  border-0 
                                    focus-visible:ring-0 ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2 max-w-[100%] overflow-hidden">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem className="grow flex flex-col">
                    <FormLabel className="uppercase text-xs dark:text-primary">
                      Date of birth
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "bg-zinc-200/60 dark:bg-input justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? form.getValues("day") : "Day"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="w-[130px] p-0"
                        side="top"
                      >
                        <Command className="bg-zinc-200/60 dark:bg-background max-h-40">
                          <CommandGroup className="overflow-y-auto">
                            {(() => {
                              const days = [];
                              for (let day = 1; day < 32; day++) {
                                days.push(
                                  <CommandItem
                                    value={day.toString()}
                                    key={day.toString()}
                                    onSelect={() => {
                                      form.setValue("day", day);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        day === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {day}
                                  </CommandItem>
                                );
                              }
                              return days;
                            })()}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem className="grow flex flex-col justify-end">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "bg-zinc-200/60 dark:bg-input justify-between",
                              field.value < 0 && "text-muted-foreground"
                            )}
                          >
                            {field.value >= 0
                              ? months.find(
                                  (month) =>
                                    form.getValues("month") ===
                                    months.indexOf(month)
                                )
                              : "Month"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="w-[130px] p-0"
                        side="top"
                      >
                        <Command className="bg-zinc-200/60 dark:bg-background max-h-40">
                          <CommandGroup className="overflow-y-auto">
                            {months.map((month) => (
                              <CommandItem
                                value={month}
                                key={months.indexOf(month)}
                                onSelect={() => {
                                  form.setValue("month", months.indexOf(month));
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    months.indexOf(month) === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {month}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="grow flex flex-col justify-end">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "bg-zinc-200/60 dark:bg-input justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? form.getValues("year") : "Year"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="w-[130px] p-0"
                        side="top"
                      >
                        <Command className="bg-zinc-200/60 dark:bg-background max-h-40">
                          <CommandGroup className="overflow-y-auto">
                            {(() => {
                              const years = [];
                              for (let year = 2021; year > 1871; year--) {
                                years.push(
                                  <CommandItem
                                    value={year.toString()}
                                    key={year.toString()}
                                    onSelect={() => {
                                      form.setValue("year", year);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        year === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {year}
                                  </CommandItem>
                                );
                              }
                              return years;
                            })()}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-xs text-zinc-800/60 dark:text-zinc-400/60 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                (Optional) It's okay to send me emails with Discord updates,
                tips, and special offers. You can opt out at any time.
              </label>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="bg-indigo text-indigo-foreground text-base mt-2 hover:bg-indigo rounded-[3px] px-4 py-0.5 w-[100%]"
            >
              {isCreatingUser ? (
                <div className="flex gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-xs text-zinc-800/70 dark:text-zinc-400 h-3 ">
          By registering, you agree to Discord's{" "}
          <Button
            variant="link"
            className="text-xs text-link px-0 h-3"
            onClick={() => {}}
          >
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button
            variant="link"
            className="text-xs text-link px-0 pb-3 h-3"
            onClick={() => {}}
          >
            Privacy Policy.
          </Button>
        </p>

        <Button
          variant="link"
          className="text-xs text-link px-0 justify-start mt-2 h-3"
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have an account?
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
