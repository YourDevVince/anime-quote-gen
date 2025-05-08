import { useState, useEffect } from 'react';

export function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        'https://yurippe.vercel.app/api/quotes?show=One%20Piece&random=1'
      );

      const data = await response.json();

      // Set the first quote object from the array
      setQuote(data[0]);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({
        quote: "Couldn't fetch a quote. Try again!",
        character: 'Unknown',
        show: 'Unknown',
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to generate Twitter sharing link
  const getTweetLink = () => {
    if (!quote) return '#';
    const tweetText = `"${quote.quote}" - ${quote.character} (${quote.show})`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
  };

  return (
    <div className='p-6 max-w-lg bg-gray-900 text-white rounded-lg shadow-lg text-center'>
      <h1 className='text-4xl font-bold text-rose-300 mb-4'>
        Anime Quote Generator
      </h1>
      {/* At first if theres not a quote it needs to be the prompt */}
      {!quote ? (
        // Message before quote generation
        <p className='text-gray-400 mt-4'>
          Click the button below to generate an anime quote and share it on
          Twitter!
        </p>
      ) : (
        // Display quote
        <>
          <p className='mt-4 text-lg'>"{quote.quote}"</p>
          <p className='mt-2 text-sm text-gray-400'>
            - {quote.character} ({quote.show})
          </p>
        </>
      )}

      {/* Quote Button  */}
      <div className='flex justify-center gap-4 mt-6'>
        {/* Get New Quote Button */}
        <button
          onClick={fetchQuote}
          disabled={loading}
          className={`px-4 py-2 rounded transition ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-rose-300 hover:bg-rose-200 text-black'
          }`}
        >
          {loading
            ? 'Finding Quote...'
            : quote
            ? 'Get New Quote'
            : 'Generate Quote'}
        </button>

        {/* Tweet Button (Appears only after a quote is fetched) */}
        {quote && (
          <a
            href={getTweetLink()}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white transition'
          >
            Tweet This
          </a>
        )}
      </div>
    </div>
  );
}
