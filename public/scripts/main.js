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
    console.log("Full API response:", data);
    
    // Check if the response contains the expected data structure.
    if (data && data.data && Array.isArray(data.data.list)) {
      // Initialize a string to hold the HTML for the search results.
      let resultHTML = '<h2>Airbnb Listings</h2>';
      
      // Loop through each listing in the response data.
      data.data.list.forEach((listingWrapper, index) => {
        // Extract the listing details and pricing information.
        const listing = listingWrapper.listing;
        const pricing = listingWrapper.pricingQuote.structuredStayDisplayPrice.primaryLine;
        const imageUrl = listing.contextualPictures.length > 0 ? listing.contextualPictures[0].picture : '';
        
        // Add the listing information to the HTML string.
        resultHTML += `
          <div>
            <h3>${listing.title || 'No Title Provided'}</h3>
            <p>${listing.city || 'No City Provided'}</p>
            <p>${pricing.price ? pricing.price + ' ' + pricing.qualifier : 'No Price Provided'}</p>
            <img src="${imageUrl}" alt="Listing Image">
            <a href="https://www.airbnb.com/rooms/${listing.id}" target="_blank">View on Airbnb</a>
          </div>
        `;
      });
      
      // Update the webpage with the search results.
      document.getElementById('searchResult').innerHTML = resultHTML;
    } else {
      // Display a message if no listings were found.
      document.getElementById('searchResult').innerHTML = '<p>No listings found.</p>';
    }
  });
  