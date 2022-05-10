const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Display new quote
const newQuote = () => {
	showLoader();
	const randomNumber = Math.floor(Math.random() * apiQuotes.length);
	// Pick random quote from apiQuotes array
	const quote = apiQuotes[randomNumber];

	// Check quote length to determine its styling
	if (quote.text.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}

	// Set quote, hide loader
	quoteText.textContent = quote.text;
	hideLoader();

	// Check if author field is empty and replace with "Unknown"
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}
};

// Get quotes from API
const getQuotes = async () => {
	showLoader();
	const apiUrl = 'https://type.fit/api/quotes';

	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		// Handle error here
	}
};

// Tweet Quote
const tweetQuote = () => {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

	window.open(twitterUrl, '_blank');
};

// Show Loader
const showLoader = () => {
	loader.hidden = false;
	quoteContainer.hidden = true;
};

// Hide Loader
const hideLoader = () => {
	loader.hidden = true;
	quoteContainer.hidden = false;
};

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

// On DOM Load
getQuotes();
