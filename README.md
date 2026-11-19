# Chintwo — Visual Artist & Storyteller Portfolio (Artonaut Redesign)

A complete visual, architectural, and experiential redesign of the **Chintwo** portfolio website (`https://artist-portfolio-studio.web.app`), meticulously reconstructing the editorial design language, darkroom aesthetic, technical registration markings, typography hierarchy, and composition of **Artonaut** (`https://artonaut.in`).

---

## Design System & Architecture

- **Visual Tone**: Atmospheric darkroom carbon (`#0a0a0c`), subtle structural elevations (`#111114`), bone/linen accents (`#f2efe9`), and muted gold metadata (`#c5a880`).
- **Typography**: 
  - Display: `Inter` (geometric neo-grotesque with tight tracking `-0.065em` and uppercase architectural weight)
  - Editorial Accents: `Playfair Display` (expressive italic serifs for artist philosophy)
  - Technical Notation: `Fragment Mono` for coordinates, scale indices (`01 / 06`), dimensions, and timestamps
- **Architectural Grid & Markings**:
  - 4-column hairline guide lines (`.bg-grid-guidelines`)
  - Optical corner brackets / viewfinder registration marks on all visual frames (`.c-tl`, `.c-tr`, `.c-bl`, `.c-br`)
  - Film measurement ticks & status pills (`● ATELIER • LONDON & KYOTO`)
- **Pages**:
  1. `index.html` — Homepage featuring Hero Diptych, "Simply, the work." curated folio, Atelier Materials & Tools, "Any questions?" FAQ accordion, Journal preview, and Closing CTA.
  2. `portfolio.html` — Full catalogue with category filter tabs and interactive lightbox modal.
  3. `about.html` — Two-column editorial layout with sticky artist sidebar, Echizen washi history, philosophy of *Ma*, and exhibition chronology.
  4. `blog.html` — In-depth Field Notes & Essays ("Artist's Diary") with full readable essays and process imagery.
  5. `contact.html` — Private viewing appointments, acquisition inquiries, direct studio email, and interactive inquiry form.

---

## Local Development & Build

```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
