# QAP3 - Neighboring Countries React App
Christopher Britten - Semester 2 QAP3

## Project Overview
A React application that fetches country data from an API and filters countries based on whether their neighbor names start with specific letters (A or I).

## Setup Instructions

### 1. Clone/Download Project
```bash
git clone https://github.com/Britten66/S2_QAP3.git
cd qap3-neighbors
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Project Structure
```
qap3-neighbors/
├── src/
│   ├── components/
│   │   ├── NeighborA.jsx       # Displays countries with "A" neighbors
│   │   ├── NeighborA.css       # Styles for NeighborA component
│   │   ├── NeighborI.jsx       # Displays countries with "I" neighbors
│   │   └── NeighborI.css       # Styles for NeighborI component
│   ├── App.jsx                 # Main component with fetch logic
│   ├── App.css                 # Main app styles
│   └── main.jsx                # Entry point
├── package.json
└── README.md
```

## How It Works

### 1. Data Fetching (App.jsx)
- Uses `useEffect` hook to fetch data on component mount
- Fetches from: `https://restcountries.com/v2/all`
- Stores all countries in state

### 2. Filtering Logic
The app filters countries in two ways:

**Countries with neighbors starting with "A":**
```javascript
const filteredResultA = data.filter((country) => {
  if (!country.borders) return false;
  return country.borders.some((borderCode) => {
    const neighbor = data.find((c) => c.alpha3Code === borderCode);
    return neighbor?.name.startsWith("A");
  });
});
```

**Countries with neighbors starting with "I":**
- Same logic, checks for names starting with "I"

### 3. State Management
```javascript
const [showA, setShowA] = useState(false);  // Toggle A component
const [showI, setShowI] = useState(false);  // Toggle I component
const [neighborsA, setNeighborsA] = useState([]);  // Filtered A data
const [neighborsI, setNeighborsI] = useState([]);  // Filtered I data
```

### 4. Conditional Rendering
```javascript
{showA && <NeighborsA countries={neighborsA} />}
{showI && <NeighborsI countries={neighborsI} />}
```

## Technologies Used
- **React** - UI library
- **Vite** - Build tool
- **CSS3** - Styling
- **REST Countries API** - Data source

## API Data Structure
Each country object contains:
```javascript
{
  name: "Canada",
  capital: "Ottawa",
  flags: { svg: "url...", png: "url..." },
  borders: ["USA"],
  alpha3Code: "CAN"
}
```

## Key Learning Concepts
1. **React Hooks**: `useState`, `useEffect`
2. **API Fetching**: Using `fetch()` with `.then()` promises
3. **Array Methods**: `.filter()`, `.some()`, `.find()`, `.map()`
4. **Conditional Rendering**: Using `&&` operator
5. **Props**: Passing data between components
6. **Component Structure**: Separating concerns

## Resources Used

## Resources Used
Class lectures and notes  
React Documentation: https://react.dev  
REST Countries API: https://restcountries.com  
OpenAI (ChatGPT) for debugging help, code review, and clarifying React concepts  
Claude for debugging help, code review, and clarifying React concepts  
YouTube tutorials  
Stack Overflow  
Google.ca
Google has a wide variety of api resources .. used them often 

## Time Spent
- Initial setup: _2_ hours
- Component development: _4_ hours
- Styling: _2_ hours
- Debugging: _6_ hours
- google api work arounds _2.5_ hours
- map added _3_ hours
- app styling containers _2_ hours
- research _4_ hours
- **Total: _25.5_ hours**



## Author
Christopher Britten - Semester 2 QAP3


