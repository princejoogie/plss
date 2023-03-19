# plss

Level up your cli game by getting help from AI.

![pls_demo](https://user-images.githubusercontent.com/47204120/223717203-3400adfb-9b41-4a24-bd36-cc6a5c780c83.gif)

## Usage

1. Download binaries in [release ](https://github.com/princejoogie/pls/releases) section
2. Store `pls-{os}` in a global bin folder
3. Make sure to export `OPENAI_APIKEY` as an environment variable
4. `pls <query>`

## Building

- Development

  ```bash
  pnpm install
  pnpm dev <query>
  ```

- Production

  ```bash
  pnpm install
  pnpm build
  pnpm compile # produce binaries in `bin/`
  ```

---

Created with ☕ by Prince Carlo Juguilon
