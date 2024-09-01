/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "kr-a.kakaopagecdn.com",
      //   port: "",
      //   pathname: "**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "page-images.kakaoentcdn.com",
      //   port: "",
      //   pathname: "**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "image-comic.pstatic.net",
      //   port: "",
      //   pathname: "**",
      // },
    ],
  },
};

export default nextConfig;
