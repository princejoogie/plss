import "dotenv/config";
import { shell } from "./feat/shell";

const main = async () => {
  const query = process.argv[2];

  if (!query) {
    console.error("Please provide a query");
    process.exit(1);
  }

  await shell(query);
};

main().catch(() => {
  console.error("An error occurred");
  process.exit(1);
});
