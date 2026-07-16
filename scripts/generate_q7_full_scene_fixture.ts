import path from "node:path";

import { writeQ7FullSceneFixture } from "./lib/q7FullSceneFixture";

const result = writeQ7FullSceneFixture(path.join(process.cwd(), "test", "fixtures", "appplugin"));
process.stdout.write(`${JSON.stringify(result)}\n`);
