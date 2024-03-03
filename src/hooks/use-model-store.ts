import { Channel, Member, Server } from "@/types";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "invitation"
  | "leaveServer"
  | "serverSettings"
  | "kickMember"
  | "createChannel"
  | "memberSidebar"
  | "deleteChannel";

interface ModalData {
  serverDetail?: Server;
  member?: Member;
  channelType?: "text" | "voice";
  channel?: Channel;
  isEditChannel?: boolean;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
