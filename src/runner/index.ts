import * as runnerApi from "@/http-client/api/runner";
import { getEnv } from "@/env";

import type { ScrapelessRunner } from "@/types";

export class Runner implements ScrapelessRunner {
  async abort() {
    const actorId = getEnv("EnvActorId");
    const runId = getEnv("EnvRunId");

    try {
      await runnerApi.abortRunner(actorId, runId);
      return true;
    } catch {
      return false;
    }
  }
}
