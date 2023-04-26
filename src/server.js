const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const app = express();

// Enable CORS for all routes
const allowedOrigins = ['http://localhost:5173']; // Update with the URL of your Vue.js application
app.use(cors({
  origin: allowedOrigins
}));

// API endpoint
app.get('/weather', (req, res) => {
  // Make axios request to external API
  axios.get('https://api.weather.gov/gridpoints/TOP/31,80/forecast')
    .then(response => {
      // Send response data to client
      res.json(response.data);
    })
    .catch(error => {
      // Error handling
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data from server.' });
    });
});

app.get('/api/marketwatch', async (req, res) => {
  try {
    const response = await axios.get('https://www.marketwatch.com/investing/bond/tmubmusd10y?countrycode=bx&mod=home-page');
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
