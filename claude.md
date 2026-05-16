# Inari — Complete Website Build Instructions
# AI Coding Agent Instruction File
# Use this file to build the complete Inari website

---

## Project Overview

Build a premium, portfolio-grade, Awwwards-level marketing website for **Inari** — a home services booking platform targeting urban Indian homeowners. This site will be used as a UX portfolio piece and evaluated by design professors. Every detail matters. No generic AI aesthetics. This must feel like a real funded startup's website.

---

## Tech Stack

```
Next.js 14 (App Router)
TypeScript
Tailwind CSS
GSAP + ScrollTrigger
Lenis (smooth scroll)
Framer Motion (micro interactions)
Lucide React (icons)
```

Install all dependencies:
```bash
npm install gsap @gsap/react lenis framer-motion lucide-react clsx tailwind-merge
```

---

## Design System

### Colors
```css
--bg:           #0A1A0F    /* deep dark green — main background */
--surface:      #1A5C38    /* primary brand green */
--surface-2:    #0F2318    /* slightly lighter dark for sections */
--glass:        rgba(255, 255, 255, 0.06)
--glass-hover:  rgba(255, 255, 255, 0.10)
--border:       rgba(255, 255, 255, 0.10)
--border-hover: rgba(255, 255, 255, 0.22)
--amber:        #E8722A    /* primary CTA color */
--amber-glow:   rgba(232, 114, 42, 0.25)
--gold:         #C9A84C    /* premium accent */
--white:        #F5F5F0    /* warm white for text */
--muted:        rgba(245, 245, 240, 0.50)
--muted-2:      rgba(245, 245, 240, 0.30)
```

### Typography
Import from Google Fonts in layout.tsx:
- **Syne** (weights 400, 600, 700, 800) — Display / Headlines
- **DM Sans** (weights 300, 400, 500) — Body / UI text

```css
font-display: Syne, sans-serif      /* hero, section titles, wordmark */
font-body: DM Sans, sans-serif      /* body, nav, buttons, captions */
```

### Glassmorphism Card Style (apply everywhere)
```css
background: rgba(255, 255, 255, 0.06);
border: 1px solid rgba(255, 255, 255, 0.10);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border-radius: 20px;
```

### Spacing Scale
```
Section padding vertical: 120px (py-30)
Container max width: 1280px
Section inner gap: 64px
Card gap: 24px
```

---

## Global Setup Files

### app/globals.css
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --bg: #0A1A0F;
  --surface: #1A5C38;
  --surface-2: #0F2318;
  --glass: rgba(255, 255, 255, 0.06);
  --glass-hover: rgba(255, 255, 255, 0.10);
  --border: rgba(255, 255, 255, 0.10);
  --border-hover: rgba(255, 255, 255, 0.22);
  --amber: #E8722A;
  --amber-glow: rgba(232, 114, 42, 0.25);
  --gold: #C9A84C;
  --white: #F5F5F0;
  --muted: rgba(245, 245, 240, 0.50);
  --muted-2: rgba(245, 245, 240, 0.30);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: auto; /* Lenis handles this */
}

