@AGENTS.md

---

# Website Management Guide

## Project Overview

- **Framework:** Next.js (App Router) — read `node_modules/next/dist/docs/` before writing any Next.js code
- **Styling:** Inline styles + per-page `<style>` tags (not Tailwind)
- **Deployed:** Vercel, auto-deploys on push to `main`
- **Repo:** `shivaanpatwa-stack/my-portfolio`
- **Design system:** Midnight Blueprint — background `#080a0f`, accent `#1a6fff` (Electric Cobalt Blue), font stack: Cormorant Garamond (headings), DM Sans (body), DM Mono (labels/code)

---

## Common Commands

```bash
# Stage all changes, commit, and push
git add . && git commit -m "message" && git push

# Stage specific file
git add app/finance/page.tsx && git commit -m "message" && git push

# Copy a photo to public and commit
cp ~/Desktop/Photo-name.JPG ~/Desktop/my-portfolio/public/
git add public/Photo-name.JPG && git commit -m "add photo" && git push
```

---

## Photo Naming Conventions

All photos live in `/public/` and are served at `/<filename>` in the browser.

| Country | Pattern | Example |
|---------|---------|---------|
| Single-visit countries | `CountryName-photo-N.jpg` | `Kenya-photo-1.jpg` |
| Multi-visit countries | `CountryName-photo-N-YEAR.JPG` | `Switzerland-photo-1-2024.JPG` |
| Special cases | No hyphen within compound names | `SriLanka-photo-1.jpg`, `HongKong-photo-1.JPG` |
| Vatican | Lowercase first letter | `vatican-photo-1.JPG` |

**Important:** Use lowercase `.jpg` extension for new photos — Vercel's Linux servers are case-sensitive and `.JPG` can cause issues. For legacy files already committed as `.JPG`, keep them as-is to avoid breaking existing references.

---

## Adding a New WFJ Article (`app/finance/page.tsx`)

Articles live in the `WFJ_ARTICLES` array near the top of the file. Add new entries at the **end** of the array. The `id` is sequential (last id + 1). Week number follows the last entry.

### Field reference

```typescript
{
  id: 18,                          // sequential integer
  title: "Article Title Here",
  date: "30 Mar – 5 Apr 2026",    // date range covered
  week: "Week 18",                 // "Week XX" — zero-pad single digits: "Week 01"
  tags: ["Tag1", "Tag2"],          // 1–3 short tag strings
  tldr: "One sentence summary.",   // shown in card preview, keep under 120 chars
  content: `1. Section Title\nSection body text.\n\n2. Next Section\nBody text.\n\nConclusion\nClosing thought.`,
}
```

### Content formatting rules
- Sections separated by `\n\n`
- Section headers: `1. Title` (number + dot + space + title)
- Bullet points within a section: `• Item` (use `•` character)
- Real-world examples: state company/index name, date, and actual figures
- No markdown — plain text only inside the template literal

---

## Adding a New Country to the Passport Page (`app/passport/page.tsx`)

Countries live in the `COUNTRIES` array. Add new entries in chronological order by `year`.

### Required fields

```typescript
{
  id: "countryname",              // lowercase, no spaces (used as React key)
  name: "Country Name",           // display name
  flag: "🇦🇺",                   // flag emoji
  region: "Asia",                 // one of: "Europe" | "Asia" | "Middle East" | "Africa" | "Americas" | "Oceania"
  year: "2025",                   // year visited; multiple visits: "2015, 2024"
  badge: "Badge Label",           // short 2-3 word stamp label shown on card
  color: "#e63946",               // hex accent colour for the stamp card
  vibe: "Personal reflection...", // 2-4 sentence personal description, first person, conversational
  highlights: ["Place", "Thing"], // 3-5 highlight strings shown as pills
  photo: "https://images.unsplash.com/photo-XXXXXXXXXX?w=800&q=80", // hero image URL
  photoCaption: "Place, Country", // alt text / caption for hero image
  lat: -25,                       // latitude (used to place pin on globe)
  lon: 133,                       // longitude
}
```

### Optional fields (add when available)

```typescript
  // Simple gallery — all photos from one trip:
  photos: ["/Country-photo-1.jpg", "/Country-photo-2.jpg", "/Country-photo-3.jpg"],

  // Grouped gallery — photos from multiple trips:
  photoGroups: [
    { year: "2015", photos: ["/Country-photo-1-2015.JPG", "/Country-photo-2-2015.JPG"] },
    { year: "2024", photos: ["/Country-photo-1-2024.JPG"] },
  ],
```

### Adding personal photos to a country modal

1. Copy photos to public folder:
   ```bash
   cp ~/Desktop/Country-photo-1.jpg ~/Desktop/my-portfolio/public/
   ```
2. Commit the photos:
   ```bash
   git add public/Country-photo-1.jpg && git commit -m "add Country photos" && git push
   ```
3. Update the country entry in `app/passport/page.tsx` to add the `photos` or `photoGroups` field
4. Commit the code change:
   ```bash
   git add app/passport/page.tsx && git commit -m "add Country personal photo gallery in modal" && git push
   ```

### Hero photo URL guidance
- Prefer Pexels URLs: `https://images.pexels.com/photos/XXXXXXX/pexels-photo-XXXXXXX.jpeg?w=800&auto=compress`
- Unsplash fallback: `https://images.unsplash.com/photo-XXXXXXXXXX?w=800&q=80`
- Always verify the URL actually loads before committing — broken hero photos are the most visible bug on the page

---

## Updating the Country Count

When a new country is added, update **all three** of these locations:

| File | Location | What to change |
|------|----------|----------------|
| `app/page.tsx` | `STATS` array, line ~15 | `{ value: "30", label: "Countries Explored", sub: "& counting" }` |
| `app/page.tsx` | `generateResume()` function, Global Exposure section | `"30 countries across 6 continents..."` |
| `app/passport/page.tsx` | Page header stat display | Find the countries count display near the top and update the number |

---

## Adding a New Experience Entry (`app/experience/page.tsx`)

Entries live in the `EXPERIENCES` array. Add new entries at the **top** of the array (most recent first). Increment `id` sequentially.

### Field reference

```typescript
{
  id: 6,                             // next sequential integer
  year: "Mar 2026",                  // display date — month + year, or range like "Jun–Jul 2025"
  title: "Program or Project Name",
  role: "Your Role — Grade X",       // role description; add grade if relevant
  category: "Leadership",            // one of: "Professional" | "Leadership" | "Environment" | "Academic"
  summary: "What happened...",       // 2-3 sentences, factual, what you did
  insight: "What you learned...",    // 2-4 sentences, reflective, personal voice — this is the most important field
  skills: ["#Tag1", "#Tag2"],        // hashtag-style skill strings, 2-4 items
  photo: null,                       // null or a public image path like "/experience-photo.jpg"
  highlight: false,                  // true = featured card with gold accent; use sparingly
}
```

After adding an entry, also add it to the `SKILLS` array if it introduces new skills — map the skill label to the entry's `id`.

---

## Page Structure Reference

| Page | File | Key data arrays |
|------|------|----------------|
| Homepage | `app/page.tsx` | `STATS`, `generateResume()` |
| Finance / WFJ | `app/finance/page.tsx` | `WFJ_ARTICLES` |
| MUN Arena | `app/mun/page.tsx` | conference data arrays |
| Experience Vault | `app/experience/page.tsx` | `EXPERIENCES`, `SKILLS` |
| Passport | `app/passport/page.tsx` | `COUNTRIES` |
| Connect | `app/connect/page.tsx` | `CONTACTS` inline |
