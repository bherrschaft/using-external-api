const express = require('express');
// Import the Express library to create a web server.

const axios = require('axios');
// Import the Axios library to make HTTP requests.

const path = require('path');
// Import the Path module to handle file paths.

const app = express();
// Create an instance of an Express application.

const PORT = process.env.PORT || 3001;
// Define the port to run the server on, defaulting to 3001 if not set by the environment.

app.use(express.static(path.join(__dirname, 'public')));
// Serve the static files (HTML, CSS, JS) from the 'public' directory.

app.use(express.urlencoded({ extended: true }));
// Parse URL-encoded data (form data) so it can be accessed in req.body.

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// When the root URL is accessed, send the index.html file.

app.post('/search', async (req, res) => {
  const city = req.body.city;
  // Get the city name from the submitted form data.

  const options = {
    method: 'GET',
    url: 'https://airbnb45.p.rapidapi.com/api/v1/searchPropertyByLocation',
    params: {
      location: city,
      selfCheckin: '0',
      instantBook: '0',
      allowsPets: '0',
      guestFavorite: '0',
      flexibleCancellation: '0',
      typeOfPlace: 'entire_home'
    },
    headers: {
      'x-rapidapi-key': '23900efa57msh6872edc10bd8484p154f5djsnba355d08ff93',
      'x-rapidapi-host': 'airbnb45.p.rapidapi.com'
    }
  };
  // Define the parameters and headers for the API request.

  try {
    const response = await axios.request(options);
    console.log("API Response:", response.data);
    // Make the request to the external API using Axios and log the response data.

    res.send(response.data);
    // Send the API response back to the client.
  } catch (error) {
    console.error(error);
    // Log any errors that occur during the API request.

    res.status(500).send({ error: 'Error retrieving Airbnb listings' });
    // Send an error message back to the client if the request fails.
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Start the Express server and listen on the specified port.
