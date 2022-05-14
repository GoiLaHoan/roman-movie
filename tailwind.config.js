module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#191A1F',
        'dark-lighten': '#27282e',
        primary: '#01f9e2',
      },
      keyframes: {
        modal: {
          '0%': { transform: 'translateY(80%)', opacity: '0' },
          '100%': { transform: 'translateY(0)' },
          '40%, 100%': { opacity: '1' },
        },
      },
      animation: {
        slideUp: 'modal 0.5s cubic-bezier(0.25, 1, 0.5, 1) 1 forwards',
      },
      gridTemplateColumns: {
        lg: 'repeat(auto-fill, minmax(160px, 1fr))',
        sm: 'repeat(auto-fill, minmax(130px, 1fr))',
      },
    },
  },
  plugins: [],
};
