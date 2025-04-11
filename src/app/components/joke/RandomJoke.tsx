'use client';

import useSWR from 'swr';
import { useState, useEffect } from 'react';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Joke = {
  id: number;
  type: string;
  setup: string;
  delivery: string;
  error?: boolean;
};

const jokeUrl =
  'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';

export default function RandomJoke() {
  const [requestCount, setRequestCount] = useState(0);
  const [favorites, setFavorites] = useState<Joke[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const { data, error, isLoading, isValidating, mutate } = useSWR<Joke>(
    jokeUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3000,
      onSuccess: () => setRequestCount((prev) => prev + 1),
      onError: () => console.error('Failed to fetch joke'),
    }
  );

  const addToFavorites = () => {
    if (!data) return;
    const alreadyFavorited = favorites.some((j) => j.id === data.id);
    if (!alreadyFavorited) {
      setFavorites((prev) => [...prev, data]);
    }
  };

  if (error) return <div>Error loading joke...</div>;
  if (isLoading) return <div>Loading initial joke...</div>;

  return (
    <div className='flex flex-col items-center justify-center mt-10 mx-60'>
      <h1 className='text-4xl font-bold mb-6'>Random Two-Part Joke</h1>

      <div className='mb-6 text-center'>
        <p className='text-2xl'>
          <strong>Setup:</strong> {data?.setup}
        </p>
        <p className='text-2xl'>
          <strong>Punchline:</strong> {data?.delivery}
        </p>
        {isValidating && (
          <p className='text-blue-500 mt-2'>Checking for fresh jokes...</p>
        )}
      </div>

      <div className='flex gap-4'>
        <button
          onClick={() => mutate()}
          className='px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600'
          disabled={isValidating}
        >
          {isValidating ? 'Fetching...' : 'Get New Joke'}
        </button>

        <button
          onClick={addToFavorites}
          className='px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600'
        >
          Save as Favorite
        </button>
      </div>

      <div className='mt-8 text-sm text-gray-500'>
        <p>Requests made: {requestCount}</p>
        <p>Cache status: {data ? 'Loaded' : 'Empty'}</p>
      </div>

      {favorites.length > 0 && (
        <div className='mt-10 w-full'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>
            Favorite Jokes({favorites.length})
          </h2>
          <ul className='space-y-4'>
            {favorites.map((joke) => (
              <li
                key={joke.id}
                className='border border-gray-300 p-4 rounded-xl  shadow-sm'
              >
                <p>
                  <strong>Setup:</strong> {joke.setup}
                </p>
                <p>
                  <strong>Punchline:</strong> {joke.delivery}
                </p>
                <p className='text-xs text-gray-400'>Joke ID: {joke.id}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
