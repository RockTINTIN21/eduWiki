const nextConfig = {
  experimental: {
    authInterrupts: true,
  },
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},

};

export default nextConfig;
