README.md

md
# SkyScope Weather

A modern, interactive weather application that provides real-time weather conditions and a 5-day forecast with a personality-driven interface.

## Features

- 🔍 **Location Search** - Search weather by city, region, or ZIP code
- 📍 **Geolocation** - Get weather for your current location with one click
- 🌤️ **Real-time Weather** - View current conditions including temperature, wind speed, humidity, and pressure
- 📅 **5-Day Forecast** - See weather predictions with high/low temperatures
- 🎨 **Modern UI** - Beautiful, responsive design with glassmorphism effects
- 📱 **Mobile Responsive** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast & Lightweight** - No build process required, pure vanilla JavaScript

## Demo

Simply open `index.html` in your web browser to get started. No installation or build process needed!

## How It Works

### Search by Location
1. Enter a city name, region, or ZIP code in the search field
2. Click the "Search" button
3. View live weather data and the 5-day forecast

### Use Current Location
1. Click "Use my current location" button
2. Allow browser access to your location when prompted
3. Weather data for your current position loads automatically

## API Integration

This project uses free, open-source weather APIs:

- **Geocoding API** - [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api)
  - Converts location names to coordinates
  
- **Weather API** - [Open-Meteo Weather Forecast](https://open-meteo.com/en/docs)
  - Provides current weather and 5-day forecast data
  - Supports multiple weather parameters and timezone auto-detection

## Weather Codes

The application includes a comprehensive mapping of WMO weather codes to human-readable descriptions:

- 0 - Clear sky
- 1-3 - Cloudy conditions
- 45, 48 - Fog
- 51-67 - Precipitation (drizzle, rain, freezing rain)
- 71-86 - Snow conditions
- 95-99 - Thunderstorms

See `script.js` for the complete weather code reference.

## Project Structure

. ├── index.html # HTML structure and semantic markup ├── script.js # JavaScript logic and API interactions ├── styles.css # Styling with modern CSS features └── README.md # This file

Code

## File Descriptions

### index.html
- Semantic HTML5 structure
- Search interface with input field and buttons
- Weather display card (initially hidden)
- 5-day forecast panel
- Status message area

### script.js
- Event listeners for search and geolocation buttons
- `getCoordinatesFromLocation()` - Geocoding functionality
- `getWeather()` - Fetches weather data from Open-Meteo API
- `loadWeatherByCoordinates()` - Loads and displays weather data
- `renderForecast()` - Renders 5-day forecast cards
- Weather code mapping and icon selection logic

### styles.css
- Modern glassmorphism design
- CSS Grid for responsive layouts
- Gradient backgrounds
- Mobile-first responsive design
- Smooth animations and transitions

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Requires JavaScript enabled
- Geolocation requires HTTPS (or localhost for testing)

## Getting Started

### Quick Start
```bash
# No installation needed - just open in a browser
open index.html
Local Development
For best results, serve over HTTPS or use a local development server:

bash
# Using Python 3
python -m http.server 8000

# Using Node.js with http-server
npx http-server

# Using any other local server
# Then navigate to http://localhost:8000 (or your server's port)
Note: Geolocation functionality requires HTTPS in production or localhost in development.

Usage Examples
Search for a City
Type "New York" or "London" in the search field
Click "Search"
View current weather and 5-day forecast
Search by ZIP Code
Type a ZIP code (e.g., "10001", "SW1A 1AA")
Click "Search"
Weather data loads for that location
Use Current Location
Click "Use my current location"
Grant permission when browser prompts
Your local weather appears instantly
Features in Detail
Current Weather Display
Shows real-time conditions including:

Current temperature
Weather description with emoji icon
"Feels like" temperature
Wind speed (km/h)
Humidity percentage
Atmospheric pressure (hPa)
Exact coordinates (latitude/longitude)
Observation time
5-Day Forecast
Displays upcoming weather with:

Date (abbreviated day and date format)
Weather description
High temperature
Low temperature
Responsive Design
Adapts to all screen sizes
Optimized mobile layout with adjusted font sizes
Touch-friendly interface
Error Handling
The application includes robust error handling:

Location not found messages
API failure notifications
Geolocation permission denial handling
Browser compatibility checks
User-friendly error messages with red text
Status Messages
Real-time feedback includes:

"Ready. You can search a location or use your current location."
"Finding location..."
"Fetching weather data..."
"Weather data loaded successfully."
Specific error messages if something goes wrong
Technologies Used
HTML5 - Semantic markup
CSS3 - Modern styling with gradients, flexbox, and grid
JavaScript (ES6+) - Vanilla JS with async/await
Fetch API - For HTTP requests
Geolocation API - For browser location access
Open-Meteo APIs - Free, no-key-required weather data
Customization
Modify Default Temperature Unit
To change from Celsius to Fahrenheit, update the API calls in script.js:

JavaScript
// Change the endpoint to use Fahrenheit_2mF instead
Change Color Scheme
Edit the CSS variables in styles.css:

CSS
:root {
  color-scheme: light;
  /* Modify the gradient background */
  /* Update accent colors (currently indigo/purple) */
}
Add More Weather Details
Extend the API call in getWeather() to include additional parameters from Open-Meteo's extensive options.

Limitations
API Rate Limiting - Open-Meteo has rate limits (generous free tier)
Location Accuracy - Search relies on geocoding API accuracy
5-Day Forecast Only - Extended forecasts not included
No Caching - Each search makes fresh API calls
Auto Units - Uses metric (°C, km/h, hPa) based on Open-Meteo defaults
Future Enhancements
Potential improvements:

 Cache recent searches
 Save favorite locations
 Hourly forecast view
 Air quality data
 Weather alerts
 Multiple temperature unit toggle
 Dark mode theme
 Map integration
 Historical weather data
 UV index display
License
This project is open source and available for personal and commercial use.

Credits
Weather data: Open-Meteo - Free weather API
Icons: Unicode weather emoji
Font: Inter (system fallback)
Support
For issues or questions:

Check browser console for error messages (F12)
Ensure JavaScript is enabled
Verify internet connection
Try a different location search
Clear browser cache if experiencing stale data
SkyScope Weather - Weather with personality ☀️🌧️⛈️
