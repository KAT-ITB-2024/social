import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        turkwa: "url('/images/Background.png')",
        classes:
          "url('/images/class-selection/class-selection-background.png')",
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        shade: {
          100: '#060606',
          200: '#FFFEFE',
        },
        neutral: {
          50: '#F5F5FF',
          100: '#F3F4F6',
          200: '#E6E7EB',
          300: '#D1D4DB',
          400: '#9EA2AD',
          500: '#6B7380',
          600: '#4C5563',
          700: '#384053',
          800: '#202938',
          900: '#111828',
        },
        turquoise: {
          100: '#C5FFF3',
          200: '#0CEBCC',
          300: '#05A798',
          400: '#006E6F',
          500: '#004441',
        },
        blue: {
          100: '#99E0FF',
          200: '#64B1F7',
          300: '#3678FF',
          400: '#0B46E8',
          500: '#0010A4',
          600: '#000D76',
        },
        pink: {
          100: '#FFB4D3',
          200: '#FF8CD9',
          300: '#FB43BD',
          400: '#EE1192',
          500: '#CC007D',
        },
        orange: {
          100: '#FFD897',
          200: '#FFBF51',
          300: '#FD9417',
          400: '#F06B02',
          500: '#E84300',
        },
        lightYellow: '#FEFDA3',
        yellow: '#FFE429',
        greenishYellow: '#D4F951',
        purple: '#470BBB',
        warning: {
          50: '#FEFBEA',
          100: '#FEF3C5',
          200: '#FDE687',
          300: '#FDD34B',
          400: '#FDBD26',
          500: '#F49E0A',
          600: '#D8760A',
          700: '#B5530A',
          800: '#933E0F',
          900: '#793510',
        },
        error: {
          50: '#FFF2F2',
          100: '#FEE2E1',
          200: '#FECBCA',
          300: '#F9A7A3',
          400: '#F77171',
          500: '#EE4444',
          600: '#DC2522',
          700: '#BA1B1A',
          800: '#991B1C',
          900: '#7F1D1C',
        },
        success: {
          50: '#F3FCF6',
          100: '#DCFCE7',
          200: '#BBF7D1',
          300: '#88EDAD',
          400: '#4ADE80',
          500: '#28C35D',
          600: '#18A348',
          700: '#14803E',
          800: '#166535',
          900: '#13542D',
        },
      },
      fontFamily: {
        heading: ['Mogula', 'sans-serif'],
        subheading: ['REM', 'sans-serif'],
        body: ['REM', 'sans-serif'],
      },
      fontSize: {
        h1: ['64px', '120%'],
        h2: ['48px', '120%'],
        h3: ['32px', '120%'],
        h4: ['24px', '120%'],
        h5: ['20px', '120%'],
        h6: ['16px', '120%'],
        sh1: ['36px', '120%'],
        sh2: ['32px', '120%'],
        sh3: ['24px', '120%'],
        sh4: ['20px', '120%'],
        sh5: ['18px', '120%'],
        b1: ['24px', '120%'],
        b2: ['20px', '120%'],
        b3: ['16px', '120%'],
        b4: ['14px', '120%'],
        b5: ['12px', '120%'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      dropShadow: {
        'orange-shadow': '4px 4px 10px rgba(255, 191, 81, 0.50)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        // Pink shadows
        'pink-sm': '4px 4px 10px rgba(255, 140, 217, 0.5)',
        'pink-md': '4px 4px 10px rgba(255, 140, 217, 0.75)',
        'pink-lg': '4px 4px 20px rgba(255, 140, 217, 0.75)',
        'pink-xl': '4px 4px 20px rgba(255, 140, 217, 1)',
        'pink-2xl': '4px 4px 50px rgba(255, 140, 217, 1)',
        // Green shadows
        'green-sm': '4px 4px 10px rgba(12, 235, 204, 0.5)',
        'green-md': '4px 4px 10px rgba(12, 235, 204, 0.75)',
        'green-lg': '4px 4px 20px rgba(12, 235, 204, 0.75)',
        'green-xl': '4px 4px 20px rgba(12, 235, 204, 1)',
        'green-2xl': '4px 4px 50px rgba(12, 235, 204, 1)',
        // Blue shadows
        'blue-sm': '4px 4px 10px rgba(100, 177, 247, 0.5)',
        'blue-md': '4px 4px 10px rgba(100, 177, 247, 0.75)',
        'blue-lg': '4px 4px 20px rgba(100, 177, 247, 0.75)',
        'blue-xl': '4px 4px 20px rgba(100, 177, 247, 1)',
        'blue-2xl': '4px 4px 50px rgba(100, 177, 247, 1)',
        // Orange shadows
        'orange-sm': '4px 4px 10px rgba(255, 191, 81, 0.5)',
        'orange-md': '4px 4px 10px rgba(255, 191, 81, 0.75)',
        'orange-lg': '4px 4px 20px rgba(255, 191, 81, 0.75)',
        'orange-xl': '4px 4px 20px rgba(255, 191, 81, 1)',
        'orange-2xl': '4px 4px 50px rgba(255, 191, 81, 1)',
        // Neutral shadows
        'neutral-sm': '4px 4px 10px rgba(56, 64, 83, 0.5)',
        'neutral-md': '4px 4px 10px rgba(32, 41, 56, 0.75)',
        'neutral-lg': '4px 4px 20px rgba(32, 41, 56, 0.75)',
        'neutral-xl': '4px 4px 20px rgba(32, 41, 56, 1)',
        'neutral-2xl': '4px 4px 50px rgba(32, 41, 56, 1)',
        // White shadows
        'white-sm': '0px 0px 10px rgba(255, 255, 255, 1)',
        'white-md': '0px 0px 15px rgba(255, 255, 255, 1)',
        'white-lg': '0px 0px 20px rgba(255, 255, 255, 1)',
        'white-xl': '0px 0px 40px rgba(255, 255, 255, 1)',
        'white-2xl': '0px 0px 60px rgba(255, 255, 255, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
