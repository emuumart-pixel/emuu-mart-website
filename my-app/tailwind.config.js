/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C0526A', // Deep rose pink - from logo/hero
          dark: '#A03D54',    // Darker rose
          light: '#D97589',   // Lighter rose
        },
        secondary: '#2D1B25', // Deep plum-dark for headings/dark areas
        accent: {
          DEFAULT: '#D4A847', // Warm gold accent
          dark: '#B8923A',    // Darker gold
          light: '#EAC97A',   // Lighter gold
        },
        blush: {
          DEFAULT: '#FFF0F3', // Soft blush white background
          mid: '#FAD7DE',     // Mid blush
          deep: '#F5C6CF',    // Deep blush
        },
        'soft-bg': '#FFF8F9',  // Very light pink-white background
        'text-color': '#7A5560', // Warm muted rose-brown text
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['"Libre Baskerville"', 'serif'],
      },
      boxShadow: {
        card: '0 2px 16px rgba(192,82,106,0.08)',
        'card-hover': '0 8px 32px rgba(192,82,106,0.18)',
        rose: '0 4px 20px rgba(192,82,106,0.25)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2D1B25 0%, #C0526A 100%)',
        'blush-gradient': 'linear-gradient(135deg, #FFF0F3 0%, #FAD7DE 100%)',
        'rose-gradient': 'linear-gradient(135deg, #C0526A 0%, #A03D54 100%)',
      },
    },
  },
  plugins: [],
}
