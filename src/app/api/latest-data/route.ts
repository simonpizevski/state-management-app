import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url =
    'https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=rwI9twG0VuhjYYSTKXlLxgRitBH3qaCt';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Tomorrow.io');
    }
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
