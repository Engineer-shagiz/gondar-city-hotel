import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // ይህንንም ለጥንቃቄ ጨምረው
  ],
  theme: {
    extend: {
      colors: {
        'gondar-gold': '#D4AF37',
        'heritage-brown': '#3E2723',
      },
    },
  },
  plugins: [],
};
export default config;