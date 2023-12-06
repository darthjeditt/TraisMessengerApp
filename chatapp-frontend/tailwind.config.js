module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                swurvy: ['Satoshi', 'cursive']
            },
            scrollbar: ['rounded'],
            colors: {
                'scroll-thumb': 'rgba(79, 70, 229, 0.5)',
                'scroll-thumb-hover': 'rgba(79, 70, 229, 0.6)'
            },
            backdropFilter: {
                none: 'none',
                blur: 'blur(20px)'
            }
        }
    },
    variants: {
        extend: {
            backdropFilter: ['responsive']
        }
    },
    plugins: [require('tailwind-scrollbar')({ nocompatible: true })]
};
