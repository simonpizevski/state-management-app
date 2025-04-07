'use client';

import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';

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
  const { data, error, isLoading } = useSWR<Weather>(
    'https://api.tomorrow.io/v4/weather/forecast?location=malmö&apikey=rwI9twG0VuhjYYSTKXlLxgRitBH3qaCt',
    fetcher,
    { refreshInterval: 120000 }
  );

  if (error) return <div>Error loading weather...</div>;
  if (isLoading) return <div>Loading...</div>;

  const location = data?.location?.name;
  const latestTemperature = data?.timelines?.minutely?.[0]?.values?.temperature; // Get temperature of the latest minute

  return (
    <div className='flex flex-col items-center justify-center mt-10 '>
      <h1>Real-Time Weather in: {location}</h1>
      <p>
        Temperature:{' '}
        {latestTemperature !== undefined ? `${latestTemperature}°C` : 'N/A'}
      </p>
    </div>
  );
}
