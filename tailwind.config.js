/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    content: [],
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: '#fff',
            black: '#000',
            gray: '#2e3641',
            'primary-color': '#39c7e7',
            'primary-bg': '#13182b',
            'secondary-bg': '#1b1f38',
            'footer-bg': '#0b1727',
        },
    },
    plugins: [],
};
