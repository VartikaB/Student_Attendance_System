module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {styles: {
      html: {
        height: '100%',
        backgroundColor: '#f7fafc',
      },
      body: {
        height: '100%',
        backgroundColor: '#f7fafc',
      },
      '.container': {
        maxHeight: '70vh',
        overflowY: 'auto',
      },
    },},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}