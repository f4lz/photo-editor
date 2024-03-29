/** @type {import('tailwindcss').Config} */
export default {
  plugins: [],
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  darkMode: false,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '14rem',
      },
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat Alternates'],
        inter: ['Inter'],
      },
      fontWeight: {
        medium: '500',
        normal: '400',
        semibold: '600',
      },
      colors: {
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        background: {
          primary: 'rgb(var(--color-background-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-background-secondary) / <alpha-value>)',
        },
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
      },
    },
  },
}