body {
  background-color: var(--bg);
  color: var(--white);
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5 {
  font-family: 'Syne', sans-serif;
}

::selection {
  background: var(--amber);
  color: #fff;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--bg);
}
::-webkit-scrollbar-thumb {
  background: var(--surface);
  border-radius: 3px;
}
```

### lib/gsap.ts
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const fadeInUp = (
  element: string | Element,
  delay: number = 0,
  duration: number = 0.8
) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
    }
  );
};

export const staggerIn = (
  elements: string | Element[],
  stagger: number = 0.12,
  delay: number = 0
) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      delay,
      ease: 'power3.out',
    }
  );
};
```

### components/SmoothScroll.tsx
```typescript
'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}
```

---

## CUSTOM NAVBAR COMPONENT

### components/Navbar.tsx

Build this exactly:

**Design:**
- Fixed position, top: 24px, centered horizontally
- Floating frosted glass pill — NOT full width
- Width: auto (fits content), max 900px
- Background: rgba(10, 26, 15, 0.80)
- Backdrop blur: 24px
- Border: 1px solid rgba(255,255,255,0.12)
- Border radius: 100px (full pill)
- Padding: 10px 10px 10px 28px
- Box shadow: 0 8px 32px rgba(0,0,0,0.40)
- Transition: all 0.4s ease

**Left side:** 
- "Inari" wordmark in Syne Bold 20px warm white
- Green dot accent (8px, #1A5C38, glowing)

**Center:**
- Nav links: Services, How it Works, About, Contact
- Font: DM Sans 14px, color rgba(245,245,240,0.75)
- Hover: color #F5F5F0, underline slides in from left
- Gap between links: 36px

**Right side:**
- "Book a Service" button
- Background: #E8722A
- Color: white
- Padding: 12px 22px
- Border radius: 100px
- Font: DM Sans 14px medium
- Hover: background #d4641e, box-shadow 0 0 20px rgba(232,114,42,0.40)
- Framer Motion: whileTap scale 0.96

**Scroll behavior:**
- On scroll > 80px: reduce padding, increase blur
- Add subtle border opacity increase

**Mobile (< 768px):**
- Pill becomes full width with 16px margins
- Hide center nav links
- Show hamburger icon (Lucide Menu icon)
- Mobile menu: full screen overlay
  - background rgba(10,26,15,0.97)
  - backdrop blur 24px
  - nav links stacked centered, 32px apart
  - Syne Bold 36px
  - Close icon top right
  - Framer Motion: slide down from top on open
  - Stagger links in one by one

```typescript
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          padding: scrolled ? '8px 8px 8px 24px' : '10px 10px 10px 28px',
          background: scrolled
            ? 'rgba(10, 26, 15, 0.92)'
            : 'rgba(10, 26, 15, 0.80)',
          backdropFilter: `blur(${scrolled ? '32px' : '24px'})`,
          WebkitBackdropFilter: `blur(${scrolled ? '32px' : '24px'})`,
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 100,
          boxShadow: '0 8px 32px rgba(0,0,0,0.40)',
          transition: 'all 0.4s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{
            width: 28, height: 28,
            background: 'linear-gradient(135deg, #1A5C38, #2E7D52)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={14} color="#E8722A" fill="#E8722A" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#F5F5F0' }}>
            Inari
          </span>
        </Link>

        {/* Nav Links — Desktop only */}
        <div style={{ display: 'flex', gap: 32 }} className="hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                color: 'rgba(245,245,240,0.70)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F0')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,240,0.70)')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* CTA Button */}
          <motion.div whileTap={{ scale: 0.96 }}>
            <Link
              href="/book"
              style={{
                background: '#E8722A',
                color: '#fff',
                padding: '11px 22px',
                borderRadius: 100,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                display: 'block',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#d4641e';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(232,114,42,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#E8722A';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Book a Service
            </Link>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 10,
              padding: '8px',
              color: '#F5F5F0',
              cursor: 'pointer',
            }}
            className="flex md:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              background: 'rgba(10, 26, 15, 0.97)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'absolute',
                top: 28,
                right: 24,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10,
                padding: '8px',
                color: '#F5F5F0',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            {/* Mobile nav links */}
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: 36,
                    color: '#F5F5F0',
                    textDecoration: 'none',
                    display: 'block',
                    textAlign: 'center',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                style={{
                  background: '#E8722A',
                  color: '#fff',
                  padding: '16px 40px',
                  borderRadius: 100,
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'block',
                  marginTop: 8,
                }}
              >
                Book a Service
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## CUSTOM FOOTER COMPONENT

### components/Footer.tsx

**Design:**
- Background: #060D08 (darkest green-black)
- Top border: 1px solid rgba(255,255,255,0.08)
- Padding: 80px 0 40px
- Max width container: 1280px centered

**Layout — 3 rows:**

**Row 1 — Brand + Links (4 columns)**

Column 1 — Brand (wider):
- Inari logo + wordmark (same as navbar)
- Tagline: "Trusted home care, on demand."
- DM Sans 15px muted color
- Social icons row below: Instagram, Twitter/X, LinkedIn, YouTube
  - Each: 36px circle, glass background, icon inside
  - Hover: amber border appears

Column 2 — Services:
- Heading "Services" Syne Bold 13px gold color, letter-spacing 0.1em uppercase
- Links: Home Cleaning, Plumbing, Electrical, Painting, AC Service, Carpentry
- DM Sans 14px muted, hover white

Column 3 — Company:
- Heading "Company" same style
- Links: About Us, How it Works, Careers, Blog, Press, Partners

Column 4 — Support:
- Heading "Support" same style
- Links: Help Centre, Contact Us, Safety, Terms of Service, Privacy Policy, Cookie Policy

**Row 2 — Divider**
- 1px solid rgba(255,255,255,0.08)
- Margin: 48px 0 32px

**Row 3 — Bottom bar**
- Left: "© 2025 Inari Technologies Pvt. Ltd. All rights reserved."
  DM Sans 13px muted
- Center: "Made with care for Indian homes 🏠"
  DM Sans 13px muted centered
- Right: App store badges (text only, styled as small pills):
  "App Store" and "Google Play"
  Glass pill style, hover amber border

**Micro details:**
- Subtle noise texture overlay on footer background
- All link hovers: color transitions 0.2s ease
- Footer fades in on scroll with GSAP

```typescript
'use client';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Youtube, Zap } from 'lucide-react';
import Link from 'next/link';

const services = ['Home Cleaning', 'Plumbing', 'Electrical', 'Painting', 'AC Service', 'Carpentry'];
const company = ['About Us', 'How it Works', 'Careers', 'Blog', 'Press', 'Partners'];
const support = ['Help Centre', 'Contact Us', 'Safety', 'Terms of Service', 'Privacy Policy', 'Cookies'];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

const FooterLinkGroup = ({ title, links }: { title: string; links: string[] }) => (
  <div>
    <p style={{
      fontFamily: 'Syne, sans-serif',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#C9A84C',
      marginBottom: 20,
    }}>
      {title}
    </p>
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {links.map((link) => (
        <li key={link}>
          <Link
            href="#"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              color: 'rgba(245,245,240,0.55)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F0')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,240,0.55)')}
          >
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer style={{
      background: '#060D08',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '80px 0 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        bottom: -100,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 600,
        height: 300,
        background: 'radial-gradient(ellipse, rgba(26,92,56,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr 1fr 1fr',
          gap: 60,
          marginBottom: 64,
        }}>

          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32,
                background: 'linear-gradient(135deg, #1A5C38, #2E7D52)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={16} color="#E8722A" fill="#E8722A" />
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#F5F5F0' }}>
                Inari
              </span>
            </Link>

            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 15,
              color: 'rgba(245,245,240,0.50)',
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 260,
            }}>
              Trusted home care, on demand. Book verified professionals for every corner of your home.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={label}
                  style={{
                    width: 38,
                    height: 38,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(245,245,240,0.60)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#E8722A';
                    (e.currentTarget as HTMLElement).style.color = '#E8722A';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,240,0.60)';
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkGroup title="Services" links={services} />
          <FooterLinkGroup title="Company" links={company} />
          <FooterLinkGroup title="Support" links={support} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 0 32px' }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(245,245,240,0.35)' }}>
            © 2025 Inari Technologies Pvt. Ltd. All rights reserved.
          </p>

          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(245,245,240,0.35)' }}>
            Made with care for Indian homes 🏠
          </p>

          {/* App badges */}
          <div style={{ display: 'flex', gap: 8 }}>
            {['App Store', 'Google Play'].map((store) => (
              <motion.a
                key={store}
                href="#"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 8,
                  padding: '6px 14px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 12,
                  color: 'rgba(245,245,240,0.55)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,114,42,0.50)';
                  (e.currentTarget as HTMLElement).style.color = '#F5F5F0';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,240,0.55)';
                }}
              >
                {store}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## HOME PAGE — app/page.tsx

