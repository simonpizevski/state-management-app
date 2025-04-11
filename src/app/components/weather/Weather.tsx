'use client';

import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

type Weather = {
  location: {
    name: string;
  };
  timelines: {
    minutely: Array<{
      time: string;
      values: {
        temperature: number;
      };
    }>;
  };
};

export default function LatestWeather() {
  const apiUrl =
    `https://api.tomorrow.io/v4/weather/forecast?location=malmö&apikey=` +
    apiKey;
  console.log('API URL:', apiUrl);

  const { data, error, isLoading, mutate } = useSWR<Weather>(apiUrl, fetcher, {
    refreshInterval: 300000,
  });

  if (error) return <div>Error loading weather...</div>;
  if (isLoading) return <div>Loading...</div>;

  const location = data?.location?.name;
  const minutelyTimeline = data?.timelines?.minutely ?? [];
  const latestTemp =
    minutelyTimeline[minutelyTimeline.length - 1]?.values?.temperature;
  const latestTime = minutelyTimeline[minutelyTimeline.length - 1]?.time;

  return (
    <div className='flex flex-col items-center justify-center mt-10 '>
      <h1>Real-Time Weather in: {location}</h1>
      <p>Temperature: {latestTemp !== undefined ? `${latestTemp}°C` : 'N/A'}</p>
      <p>Time: {latestTime}</p>
    </div>
  );
}
