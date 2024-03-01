import { ServerContext } from "@/context/ServerContext";
import { useContext } from "react";

export const useServerContext = () => useContext(ServerContext);
