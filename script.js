const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Display new quote
const newQuote = () => {
	const randomNumber = Math.floor(Math.random() * apiQuotes.length);
	// Pick random quote from apiQuotes array
	const quote = apiQuotes[randomNumber];

	// Check quote length to determine its styling
	if (quote.text.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	quoteText.textContent = quote.text;

	// Check if author field is empty and replace with "Unknown"
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}
};

// Get quotes from API
const getQuotes = async () => {
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

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

// On DOM Load
getQuotes();
