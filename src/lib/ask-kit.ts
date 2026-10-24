export type AskKitMessage = {
  role: "user" | "assistant";
  content: string;
};

export const ASK_KIT_MESSAGE_LIMIT = 4000;
