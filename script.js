const API_KEY = 'buSumDNthZyYBSW1zNIm1omnZzs466XyyAwkhdig'; // Replace with your NASA API Key
const BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date().toISOString().split("T")[0];
    getCurrentImageOfTheDay();

    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedDate = document.getElementById('search-input').value;
        getImageOfTheDay(selectedDate);
    });

    loadSearchHistory();
});

function getCurrentImageOfTheDay() {
    const url = BASE_URL;
    fetch(url)
        .then(response => response.json())
        .then(data => displayImage(data))
        .catch(error => console.error('Error fetching current image:', error));
}

function getImageOfTheDay(date) {
    const url = `${BASE_URL}&date=${date}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
            saveSearch(date);
            addSearchToHistory(date);
        })
        .catch(error => console.error('Error fetching image for selected date:', error));
}

function displayImage(data) {
    const container = document.getElementById('current-image-container');
    container.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h3>${data.title}</h3>
        <p>${data.date}</p>
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

function addSearchToHistory(date) {
    const searchHistory = document.getElementById('search-history');
    const listItem = document.createElement('li');
    listItem.textContent = date;
    listItem.addEventListener('click', () => {
        getImageOfTheDay(date);
    });
    searchHistory.appendChild(listItem);
}

function loadSearchHistory() {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(date => addSearchToHistory(date));
}
