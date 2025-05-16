/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main Colors
        primary: '#3B82F6', // Blue (for buttons, accents)
        secondary: '#1D4ED8', // Dark Blue (used for headers or backgrounds)
        accent: '#FBBF24', // Amber (for highlights, call-to-action buttons)
        lightAccent: '#F3F4F6', // Light Grey (for backgrounds, cards)

        // Background Colors
        darkBackground: '#1E293B', // Dark Background (for dark mode and footers)
        lightBackground: '#FFFFFF', // White (light mode background)
        neutralBackground: '#F9FAFB', // Light Grey Background (neutral areas)

        // Text Colors
        textPrimary: '#F3F4F6', // Light text (for main text)
        textSecondary: '#6B7280', // Grey (for secondary text and muted text)
        textAccent: '#FBBF24', // Accent Color (for links or hover text)
        
        // Hover/Interaction States
        hoverPrimary: '#2563EB', // Hover effect for primary buttons/links
        hoverSecondary: '#1D4ED8', // Hover effect for secondary buttons/links
        hoverAccent: '#F59E0B', // Hover effect for accent buttons/links

        // Borders and Dividers
        borderLight: '#E5E7EB', // Light border (for dividing sections)
        borderDark: '#374151', // Darker border (for darker themes)
      },
    },
  },
  
  plugins: [],
}
// This configuration file for Tailwind CSS defines custom colors and extends the default theme.
// The colors are categorized into main colors, background colors, text colors, hover states, and borders.