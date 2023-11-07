/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                kanit: ['Kanit', 'sans-serif'],
                Sedgwick: ['Sedgwick Ave Display', 'cursive']
            }
        },
    },
    plugins: [],
}