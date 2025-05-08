import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-button': '#359E96',
      },
      fontFamily: {
        cascadia: ['"Cascadia Code"', 'monospace']
      }
    },
  },
  plugins: [],
} satisfies Config;
