import Image from 'next/image';
import styles from './page.module.css';
import RandomJoke from './components/joke/RandomJoke';
import LatestWeather from './components/weather/Weather';

export default function Home() {
  return (
    <div>
      <div>
        Joke
        <RandomJoke />
      </div>
    </div>
  );
}
