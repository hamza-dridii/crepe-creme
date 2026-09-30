import { defineConfig } from "astro/config";

export default defineConfig({
  // "/" locally; the deploy workflow sets BASE_PATH (e.g. "/crepe-creme" for username.github.io/crepe-creme/).
  base: process.env.BASE_PATH || "/",
  // The dev toolbar's audit fetches every image on the page; not needed here.
  devToolbar: { enabled: false },
  server: {
    // Accept any host name (ngrok and other tunnels) in `astro dev`/`astro preview`. Vite has no "*"
    // pattern: `true` allows everything, and ".ngrok-free.app" would allow only ngrok subdomains.
    allowedHosts: true,
  },
});
