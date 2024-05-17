/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#056CC1',
        background: '#ECECEC',
        card: 'rgb(255, 255, 255)',
        text: '#000000',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
        warning: '#F97066',
        orange: "#F2AC3C",
        red: "#DF1E1E"
      },
      fontFamily: {
        ['Lateef-Bold']: ['Lateef-Bold'],
        ['Lateef-Light']: ['Lateef-Light'],
        ['Lateef-ExtraBold']: ['Lateef-ExtraBold'],
        ['Lateef-ExtraLight']: ['Lateef-ExtraLight'],
        ['Lateef-Regular']: ['Lateef-Regular'],
        ['Lateef-SemiBold']: ['Lateef-SemiBold'],
        Lateef: ['Lateef-Medium'],
        Rakkas: ['Rakkas-Regular'],
        ['Rawasi-black']: ['RawasiDisplay-Black'],
        ['Rawasi-bold']: ['RawasiDisplay-Bold'],
        ['Rawasi-regular']: ['RawasiDisplay-Regular']
      },
    },
  },
  plugins: [],
}

