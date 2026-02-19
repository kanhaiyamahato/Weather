# ☁️ SkyView — Weather Application

A beautiful, minimalistic weather app built with **HTML**, **CSS**, and **JavaScript** — perfect for beginners!

---

## 🌟 Features (Completed)

### ✅ Navbar with Smart Search
- Search by **city name** (e.g., London, Tokyo, Mumbai)
- Search by **pin code** (e.g., 10001 for New York)
- **Current location** detection using browser geolocation
- Sticky glassmorphism navbar design

### ✅ Live Weather Animations (Background)
The background changes dynamically based on the current weather:
| Weather | Animation | Theme Color |
|---------|-----------|-------------|
| ☀️ Sunny | Pulsing sun with rays | Pink-orange gradient |
| ☁️ Cloudy | Floating clouds | Purple gradient |
| 🌧️ Rain | Falling raindrops + dark clouds | Dark teal gradient |
| ❄️ Snow | Snowflakes falling | Light gray-blue gradient |
| ⛈️ Thunder | Lightning flashes + rain | Dark purple gradient |
| 🌫️ Mist/Fog | Drifting fog layers | Gray gradient |
| 🌙 Night | Moon + twinkling stars | Deep navy gradient |

### ✅ Weather Details Display
- Current temperature (°C)
- "Feels like" temperature
- Weather description with matching icon
- Humidity, Wind Speed, Visibility, Pressure
- Sunrise & Sunset times

### ✅ Developer Footer
- Developer avatar, name, and role
- Social media links (GitHub, LinkedIn, Twitter, Email)
- Animated heart icon
- Copyright notice

### ✅ Responsive Design
- Works on desktop, tablet, and mobile
- Adaptive grid layout for weather details
- Mobile-friendly navbar with stacked search

---

## 📂 Project Structure

```
index.html          → Main HTML page
css/
  └── style.css     → All styles, animations & responsive design
js/
  └── app.js        → Weather fetching, DOM manipulation & animations
README.md           → This file
```

---

## 🔗 Entry URI

| Path | Description |
|------|-------------|
| `/index.html` | Main weather application page |

---

## 🌐 API Used

- **[wttr.in](https://wttr.in)** — Free weather API, no API key required
  - Endpoint: `https://wttr.in/{location}?format=j1`
  - Supports city names, pin codes, and coordinates
  - CORS-friendly, returns JSON data

---

## 🛠️ Technologies

- **HTML5** — Semantic page structure
- **CSS3** — Glassmorphism, animations, gradients, responsive grid
- **JavaScript (ES6+)** — Fetch API, DOM manipulation, Geolocation API
- **Font Awesome 6** — Weather & UI icons (via CDN)
- **Google Fonts** — Poppins font family (via CDN)

---

## 🚀 How to Use

1. **Search a city**: Type any city name in the search bar and press Enter or click the arrow
2. **Search by pin code**: Type a postal/pin code (e.g., `10001` for NYC)
3. **Use current location**: Click the location crosshair icon in the navbar
4. **Click quick tips**: On the welcome screen, click any tip to try it instantly

---

## 📝 Features Not Yet Implemented

- 5-day weather forecast display
- Temperature unit toggle (°C / °F)
- Recent search history
- Weather alerts/warnings
- Dark/Light mode toggle
- Hourly forecast chart

---

## 🔮 Recommended Next Steps

1. Add a **5-day forecast** section with daily cards
2. Implement **°C/°F toggle** button in the navbar
3. Store **recent searches** in localStorage
4. Add **weather-based greeting** messages (e.g., "Don't forget your umbrella!")
5. Create an **hourly forecast chart** using Chart.js
6. Add **share weather** functionality via social media

---

## 👨‍💻 Developer

- **Name**: Your Name
- **Role**: Frontend Developer
- **Links**: Update the footer in `index.html` with your actual social links

---

*Built with ❤️ as a beginner-friendly weather app project*
