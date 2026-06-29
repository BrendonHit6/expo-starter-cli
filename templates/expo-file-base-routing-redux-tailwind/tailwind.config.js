/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        success: '#34C759',
        error: '#FF3B30',
        background: '#fff',
        'text-primary': '#000',
        'text-secondary': '#555',
        'text-muted': '#999',
        'text-label': '#333',
        border: '#ccc',
        'overlay-dark': 'rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
};
