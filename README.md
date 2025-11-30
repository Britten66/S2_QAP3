# QAP3 – Neighboring Countries React App
**Author:** Christopher Britten  
**Course:** Semester 2 – QAP 3  

## Summary
A React application that fetches live country data from the REST Countries API and filters countries based on whether they have neighbors whose names start with **A** or **I**. The app includes an interactive country viewer with navigation buttons, flag display, country facts, and a Google Maps embed showing the selected country’s location.

---

## Setup
```bash
git clone https://github.com/Britten66/S2_QAP3.git
cd qap3-neighbors
npm install
npm run dev
```

App runs at:  
`http://localhost:5173`

---

## Tech Used
- React (Vite)
- REST Countries API v3.1  
- Google Maps Embed (query-based iframe)
- CSS (custom layout + dark theme)

---

## Project Structure
```plaintext
src/
├── components/
│   ├── MapView.jsx
│   ├── NeighborA.jsx
│   ├── NeighborI.jsx
│   ├── NeighborA.css
│   ├── NeighborI.css
├── App.jsx
├── app.css
└── main.jsx
```

---

## How It Works

### Fetching Data
REST Countries API is called on load:

```javascript
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3,languages,currencies"
)
```

Results are stored and filtered into two categories:  
- Countries with **A-starting** neighbors  
- Countries with **I-starting** neighbors  

### Filtering Example
```javascript
const filteredResultA = data.filter((country) => {
  if (!country.borders) return false;
  return country.borders.some((code) => {
    const neighbor = data.find(c => c.cca3 === code);
    return neighbor?.name.common.startsWith("A");
  });
});
```

### Navigation + Country Display
`MapView.jsx` shows:
- Flag  
- Country name  
- Capital  
- Border codes  
- Languages  
- Currency  
- Quick facts sidebar  
- Prev / Next buttons  

### Google Maps Embed
```jsx
const query = encodeURIComponent(current.name.common);

<iframe
  src={`https://www.google.com/maps?q=${query}&output=embed`}
  title={current.name.common}
  loading="lazy"
/>
```

---

## Styling
Dark theme (`#0d1117`) with blue accent colors.  
Flexbox layout for side-by-side country info and map.  
Rounded containers and spacing adjustments for readability.

---

## Time Spent
```plaintext
Initial setup ............... 2.0 hrs
Component development ........ 4.0 hrs
Styling ...................... 2.0 hrs
Debugging .................... 6.0 hrs
Google API experimentation ... 2.5 hrs
Map integration .............. 3.0 hrs
Container styling ............ 2.0 hrs
Research ..................... 4.0 hrs
README documentation ......... 1.5 hrs
------------------------------------------------
Total ....................... 27.0 hours
```

---

## Resources Used
Class notes  
React documentation  
REST Countries API  
OpenAI / Claude for debugging  
Stack Overflow  
YouTube tutorials  
Google (API research)

