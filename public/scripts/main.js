// Select the form with the ID 'searchForm' and listen for its 'submit' event.
document.getElementById('searchForm').addEventListener('submit', async (e) => {
  // Prevent the default form submission action (which refreshes the page).
  e.preventDefault();
  
  // Get the value that the user entered into the input field with the ID 'city'.
  const city = document.getElementById('city').value;
  
  // Send a POST request to the '/search' endpoint on the server, including the city name in the request body.
  const response = await fetch('/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `city=${city}`
  });
  
  // Convert the response from the server to JSON format.
  const data = await response.json();
  console.log("Parsed API response:", data); // Log the parsed API response to the console for inspection.
  
  // Check if the response contains data.
  if (data && Array.isArray(data)) {
    // Initialize a string to hold the HTML for the search results.
    let resultHTML = '<h2 class="col-12">Airbnb Listings</h2>';
    
    // Loop through each listing in the response data.
    data.forEach((listing, index) => {
      // Add the listing information to the HTML string.
      resultHTML += `
        <div class="col-md-4 mb-4 d-flex align-items-stretch">
          <div class="card">
            <img src="${listing.imageUrl}" class="card-img-top" alt="Listing Image">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${listing.title}</h5>
              <p class="card-text">${listing.city}</p>
              <p class="card-text">${listing.price}</p>
              <a href="${listing.link}" class="btn btn-primary mt-auto" target="_blank">View on Airbnb</a>
            </div>
          </div>
        </div>
      `;
    });
    
    // Update the webpage with the search results.
    document.getElementById('searchResult').innerHTML = resultHTML;
  } else {
    // Display a message if no listings were found.
    document.getElementById('searchResult').innerHTML = '<p class="col-12">No listings found.</p>';
  }
});
