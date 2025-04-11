/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#3b82f6',
          700: '#2563eb',
        },
        gray: {
          800: '#1e1e1e',
        },
      },
    },
  },
  plugins: [],
} 