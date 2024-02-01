import { useMutation } from "@tanstack/react-query";
import { signOutAccount } from "../appwrite/api";

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};
