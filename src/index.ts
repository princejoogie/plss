import "dotenv/config";
import { shell } from "./feat/shell";

const main = async () => {
  await shell();
};

main().catch(() => {
  console.error("An error occurred");
  process.exit(1);
});
