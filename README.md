# plss

[![actions](https://img.shields.io/github/actions/workflow/status/princejoogie/plss/main.yml)](https://github.com/princejoogie/plss/actions)
[![version](https://img.shields.io/npm/v/plss)](https://www.npmjs.com/package/plss)
[![license](https://img.shields.io/github/license/princejoogie/plss)](https://github.com/princejoogie/plss/blob/main/LICENSE)

Level up your cli game by getting help from AI.

![plss_demo](https://user-images.githubusercontent.com/47204120/226182529-0b29db9a-1ca6-4d7f-b9e1-03cbaf99ff59.gif)

## Usage

```bash
npx plss <query>
npx plss transcribe <file> <format> [--embed]
# file = mp3, mp4, mpeg, mpga, m4a, wav, webm
# format = srt, json, text, verbose_json, vtt;
# `--embed` is optional, it will need ffmpeg to attach the srt or vtt to the input file
```

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
  ```

---

Created with ☕ by Prince Carlo Juguilon
