import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#111111',
          soft: '#3A3A3A',
          muted: '#8A8A8A',
        },
        paper: {
          DEFAULT: '#FAFAF8',
          raised: '#FFFFFF',
          sunken: '#F2F1EE',
        },
        line: '#E6E4DF',
        accent: {
          DEFAULT: '#1F3A2E',
          soft: '#E8EFEA',
        },
        danger: '#B42318',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '14px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17,17,17,0.04), 0 4px 16px rgba(17,17,17,0.04)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}

export default config
