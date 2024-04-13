/* c8 ignore start */
import * as core from "@actions/core";
import { exportSecrets } from "./lib";

try {
  exportSecrets(core);
} catch (error) {
  core.setFailed(
    `failed to export secrets: ${error instanceof Error ? error.message : error}`,
  );
}
/* c8 ignore end */
