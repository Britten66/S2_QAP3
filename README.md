# Country Search

A React app that searches live country data from the REST Countries API. Search by name, capital, region, or language and browse results with an interactive map view.

**Live:** https://country-lookup-program.netlify.app

---

## Setup

```bash
git clone https://github.com/Britten66/country-lookup-program.git
cd qap3-neighbors
npm install
npm run dev
```

Runs at `http://localhost:5173`

---

## Features

- Search countries by name, official name, capital, region, or language
- Results sorted by relevance — exact matches first, then partial
- Flag display, country facts panel, and Google Maps embed per result
- Previous / Next navigation through results
- Neighbor countries resolved to full names (not codes)
- Responsive layout

---

## Tech

- React 19 + Vite
- REST Countries API v3.1
- Google Maps Embed API
- CSS with Flexbox and media queries

---

## Project Structure

```
src/
├── components/
│   └── MapView.jsx
├── App.jsx
├── App.css
└── main.jsx
```

---

## How It Works

On load, all country data is fetched once and stored in state:

```javascript
fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3,languages,currencies,region")
```

Search filters against name, official name, capital, region, and languages — then sorts by match quality:

```javascript
results.sort((a, b) => {
  const an = a.name.common.toLowerCase();
  const bn = b.name.common.toLowerCase();
  if (an === query) return -1;
  if (bn === query) return 1;
  if (an.startsWith(query) && !bn.startsWith(query)) return -1;
  if (bn.startsWith(query) && !an.startsWith(query)) return 1;
  return an.localeCompare(bn);
});
```

MapView renders each result with its flag, facts, and an embedded map:

```jsx
<iframe
  src={`https://www.google.com/maps?q=${encodeURIComponent(current.name.common)}&output=embed`}
  loading="lazy"
/>
```
