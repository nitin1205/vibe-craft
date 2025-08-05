import { serve } from "inngest/next";
import { inngest } from "@/ingest/client";
import { helloWorld } from "@/ingest/function";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld],
});
