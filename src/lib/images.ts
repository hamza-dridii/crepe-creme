import { existsSync } from "node:fs";
import { join } from "node:path";
import { withBase } from "./paths";

// Single swap point: every missing photo falls back to this file.
const PLACEHOLDER = "/images/placeholder.svg";

export const resolveImage = (src: string) => {
  if (/^https?:\/\//.test(src)) return src;
  return withBase(existsSync(join(process.cwd(), "public", src)) ? src : PLACEHOLDER);
};
