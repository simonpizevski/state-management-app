'use client';

import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Joke = {
  type: string;
  setup: string;
  delivery: string;
};

const jokeUrl =
  'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';

export default function RandomJoke() {
  const { data, error, isLoading, mutate } = useSWR<Joke>(jokeUrl, fetcher, {
    revalidateOnFocus: false,
  });

  if (error) return <div>Error loading joke...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col items-center justify-center mt-10 mx-60'>
      <h1 className='text-4xl font-bold mb-6'>Random Two-Part Joke</h1>
      <p className='text-2xl'>
        <strong>Setup:</strong> {data?.setup}
      </p>
      <p className='text-2xl'>
        <strong>Punchline:</strong> {data?.delivery}
      </p>

      <button
        onClick={() => mutate()}
        className='mt-6 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600'
      >
        Get another joke
      </button>
    </div>
  );
}
