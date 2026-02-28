/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f5f7ff',
                    100: '#ececff',
                    200: '#c9c7ff',
                    300: '#a6a2ff',
                    400: '#7c3aed',
                    500: '#5a20d6',
                    600: '#4615a8',
                    700: '#32107b',
                    800: '#1f0a4d',
                    900: '#110426'
                },
                accent: {
                    50: '#f2fbfb',
                    100: '#e6f7f7',
                    200: '#bfeff0',
                    300: '#99e6e8',
                    400: '#3bd1d9',
                    500: '#06b6d4',
                    600: '#0493a6',
                    700: '#026b78',
                    800: '#01484a',
                    900: '#00261c'
                }
            },
            fontFamily: {
                sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 450ms cubic-bezier(.2,.9,.2,1)',
                'float': 'float 6s ease-in-out infinite'
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                float: {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-6px)' },
                    '100%': { transform: 'translateY(0px)' }
                }
            },
            boxShadow: {
                'premium-lg': '0 20px 50px rgba(2,6,23,0.6)'
            }
        },
    },
    plugins: [],
};
