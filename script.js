// API key obtained from NASA's website
const apiKey = 'LIWaIwAtfbZFadX8U5IhPqqmxbw1I5k0bz4I0wRq';
const currentDate = new Date().toISOString().split('T')[0];

// Function to fetch data from the NASA API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}

// Function to display the current image of the day
async function getCurrentImageOfTheDay() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;
  console.log(currentDate);
  const data = await fetchData(url);
  displayImage(data);
}

// Function to display the image for a specific date
async function getImageOfTheDay(date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  const data = await fetchData(url);
  displayImage(data);
  saveSearch(date);
  addSearchToHistory();
}

// Function to save a date to local storage
function saveSearch(date) {
  let searches = localStorage.getItem('searches');
  if (searches) {
    searches = JSON.parse(searches);
  } else {
    searches = [];
  }
  searches.push(date);
  localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to add the search history to the UI
function addSearchToHistory() {
  const searchHistory = document.getElementById('search-history');
  searchHistory.innerHTML = '';
  let searches = localStorage.getItem('searches');
  if (searches) {
    searches = JSON.parse(searches);
    searches.forEach((date) => {
      const listItem = document.createElement('li');
      listItem.textContent = date;
      listItem.addEventListener('click', () => {
        getImageOfTheDay(date);
      });
      searchHistory.appendChild(listItem);
    });
  }
}

// Function to display the image in the UI
function displayImage(data) {
  const currentImageContainer = document.getElementById('current-image-container');
  currentImageContainer.innerHTML = '';

  const image = document.createElement('img');
  image.src = data.url;
  image.alt = data.title;
  currentImageContainer.appendChild(image);

  const explanation = document.getElementById('explanation');
  explanation.innerHTML = '';
  const p = document.createElement('p');
  const p2 = document.createElement('h3');
  p.textContent = data.explanation;
  p2.textContent = data.title;
  explanation.appendChild(p2);
  explanation.appendChild(p);
}


// Event listener for the search form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const date = searchInput.value;
  getImageOfTheDay(date);
  searchInput.value = '';
});

// Run the getCurrentImageOfTheDay function when the page loads
document.addEventListener('DOMContentLoaded', () => {
  getCurrentImageOfTheDay();
  addSearchToHistory();
});
