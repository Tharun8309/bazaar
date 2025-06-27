/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // indigo-600
          dark: '#3730a3',    // indigo-800
        },
        secondary: {
          DEFAULT: '#10b981', // emerald-500
          dark: '#047857',    // emerald-800
        },
        accent: {
          DEFAULT: '#f59e42', // orange-400
        },
        background: {
          DEFAULT: '#f8fafc', // slate-50
          dark: '#1e293b',    // slate-800
        },
        text: {
          DEFAULT: '#1e293b', // slate-800
          light: '#64748b',   // slate-400
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

