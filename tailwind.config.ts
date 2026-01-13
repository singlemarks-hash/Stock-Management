import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // Tag color classes - must be included for dynamic tag colors
    'bg-red-100', 'text-red-700', 'dark:bg-red-900/40', 'dark:text-red-300',
    'bg-rose-200', 'text-rose-800', 'dark:bg-rose-900/40', 'dark:text-rose-300',
    'bg-pink-100', 'text-pink-700', 'dark:bg-pink-900/40', 'dark:text-pink-300',
    'bg-fuchsia-200', 'text-fuchsia-800', 'dark:bg-fuchsia-900/40', 'dark:text-fuchsia-300',
    'bg-purple-100', 'text-purple-700', 'dark:bg-purple-900/40', 'dark:text-purple-300',
    'bg-violet-200', 'text-violet-800', 'dark:bg-violet-900/40', 'dark:text-violet-300',
    'bg-indigo-100', 'text-indigo-700', 'dark:bg-indigo-900/40', 'dark:text-indigo-300',
    'bg-blue-100', 'text-blue-700', 'dark:bg-blue-900/40', 'dark:text-blue-300',
    'bg-blue-200', 'text-blue-800', 'dark:bg-blue-900/50', 'dark:text-blue-200',
    'bg-sky-100', 'text-sky-700', 'dark:bg-sky-900/40', 'dark:text-sky-300',
    'bg-cyan-200', 'text-cyan-800', 'dark:bg-cyan-900/40', 'dark:text-cyan-300',
    'bg-teal-100', 'text-teal-700', 'dark:bg-teal-900/40', 'dark:text-teal-300',
    'bg-emerald-200', 'text-emerald-800', 'dark:bg-emerald-900/40', 'dark:text-emerald-300',
    'bg-green-100', 'text-green-700', 'dark:bg-green-900/40', 'dark:text-green-300',
    'bg-green-200', 'text-green-800', 'dark:bg-green-900/50', 'dark:text-green-200',
    'bg-lime-100', 'text-lime-700', 'dark:bg-lime-900/40', 'dark:text-lime-300',
    'bg-lime-200', 'text-lime-800', 'dark:bg-lime-900/50', 'dark:text-lime-200',
    'bg-yellow-100', 'text-yellow-700', 'dark:bg-yellow-900/40', 'dark:text-yellow-300',
    'bg-yellow-200', 'text-yellow-800', 'dark:bg-yellow-900/50', 'dark:text-yellow-200',
    'bg-amber-100', 'text-amber-700', 'dark:bg-amber-900/40', 'dark:text-amber-300',
    'bg-amber-200', 'text-amber-800', 'dark:bg-amber-900/50', 'dark:text-amber-200',
    'bg-orange-100', 'text-orange-700', 'dark:bg-orange-900/40', 'dark:text-orange-300',
    'bg-orange-200', 'text-orange-800', 'dark:bg-orange-900/50', 'dark:text-orange-200',
    'bg-red-200', 'text-red-800', 'dark:bg-red-900/50', 'dark:text-red-200',
    'bg-pink-200', 'text-pink-800', 'dark:bg-pink-900/50', 'dark:text-pink-200',
    'bg-purple-200', 'text-purple-800', 'dark:bg-purple-900/50', 'dark:text-purple-200',
    'bg-indigo-200', 'text-indigo-800', 'dark:bg-indigo-900/50', 'dark:text-indigo-200',
    'bg-teal-200', 'text-teal-800', 'dark:bg-teal-900/50', 'dark:text-teal-200',
    'bg-cyan-100', 'text-cyan-700', 'dark:bg-cyan-900/40', 'dark:text-cyan-300',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem", /* 9px */
        md: ".375rem", /* 6px */
        sm: ".1875rem", /* 3px */
      },
      colors: {
        // Flat / base colors (regular buttons)
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)"
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