Build all 8 sections in this order:

### Section 1 — Hero

Full viewport height (100vh). 

Background: radial gradient — `radial-gradient(ellipse 80% 60% at 50% 0%, #1A5C38 0%, #0A1A0F 65%)`

Floating glass orbs (decorative, no interaction):
- Orb 1: 600px circle, top-left, rgba(26,92,56,0.25), blur 80px
- Orb 2: 400px circle, bottom-right, rgba(26,92,56,0.15), blur 60px
- Orb 3: 200px circle, center-right, rgba(232,114,42,0.08), blur 40px

Center content (max-width 800px, centered):

Trust pill:
```
● Trusted by 50,000+ homeowners
```
Pill style: glass background, green dot, DM Sans 13px, border rgba white 12%, padding 8px 16px, border-radius 100px

Headline (Syne Bold):
```
Line 1: "Care for every"           — font-size 80px, color #F5F5F0
Line 2: "corner of your"           — font-size 80px, color #F5F5F0  
Line 3: "home."                    — font-size 80px, color #E8722A
```

Subtext (DM Sans 18px, muted, max-width 520px, centered, line-height 1.7):
```
"Book verified professionals for cleaning, plumbing, electrical, 
and more. Fast. Transparent. Trusted."
```

CTA buttons (side by side, gap 12px):
- Primary: "Book a Service →" — amber filled, pill, 52px height, DM Sans 15px
- Secondary: "See How it Works" — glass, white outlined, same height

