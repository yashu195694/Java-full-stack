// Get DOM elements
const jokeDisplay = document.getElementById('joke-display');
const newJokeButton = document.getElementById('new-joke-btn');
const loadingText = document.querySelector('.loading-text');

// Function to fetch and display a joke
async function fetchAndDisplayJoke() {
    const apiUrl = 'https://api.chucknorris.io/jokes/random';
    
    // 1. Show loading state and clear previous joke
    jokeDisplay.textContent = ''; 
    loadingText.style.display = 'block';
    newJokeButton.disabled = true; // Disable button during fetch

    try {
        // 2. Fetch the data from the API
        const response = await fetch(apiUrl);
        
        // Check if the request was successful (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 3. Convert the response to JSON format
        const data = await response.json();
        
        // The joke text is typically in the 'value' field of this API's response
        const joke = data.value;
        
        // 4. Update the DOM with the new joke
        jokeDisplay.textContent = joke;
        
    } catch (error) {
        // 5. Handle any errors (network issue, parsing error, etc.)
        console.error('Failed to fetch joke:', error);
        jokeDisplay.textContent = 'Sorry, could not fetch a joke at this time.';
        
    } finally {
        // 6. Hide loading state and re-enable button
        loadingText.style.display = 'none';
        newJokeButton.disabled = false;
    }
}

// Initial joke load when the script runs
fetchAndDisplayJoke();

// Add event listener to the button
newJokeButton.addEventListener('click', fetchAndDisplayJoke);