/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0b0f19',
        glassBg: 'rgba(15, 23, 42, 0.45)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
        glassText: 'rgba(243, 244, 246, 0.9)',
        glassTextMuted: 'rgba(156, 163, 175, 0.8)',
        neonCyan: '#00f2fe',
        neonPurple: '#a78bfa',
        neonFuchsia: '#f472b6',
        neonGreen: '#34d399',
      },
      boxShadow: {
        'glass-glow': '0 8px 32px 0 rgba(0, 242, 254, 0.05)',
        'glass-glow-purple': '0 8px 32px 0 rgba(167, 139, 250, 0.08)',
        'neon-border': '0 0 10px rgba(0, 242, 254, 0.2)',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