Trust badges row (below CTAs, gap 32px):
```
🛡 Verified Pros    ⭐ 4.9 Rating    ⚡ 60 Min Response
```
DM Sans 13px, muted color, small icon left

GSAP on load animation:
- Trust pill fades in first (delay 0.2s)
- Each headline line staggers in from y:40 (delay 0.4s, 0.5s, 0.6s)
- Subtext fades in (delay 0.8s)
- Buttons fade in (delay 1.0s)
- Trust badges fade in (delay 1.2s)

### Section 2 — Services Card Scroll

Section height: 300vh (creates scroll room)
Sticky inner container: 100vh, overflow hidden

Left column (40%, fixed while scrolling):
- Small label: "What we offer" gold uppercase 11px
- Heading Syne Bold 52px: Updates per active card
- Description DM Sans 16px muted: Updates per card
- Progress indicator: dots for each card

Right column (60%):
Cards stack — GSAP pins section, cards slide in from right as user scrolls

6 service cards, each 320px × 420px glass card:
```
Card 1 — Home Cleaning
  Icon: Sparkles (lucide)
  Gradient tint: rgba(59,130,246,0.15) blue
  Heading: "Home Cleaning"
  Desc: "Deep cleaning, regular maintenance, post-renovation cleanup"
  Price: "From ₹299"
  
Card 2 — Plumbing
  Icon: Droplets
  Gradient tint: rgba(14,165,233,0.15)
  Heading: "Plumbing"
  Desc: "Leak repair, pipe fitting, bathroom installation"
  Price: "From ₹199"

Card 3 — Electrical
  Icon: Zap
  Gradient tint: rgba(168,85,247,0.15)
  Heading: "Electrical"
  Desc: "Wiring, switchboard repair, appliance installation"
  Price: "From ₹249"

Card 4 — Painting
  Icon: Paintbrush
  Gradient tint: rgba(234,88,12,0.12)
  Heading: "Painting"
  Desc: "Interior, exterior, texture, and waterproofing"
  Price: "From ₹899"

Card 5 — AC Service
  Icon: Wind
  Gradient tint: rgba(6,182,212,0.15)
  Heading: "AC Service"
  Desc: "Installation, cleaning, gas refill, repair"
  Price: "From ₹349"

Card 6 — Carpentry
  Icon: Hammer
  Gradient tint: rgba(120,80,40,0.15)
  Heading: "Carpentry"
  Desc: "Furniture assembly, door fitting, custom woodwork"
  Price: "From ₹399"
```

### Section 3 — How It Works

Section id: "how-it-works"
Background: #0F2318

Centered header:
- Label: "Simple process" gold uppercase
- Heading: "Book in 4 simple steps" Syne Bold 52px

4 step cards in a row (responsive: 2x2 on mobile):

```
Step 1 — Search
  Number: "01" Syne Bold 64px amber, low opacity
  Icon: Search (lucide) 32px
  Title: "Search"
  Desc: "Choose your service and enter your Bangalore location"

Step 2 — Select
  Number: "02"
  Icon: UserCheck
  Title: "Select"
  Desc: "Pick a verified professional with real reviews and ratings"

Step 3 — Schedule
  Number: "03"
  Icon: Calendar
  Title: "Schedule"
  Desc: "Choose a date and time slot that works for you"

Step 4 — Relax
  Number: "04"
  Icon: Shield
  Title: "Relax"
  Desc: "Your professional arrives on time. Guaranteed."
```

Connecting line between cards — animates from left to right on scroll (SVG line or div)

GSAP: Cards stagger in from y:50 with 0.15s between each

### Section 4 — Why Inari (Bento Grid)

Heading: "Why thousands choose Inari"

Bento grid — 4 cells asymmetric:
```
[ Large Card — Verified Pros ]  [ Medium — Transparent Pricing ]
[ Medium — Live Tracking      ]  [ Tall — 4.9 Rating            ]
```

