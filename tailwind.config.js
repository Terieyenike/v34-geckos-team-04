module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './src/components/*.{js,jsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme('colors'),
        prioHigh: '#F19290',
        prioMedium: '#F0D2AC',
        prioLow: '#B1D198',
      }),
      textColor: (theme) => ({
        ...theme('colors'),
        prioHigh: '#F19290',
        prioMedium: '#F0D2AC',
        prioLow: '#B1D198',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
