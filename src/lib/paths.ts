// Prefixes a root path ("/images/…") with the site's base path, so the site works both at a
// domain's root and in a sub-folder such as username.github.io/crepe-creme/.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const withBase = (path: string) => `${base}${path}`;
