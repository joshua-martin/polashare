module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        container: {
            padding: '1rem'
        }
    },
    plugins: [require('@tailwindcss/typography')]
}
