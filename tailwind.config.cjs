/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        drg: {
          primary: {
            '50': '#fff5e6',
            '100': '#ffebcc',
            '200': '#ffd799',
            '300': '#ffc466',
            '400': '#ffb033',
            '500': '#ff9c00',
            '600': '#cc7d00',
            '700': '#995e00',
            '800': '#663e00',
            '900': '#331f00'
          },
          secondary: {
            '50': '#fffbe6',
            '100': '#fff6cc',
            '200': '#ffed99',
            '300': '#ffe466',
            '400': '#ffdb33',
            '500': '#ffd200',
            '600': '#cca800',
            '700': '#997e00',
            '800': '#665400',
            '900': '#332a00'
          }
        },
        
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
};
