module.exports = {
      content: ["./src/**/*.{js,jsx,ts,tsx}"],
      theme: {
        extend: {
          colors: {
            warm: {
              50: '#fef7ed',
              100: '#fcecd4',
              200: '#f8d5a8',
              300: '#f4b871',
              400: '#ef9238',
              500: '#eb7518',
              600: '#dc5a0e',
              700: '#b7420e',
              800: '#923513',
              900: '#762d13',
            },
            earth: {
              50: '#f6f5f3',
              100: '#e8e5df',
              200: '#d3cbc0',
              300: '#b8aa99',
              400: '#a18d76',
              500: '#8c7860',
              600: '#766554',
              700: '#5f5147',
              800: '#51453f',
              900: '#473d38',
            }
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            serif: ['Merriweather', 'Georgia', 'serif'],
          },
        },
      },
      plugins: [],
    }