/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    content: [],
    theme: {
        extend: {
            boxShadow: {
                full: '0 50px 300px 50px rgba(0, 0, 0, 0.5)',
            },
        },
        colors: {
            transparent: 'rgba(255,255,255,0.1)',
            white: '#fff',

            black: '#001214',
            orange: '#FF8C00',
            'pastel-pink': '#FFC0CB',
            'pastel-green': '#98FB98',
            teal: '#008080',

            gray: '#2e3641',
            'light-blue': '#00BFFF',
            'light-gray': '#BBB3BC',
            'dark-gray': '#4B5563',

            'primary-color': '#043F4E',
            'secondary-color': '#065E74',
            'text-secondary': '#D6FBFF',
            'primary-bg': '#001214',
            'secondary-bg': '#061923',
            'footer-bg': '#0b1727',

            'bg-1': '#6FAEAA',
            'bg-2': '#3F7571',
            'bg-3': '#6D887A',
            'bg-4': '#BA9090',
            'bg-5': '#A36A00',
        },
        screens: {
            mb: { max: '760px' },

            lg: { min: '761px' },
        },
    },
    plugins: [],
};
