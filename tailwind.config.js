/** @type {import('tailwindcss').Config} */
module.exports = {
    // `overline` is a Tailwind utility; without this an app's own eyebrow-label class draws a line above the text.
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px'
        }
      },
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          hud: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        },
        colors: {
          // HUD palette — see globals.css for the token definitions. The
          // `<alpha-value>` form is required for opacity modifiers such as
          // `bg-hud/10` to compile.
          void: 'rgb(var(--void-rgb) / <alpha-value>)',
          deep: 'rgb(var(--deep-rgb) / <alpha-value>)',
          panel: 'rgb(var(--panel-rgb) / <alpha-value>)',
          raised: 'rgb(var(--raised-rgb) / <alpha-value>)',
          ink: {
            DEFAULT: 'rgb(var(--ink-rgb) / <alpha-value>)',
            dim: 'rgb(var(--ink-dim-rgb) / <alpha-value>)',
            mute: 'rgb(var(--ink-mute-rgb) / <alpha-value>)',
          },
          hud: {
            DEFAULT: 'rgb(var(--accent-core-rgb) / <alpha-value>)',
            bright: 'rgb(var(--accent-bright-rgb) / <alpha-value>)',
            deep: 'rgb(var(--accent-deep-rgb) / <alpha-value>)',
            violet: 'rgb(var(--accent-violet-rgb) / <alpha-value>)',
            // Line colours are already rgba() and are used without modifiers.
            line: 'var(--hud-line)',
            'line-strong': 'var(--hud-line-strong)',
          },
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))'
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))'
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))'
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))'
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))'
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))'
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))'
          },
          chart: {
            '1': 'hsl(var(--chart-1))',
            '2': 'hsl(var(--chart-2))',
            '3': 'hsl(var(--chart-3))',
            '4': 'hsl(var(--chart-4))',
            '5': 'hsl(var(--chart-5))'
          },
          sidebar: {
            DEFAULT: 'hsl(var(--sidebar-background))',
            foreground: 'hsl(var(--sidebar-foreground))',
            primary: 'hsl(var(--sidebar-primary))',
            'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
            accent: 'hsl(var(--sidebar-accent))',
            'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
            border: 'hsl(var(--sidebar-border))',
            ring: 'hsl(var(--sidebar-ring))'
          }
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)'
        },
        keyframes: {
          'accordion-down': {
            from: {
              height: '0'
            },
            to: {
              height: 'var(--radix-accordion-content-height)'
            }
          },
          'accordion-up': {
            from: {
              height: 'var(--radix-accordion-content-height)'
            },
            to: {
              height: '0'
            }
          }
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out'
        }
      }
    },
    plugins: [require("tailwindcss-animate")],
  }