/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';
 // Autoplay module styles (if needed)

export const darkMode = ["class"];
export const content = [
  './pages/**/*.{js,jsx}',
  './components/**/*.{js,jsx}',
  './app/**/*.{js,jsx}',
  './src/**/*.{js,jsx}',
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      backgroundImage: {
        'dotted-pattern': 'radial-gradient(circle, #ccc 1px, transparent 1px)',
      },
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    fontFamily: {
      rancho: ['Rancho', 'cursive'],
    },
    backgroundImage: {
      'hero-pattern': "url('Frontend/src/components/Background.jpeg')",
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      flip: {
        '0%': { transform: 'rotateY(0deg)' },
        '100%': { transform: 'rotateY(360deg)' },
      },
      slideIn: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      // Custom Keyframes for Popping Text and Fade-in List
      'pop-text': {
        '0%': {
          opacity: '0',
          transform: 'scale(0.5)',
        },
        '50%': {
          opacity: '1',
          transform: 'scale(1.2)',
        },
        '100%': {
          opacity: '1',
          transform: 'scale(1)',
        },
      },
      'fade-in': {
        '0%': {
          opacity: '0',
        },
        '100%': {
          opacity: '1',
        },
      },
      typing: {
        from: { width: '0%' },
        to: { width: '100%' },
      },
      blink: {
        '0%, 100%': { borderColor: 'transparent' },
        '50%': { borderColor: 'black' },
      },
      fadeBounce: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '50%': { opacity: '1', transform: 'translateY(-10px)' },
        '100%': { transform: 'translateY(0)' },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      'slide-in': 'slideIn 1s ease-out forwards',
      'pop-text': 'pop-text 1.5s ease-out forwards',
      'fade-in': 'fade-in 1s ease-out forwards',
      'typewriter': 'typing 3s steps(20, end), blink 0.5s step-end infinite',
      'fade-bounce': 'fadeBounce 2s ease-in-out infinite',
    },
    
  },
};

export const plugins = [tailwindcssAnimate];