Card 1 Large — "Verified Professionals":
- Background: glass with subtle green gradient
- Large heading, description
- Stat: "10,000+ verified professionals"
- Visual: row of avatar circles

Card 2 — "Transparent Pricing":
- Show price breakdown visual
- "No hidden charges. Ever."

Card 3 — "Live Tracking":
- Mini map illustration (SVG or CSS)
- "Track your professional in real time"

Card 4 — "4.9★ Rating":
- Giant "4.9" in Syne Bold 96px amber
- Stars row
- "Based on 2,40,000 reviews"
- 2 short review quotes

### Section 5 — Testimonials

Heading: "What our customers say"

Two rows of testimonial cards, scrolling infinitely:
- Row 1: scrolls left
- Row 2: scrolls right (opposite)

Use CSS animation keyframes for infinite scroll

8 testimonials — Indian names and cities:
```
1. Priya Mehta, Mumbai — "Booked a plumber within 10 minutes. He arrived on time and fixed everything. Highly recommend Inari!"
2. Arjun Sharma, Bangalore — "The electrical work was done perfectly. Transparent pricing, no surprises."
3. Kavita Reddy, Hyderabad — "Best home services app I have used. The cleaning team was thorough and professional."
4. Rahul Gupta, Delhi — "AC service was quick and affordable. Will definitely book again."
5. Sneha Iyer, Chennai — "Love the live tracking feature. Knew exactly when the plumber would arrive."
6. Vikram Patel, Pune — "The painter did an amazing job. Great quality at a fair price."
7. Ananya Singh, Kolkata — "Inari made home maintenance so easy. 5 stars!"
8. Rohan Nair, Kochi — "Verified professionals, real reviews, fast booking. This is how it should be."
```

Each testimonial card:
- Glass card, 300px wide
- Quote icon amber top
- Quote text DM Sans 14px
- Customer name Syne Bold 15px
- City + star rating muted

### Section 6 — CTA Banner

