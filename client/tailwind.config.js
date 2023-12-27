/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#2B3A67',
        'sky-blue': '#61A4BC',
        'soft-cream': '#FDFDFA',
        'muted-coral': '#EF6F6C',
        'light-grey': '#E1E1E1',
        'charcoal': '#303030',
        'teal': '#4DAAA9',
        'sunset-orange': '#F28F3B',
      }
    },
  },
  plugins: [],
}

