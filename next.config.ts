import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

if (
  process.env.NODE_ENV === "development" &&
  process.env.ENABLE_OPENNEXT_CLOUDFLARE_DEV === "1"
) {
  void import("@opennextjs/cloudflare").then((m) =>
    m.initOpenNextCloudflareForDev()
  );
}

export default nextConfig;
