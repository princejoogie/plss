import "dotenv/config";
import { program } from "commander";

import { shell } from "./feat/shell";
import { img } from "./feat/img";
import { getVersion } from "./util";

const main = async () => {
  program
    .name("ask-cli")
    .description("anything you want")
    .version(getVersion());

  program
    .command("shell")
    .description("ask a shell command")
    .argument("<string>", "your query")
    .action((query) => {
      if (!query || typeof query !== "string") {
        console.error("Invalid query");
        process.exit(1);
      }
      shell(query);
    });

  program
    .command("img")
    .description("generate an image")
    .argument("<string>", "your query")
    .action((query) => {
      if (!query || typeof query !== "string") {
        console.error("Invalid query");
        process.exit(1);
      }
      img(query);
    });

  program.parse();
};

main().catch(() => {
  console.error("An error occurred");
  process.exit(1);
});