Background: linear-gradient(135deg, #E8722A 0%, #C9A84C 100%)
Subtle animated gradient shift

Heading Syne Bold 56px white: "Your home deserves the best care"
Subtext DM Sans 18px rgba white 80%: "Join 50,000+ homeowners who trust Inari"

Button: dark filled pill — "Book Your First Service →"
Background #0A1A0F, color white

---

## SERVICES PAGE — app/services/page.tsx

Hero:
- Heading: "Professional services for every home"
- Subtext about 8 categories
- Search bar glass style

Filter tabs: All, Most Popular, Emergency, Maintenance

8 service cards grid (4 cols desktop, 2 cols mobile):
- Same cards as scroll section but in grid
- Hover: card lifts 8px, amber border

---

## ABOUT PAGE — app/about/page.tsx

Hero: "Built for Indian homes"

Story section (split): text left, decorative right

Stats row:
- 50K+ Customers
- 10K+ Professionals  
- 20+ Cities
- 4.9 Average Rating

Mission card: glass, centered

Values (4 cards):
- Trust: "Every professional is background-verified"
- Speed: "Average booking time under 3 minutes"
- Transparency: "Fixed pricing, no hidden charges"
- Care: "24/7 support for every booking"

Team (3 cards — fictional Indian founders):
- Aditya Menon — Co-founder & CEO
- Priya Krishnamurthy — Co-founder & CTO
- Rohan Bhat — Head of Operations

---

## CONTACT PAGE — app/contact/page.tsx

Split layout:

Left (info):
- Heading: "Get in touch"
- Address: "Indiranagar, Bangalore, Karnataka 560038"
- Phone: "+91 80 4567 8900"
- Email: "hello@inari.in"
- Hours: "Mon–Sat, 9AM–7PM IST"
- Social links

Right (form — glass card):
- Floating label inputs: Name, Email, Phone, Message
- "Send Message" amber button
- Framer Motion: form slides in from right

---

## BOOKING FLOW

### app/book/page.tsx — Step 1: Select Service
Progress bar: Step 1 of 4 active

Grid of service category cards (selectable):
- Click to select, amber border appears
- Selected state: amber background tint

Location input below with pin icon

"Continue →" amber button (disabled until service selected)

Store selection in localStorage key "inari-booking"

### app/book/provider/page.tsx — Step 2: Choose Provider
Progress bar: Step 2 of 4

Show selected service at top in small chip

Filter chips: Top Rated, Nearest, Price Low-High

4 provider cards:
```
Provider 1: Rajesh Kumar — Expert Plumber — 4.9★ — 248 jobs — ₹299/hr
Provider 2: Amit Patel — Senior Plumber — 4.7★ — 183 jobs — ₹249/hr
Provider 3: Suresh Reddy — Plumbing Specialist — 4.8★ — 312 jobs — ₹320/hr
Provider 4: Vijay Singh — Certified Plumber — 4.6★ — 97 jobs — ₹220/hr
```
(Adapt names/specialty to match selected service)

Click card to select, amber border highlights

"Continue →" button

### app/book/schedule/page.tsx — Step 3: Date & Time
Progress bar: Step 3 of 4

Calendar — clean, minimal
Selected date: amber background

Time slots grid:
Morning: 8AM, 9AM, 10AM, 11AM
Afternoon: 12PM, 1PM, 2PM, 3PM, 4PM
Evening: 5PM, 6PM

Summary sidebar (right, sticky):
- Selected service
- Selected provider
- Price
- "Edit" links

"Continue →" button

### app/book/confirm/page.tsx — Step 4: Confirm
Progress bar: Step 4 of 4

Booking summary glass card:
- Service, Provider with avatar, Date, Time
- Address input (editable)
- Price breakdown: Base + Platform fee + Total

Payment method (3 radio cards):
- UPI (GPay/PhonePe)
- Credit/Debit Card
- Cash on Delivery

"Confirm Booking" amber button

On click → success modal:
- Animated green checkmark (Framer Motion)
- "Booking Confirmed!" heading
- Booking ID generated
- "Back to Home" button
- Confetti effect (CSS keyframe animation)

---

## ANIMATION GUIDELINES

### Page Load (every page)
- Navbar fades in from top (delay 0s)
- Hero content staggers in (delay 0.2–1.2s)

### Scroll Animations
Use GSAP ScrollTrigger with start "top 80%" for most sections:
- Section headings: fadeInUp on scroll
- Cards: stagger in with 0.12s between
- Stats: count up animation when in view

### Micro Interactions (Framer Motion)
- All buttons: whileHover scale 1.02, whileTap scale 0.96
- Cards: whileHover translateY -4px
- Glass cards: border brightens on hover

### Card Scroll Section (Critical)
Use GSAP pin + horizontal scroll:
```javascript
gsap.to(cardsContainer, {
  x: -(cardWidth * (totalCards - 1)),
  ease: "none",
  scrollTrigger: {
    trigger: sectionRef,
    start: "top top",
    end: "+=300%",
    pin: true,
    scrub: 1,
  }
});
```

---

## RESPONSIVE BREAKPOINTS

```
Mobile:  < 768px  — single column, 16px padding
Tablet:  768-1024px — 2 columns, 24px padding
Desktop: > 1024px  — full layout, 40px padding
```

Mobile specific:
- Navbar: pill full width, hamburger menu
- Hero: heading 48px instead of 80px
- Card scroll: horizontal scroll touch-based
- How it works: 2x2 grid
- Footer: single column stacked

---

## QUALITY REQUIREMENTS

Before completing, verify:
- [ ] Lenis smooth scroll works on all pages
- [ ] GSAP card scroll pins and scrubs correctly
- [ ] All page transitions are smooth
- [ ] Booking flow data persists between steps (localStorage)
- [ ] Success modal appears on booking confirm
- [ ] Mobile responsive at 375px width
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Google Fonts load correctly
- [ ] All amber CTAs consistent (#E8722A)
- [ ] Navbar scroll behavior works
- [ ] Footer social icon hover states work

---

## START ORDER

Build in this sequence:
1. app/globals.css + tailwind.config.ts
2. lib/gsap.ts
3. components/SmoothScroll.tsx
4. components/Navbar.tsx (custom — see full code above)
5. components/Footer.tsx (custom — see full code above)
6. app/layout.tsx (wrap with SmoothScroll, include Navbar + Footer)
7. app/page.tsx (Hero section first, then remaining sections)
8. app/services/page.tsx
9. app/about/page.tsx
10. app/contact/page.tsx
11. app/book/page.tsx
12. app/book/provider/page.tsx
13. app/book/schedule/page.tsx
14. app/book/confirm/page.tsx

---

*End of Inari build instructions. Every design decision above is intentional and must be followed precisely. This is a portfolio-grade project.*
