# Portfolio Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # React components
│   ├── Layout.tsx         # Global layout with floating dock navigation
│   ├── Hero.tsx           # Hero section with text reveal
│   ├── Experience.tsx     # Experience timeline
│   ├── Projects.tsx       # Bento grid projects showcase
│   ├── Skills.tsx         # Skills display with categories
│   ├── Achievements.tsx   # Achievement badges and counters
│   ├── Contact.tsx        # Contact form and footer
│   ├── NeuralBackground.tsx  # Animated neural network background
│   ├── Kernel3D.tsx       # 3D kernel visualization
│   ├── RadarBackground.tsx   # Radar sweep animation
│   ├── CodeRain.tsx       # Matrix-style code rain
│   └── ScrollProgress.tsx # Scroll progress indicator
├── data/
│   └── resume.ts          # All portfolio data (easily editable)
└── Configuration files    # Next.js, TypeScript, Tailwind configs
```

## Key Features Implemented

✅ **Glassmorphic Terminal Aesthetic**
- Translucent cards with backdrop blur
- Neon accent colors (Green, Purple, Amber)
- Terminal-inspired typography

✅ **Interactive 3D Elements**
- React Three Fiber kernel visualization in hero
- Rotating 3D wireframe models

✅ **Animated Backgrounds**
- Neural network particle system
- Radar sweep for DRDO experience
- Code rain for Teaching Assistant section

✅ **Experience Timeline**
- Vertical timeline with alternating cards
- Scroll-triggered visual theme changes
- Hover-activated background animations

✅ **Projects Bento Grid**
- Masonry layout with special card treatments
- Terminal effect for Linux Terminal project
- Quantum animation for Quantum project
- Tech stack tags with hover effects

✅ **Skills Display**
- Categorized skills with color coding
- Interactive hover effects
- Magnetic button interactions

✅ **Achievements Showcase**
- Animated counters
- Shimmer effects for diamond badge
- Knight icon animation

✅ **Contact Form**
- Glassmorphic form design
- Social media links with magnetic hover
- Footer with branding

## Customization

### Updating Content

All content is stored in `data/resume.ts`. Simply edit this file to update:
- Profile information
- Experience entries
- Projects
- Skills
- Achievements

### Color Scheme

Colors are defined in `tailwind.config.ts`:
- Obsidian: `#0A0A0A`
- Terminal Green: `#00FF41`
- Neural Violet: `#7C3AED`
- Amber: `#F59E0B`

### Fonts

- Headers: JetBrains Mono (monospace)
- Body: Inter (sans-serif)

Both loaded via Next.js Google Fonts optimization.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Build for Production

```bash
npm run build
npm start
```

## Notes

- The portfolio is fully responsive
- All animations use Framer Motion for smooth performance
- 3D elements are lazy-loaded to optimize initial load
- Background animations are optimized with canvas rendering

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires modern browser with WebGL support for 3D elements.
