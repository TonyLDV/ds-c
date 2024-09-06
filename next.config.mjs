/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: { domains: ["uploadthing.com"] },
  images: {
    domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
