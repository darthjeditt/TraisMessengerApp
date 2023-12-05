module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                swurvy: ['Satoshi', 'cursive']
            },
            scrollbar: ['rounded'],
            colors: {
                'scroll-thumb': 'rgba(79, 70, 229, 0.5)', // Semi-transparent thumb
                'scroll-thumb-hover': 'rgba(79, 70, 229, 0.6)' // Slightly darker on hover
            },
            backdropFilter: {
                none: 'none',
                blur: 'blur(20px)'
            }
        }
    },
    variants: {
        extend: {
            backdropFilter: ['responsive'] // enable responsive variants as needed
        }
    },
    plugins: [require('tailwind-scrollbar')]
};
