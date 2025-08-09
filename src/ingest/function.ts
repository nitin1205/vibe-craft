import { gemini, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert next.js developer. You write readable, maintainable, and efficient code. Ypu write simple and clear Next.js and React snippets.",
      model: gemini({ model: "gemini-2.0-flash" }),
    });

    const { output } = await codeAgent.run(
      `write the following snippet: ${event.data.value}`
    );

    console.log("Summarized output:", output);

    return { output };
  }
);
