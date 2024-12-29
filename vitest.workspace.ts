import { fileURLToPath } from "url";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      include: ["src/**/*.server.test.ts"],
      name: "server test",
      environment: "node",
      alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
      },
    },
  },
]);
