import type { Config } from "@react-router/dev/config";

export default {
  // SSR enabled for build, but pre-render static pages
  ssr: true,
  async prerender() {
    // Pre-render home page only (admin routes are dev-only)
    return ["/"];
  },
} satisfies Config;
