/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      spacing: {
        100: '25rem',
        108: '27rem',
        128: '32rem',
      },
    },
  },
  plugins: [],
}

