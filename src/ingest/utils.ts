import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, type Message, TextMessage } from "@inngest/agent-kit";

import { SANDBOX_TIMEOUT } from "@/types";

export async function getSandbox(sandboxId: string): Promise<Sandbox> {
  const sandbox = await Sandbox.connect(sandboxId);
  await sandbox.setTimeout(SANDBOX_TIMEOUT);
  return sandbox;
}

export function lastAssistantTextMessageContent(result: AgentResult) {
  const lastAssistantTextMessageIndex = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );

  const message = result.output[lastAssistantTextMessageIndex] as
    | TextMessage
    | undefined;

  return message?.content
    ? typeof message.content === "string"
      ? message.content
      : message.content.map((c) => c.text).join("")
    : "";
}

export const parseAgentOutput = (agentOutput: Message[]): string => {
  const output = agentOutput[0];
  if (output.type !== "text") {
    return "Fragment";
  } else if (Array.isArray(output.content)) {
    return output.content.map((text) => text).join(" ");
  } else {
    return output.content;
  }
};
