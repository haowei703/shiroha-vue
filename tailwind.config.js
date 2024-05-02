// tailwind.config.js
import form from '@tailwindcss/forms'

export default {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'rg-blue': 'rgb(173,221,253)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [form]
}
