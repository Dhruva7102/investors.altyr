/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			'altyr-bg': '#18021A',
  			'altyr-bg-dark': '#0d0110',
  			'altyr-magenta': '#AC0064',
  			'altyr-purple': '#64109A',
  			'altyr-purple-light': '#9B4DCA',
  			'altyr-orange': '#E85A24',
  			'altyr-orange-light': '#FF8C42',
  			'altyr-amber': '#B56A00',
  			'status-casual': '#6B7280',
  			'status-regular': '#3B82F6',
  			'status-vip': '#A855F7',
  			'status-superfan': '#FFD700',
  			'badge-bronze': '#CD7F32',
  			'badge-silver': '#C0C0C0',
  			'badge-gold': '#FFD700',
  			'badge-platinum': '#E5E4E2',
  			'tier-superfan': '#FFD700',
  			'tier-devotee': '#A855F7',
  			'tier-angel': '#60A5FA',
  			'tier-archangel': '#E5E4E2',
  			'badge-founder': '#AC0064',
  			'badge-anniversary': '#F59E0B',
  			'badge-early': '#10B981',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
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
  			},
  			'badge-glow': {
  				'0%, 100%': { boxShadow: '0 0 6px 0 var(--badge-glow-color, rgba(255,215,0,0.15))' },
  				'50%': { boxShadow: '0 0 12px 2px var(--badge-glow-color, rgba(255,215,0,0.3))' },
  			},
  			'badge-aurora': {
  				'0%': { borderColor: '#06B6D4' },
  				'33%': { borderColor: '#8B5CF6' },
  				'66%': { borderColor: '#EC4899' },
  				'100%': { borderColor: '#06B6D4' },
  			},
  			'badge-flame': {
  				'0%, 100%': { boxShadow: '0 0 8px 1px rgba(245,158,11,0.2)' },
  				'33%': { boxShadow: '0 0 12px 2px rgba(239,68,68,0.25)' },
  				'66%': { boxShadow: '0 0 10px 2px rgba(172,0,100,0.2)' },
  			},
  			'badge-earn': {
  				'0%': { transform: 'scale(0.5)', opacity: '0' },
  				'60%': { transform: 'scale(1.15)', opacity: '1' },
  				'100%': { transform: 'scale(1)', opacity: '1' },
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'badge-glow': 'badge-glow 2s ease-in-out infinite',
  			'badge-aurora': 'badge-aurora 8s linear infinite',
  			'badge-flame': 'badge-flame 3s ease-in-out infinite',
  			'badge-earn': 'badge-earn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}