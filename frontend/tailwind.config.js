/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                aurora: {
                    bg: '#f8fafc', // Slate 50
                    text: '#1e293b', // Slate 800
                    primary: '#0ea5e9', // Sky 500
                    secondary: '#10b981', // Emerald 500
                    accent: '#8b5cf6', // Violet 500
                    glass: 'rgba(255, 255, 255, 0.7)',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
            },
            backgroundImage: {
                'aurora-gradient': 'linear-gradient(130deg, #dbeafe 0%, #fae8ff 50%, #dcfce7 100%)',
            }
        },
    },
    plugins: [],
}
