import { useState, useEffect, useRef } from 'react';
import { PLATFORMS, type PlatformId } from '../data/types';

interface DataPoint {
  year: number;
  quarter: number;
  [key: string]: number | null;
}

// Embedded data (from subscribers_timeline.csv)
const SUBSCRIBER_DATA: DataPoint[] = [
  { year: 2017, quarter: 1, netflix: 98.75, disney_plus: null, amazon_prime: 80, hbo_max: null, hulu: 12, apple_tv: null, paramount_plus: null },
  { year: 2017, quarter: 2, netflix: 103.95, disney_plus: null, amazon_prime: 85, hbo_max: null, hulu: 13, apple_tv: null, paramount_plus: null },
  { year: 2017, quarter: 3, netflix: 109.25, disney_plus: null, amazon_prime: 90, hbo_max: null, hulu: 14, apple_tv: null, paramount_plus: null },
  { year: 2017, quarter: 4, netflix: 117.58, disney_plus: null, amazon_prime: 95, hbo_max: null, hulu: 17, apple_tv: null, paramount_plus: null },
  { year: 2018, quarter: 1, netflix: 125.00, disney_plus: null, amazon_prime: 100, hbo_max: null, hulu: 20, apple_tv: null, paramount_plus: null },
  { year: 2018, quarter: 2, netflix: 130.00, disney_plus: null, amazon_prime: 105, hbo_max: null, hulu: 22, apple_tv: null, paramount_plus: null },
  { year: 2018, quarter: 3, netflix: 137.00, disney_plus: null, amazon_prime: 110, hbo_max: null, hulu: 23, apple_tv: null, paramount_plus: null },
  { year: 2018, quarter: 4, netflix: 139.26, disney_plus: null, amazon_prime: 115, hbo_max: null, hulu: 25, apple_tv: null, paramount_plus: null },
  { year: 2019, quarter: 1, netflix: 148.86, disney_plus: null, amazon_prime: 120, hbo_max: null, hulu: 26, apple_tv: null, paramount_plus: null },
  { year: 2019, quarter: 2, netflix: 151.56, disney_plus: null, amazon_prime: 125, hbo_max: null, hulu: 27, apple_tv: null, paramount_plus: null },
  { year: 2019, quarter: 3, netflix: 158.33, disney_plus: null, amazon_prime: 130, hbo_max: null, hulu: 28, apple_tv: null, paramount_plus: null },
  { year: 2019, quarter: 4, netflix: 167.09, disney_plus: 26.5, amazon_prime: 135, hbo_max: null, hulu: 30.4, apple_tv: null, paramount_plus: null },
  { year: 2020, quarter: 1, netflix: 182.86, disney_plus: 33.5, amazon_prime: 150, hbo_max: null, hulu: 32.1, apple_tv: null, paramount_plus: null },
  { year: 2020, quarter: 2, netflix: 192.95, disney_plus: 57.5, amazon_prime: 165, hbo_max: null, hulu: 35.5, apple_tv: null, paramount_plus: null },
  { year: 2020, quarter: 3, netflix: 195.15, disney_plus: 73.7, amazon_prime: 175, hbo_max: null, hulu: 36.6, apple_tv: null, paramount_plus: null },
  { year: 2020, quarter: 4, netflix: 203.66, disney_plus: 94.9, amazon_prime: 185, hbo_max: null, hulu: 39.4, apple_tv: null, paramount_plus: null },
  { year: 2021, quarter: 1, netflix: 207.64, disney_plus: 103.6, amazon_prime: 190, hbo_max: null, hulu: 41.6, apple_tv: 40, paramount_plus: null },
  { year: 2021, quarter: 2, netflix: 209.18, disney_plus: 116.0, amazon_prime: 195, hbo_max: 67.5, hulu: 42.8, apple_tv: 45, paramount_plus: null },
  { year: 2021, quarter: 3, netflix: 213.56, disney_plus: 118.1, amazon_prime: 200, hbo_max: 69.4, hulu: 43.8, apple_tv: 50, paramount_plus: 32.8 },
  { year: 2021, quarter: 4, netflix: 221.84, disney_plus: 129.8, amazon_prime: 205, hbo_max: 73.8, hulu: 45.3, apple_tv: 55, paramount_plus: 36.0 },
  { year: 2022, quarter: 1, netflix: 221.64, disney_plus: 137.7, amazon_prime: 210, hbo_max: 76.8, hulu: 45.6, apple_tv: 60, paramount_plus: 39.6 },
  { year: 2022, quarter: 2, netflix: 220.67, disney_plus: 152.1, amazon_prime: 215, hbo_max: 80.0, hulu: 46.2, apple_tv: 65, paramount_plus: 43.3 },
  { year: 2022, quarter: 3, netflix: 223.09, disney_plus: 164.2, amazon_prime: 215, hbo_max: 82.0, hulu: 47.2, apple_tv: 68, paramount_plus: 46.0 },
  { year: 2022, quarter: 4, netflix: 230.75, disney_plus: 161.8, amazon_prime: 218, hbo_max: 96.1, hulu: 48.0, apple_tv: 72, paramount_plus: 56.0 },
  { year: 2023, quarter: 1, netflix: 232.50, disney_plus: 157.8, amazon_prime: 220, hbo_max: 97.7, hulu: 48.5, apple_tv: 75, paramount_plus: 60.0 },
  { year: 2023, quarter: 2, netflix: 238.39, disney_plus: 146.1, amazon_prime: 220, hbo_max: 95.8, hulu: 48.3, apple_tv: 78, paramount_plus: 61.0 },
  { year: 2023, quarter: 3, netflix: 247.15, disney_plus: 150.2, amazon_prime: 220, hbo_max: 95.1, hulu: 48.5, apple_tv: 80, paramount_plus: 63.0 },
  { year: 2023, quarter: 4, netflix: 260.28, disney_plus: 149.6, amazon_prime: 220, hbo_max: 97.0, hulu: 50.2, apple_tv: 82, paramount_plus: 67.5 },
  { year: 2024, quarter: 1, netflix: 269.60, disney_plus: 153.6, amazon_prime: 220, hbo_max: 99.6, hulu: 50.5, apple_tv: 85, paramount_plus: 71.0 },
  { year: 2024, quarter: 2, netflix: 277.65, disney_plus: 153.8, amazon_prime: 220, hbo_max: 103.0, hulu: 51.0, apple_tv: 88, paramount_plus: 72.0 },
  { year: 2024, quarter: 3, netflix: 282.72, disney_plus: 158.6, amazon_prime: 220, hbo_max: 110.0, hulu: 51.5, apple_tv: 90, paramount_plus: 72.0 },
  { year: 2024, quarter: 4, netflix: 301.63, disney_plus: 159.0, amazon_prime: 220, hbo_max: 112.0, hulu: 52.0, apple_tv: 92, paramount_plus: 77.0 },
];

const KEY_EVENTS = [
  { date: '2019-11-12', event: 'Disney+ Launch', platform: 'disney_plus' },
  { date: '2020-03-11', event: 'COVID Pandemic', platform: 'all' },
  { date: '2020-05-27', event: 'HBO Max Launch', platform: 'hbo_max' },
  { date: '2021-03-04', event: 'Paramount+ Launch', platform: 'paramount_plus' },
  { date: '2022-04-19', event: 'Netflix First Loss', platform: 'netflix' },
  { date: '2023-05-23', event: 'Password Crackdown', platform: 'netflix' },
  { date: '2024-11-15', event: 'Netflix 300M', platform: 'netflix' },
];

export default function RaceChart() {
  const [currentIndex, setCurrentIndex] = useState(SUBSCRIBER_DATA.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const currentData = SUBSCRIBER_DATA[currentIndex];
  const maxValue = 320; // Max subscribers for scale

  // Get sorted platforms by value
  const getSortedPlatforms = () => {
    const platforms = Object.keys(PLATFORMS) as PlatformId[];
    return platforms
      .map(id => ({
        id,
        value: (currentData[id] as number) || 0,
        ...PLATFORMS[id]
      }))
      .filter(p => p.value > 0)
      .sort((a, b) => b.value - a.value);
  };

  // Animation control
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= SUBSCRIBER_DATA.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const handlePlay = () => {
    if (currentIndex >= SUBSCRIBER_DATA.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const sortedPlatforms = getSortedPlatforms();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold">Subscriber Growth Race</h2>
        <p className="text-white/60">Watch streaming platforms battle for subscribers (2017-2024)</p>
      </div>

      {/* Timeline indicator */}
      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold">
            Q{currentData.quarter} {currentData.year}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              ⏮ Reset
            </button>
            {isPlaying ? (
              <button
                onClick={handlePause}
                className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition"
              >
                ⏸ Pause
              </button>
            ) : (
              <button
                onClick={handlePlay}
                className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition"
              >
                ▶ Play
              </button>
            )}
          </div>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={SUBSCRIBER_DATA.length - 1}
          value={currentIndex}
          onChange={(e) => setCurrentIndex(Number(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-white/40 mt-1">
          <span>2017 Q1</span>
          <span>2024 Q4</span>
        </div>
      </div>

      {/* Race bars */}
      <div className="bg-white/5 rounded-xl p-6 space-y-4">
        {sortedPlatforms.map((platform, index) => (
          <div key={platform.id} className="flex items-center gap-4">
            {/* Rank */}
            <div className="w-8 text-center font-bold text-white/60">
              {index === 0 ? '👑' : index + 1}
            </div>
            
            {/* Platform name */}
            <div className="w-28 font-medium truncate">{platform.name}</div>
            
            {/* Bar */}
            <div className="flex-1 h-10 bg-white/10 rounded-lg overflow-hidden relative">
              <div
                className="h-full rounded-lg transition-all duration-300 ease-out flex items-center justify-end pr-3"
                style={{
                  width: `${(platform.value / maxValue) * 100}%`,
                  backgroundColor: platform.color,
                }}
              >
                <span className="font-bold text-sm text-white drop-shadow">
                  {platform.value.toFixed(1)}M
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key events */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="font-bold mb-4">Key Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {KEY_EVENTS.map((event, i) => {
            const eventDate = new Date(event.date);
            const eventYear = eventDate.getFullYear();
            const eventQuarter = Math.ceil((eventDate.getMonth() + 1) / 3);
            const isActive = currentData.year > eventYear || 
              (currentData.year === eventYear && currentData.quarter >= eventQuarter);
            
            return (
              <div
                key={i}
                className={`p-3 rounded-lg border transition-all ${
                  isActive 
                    ? 'border-white/30 bg-white/10' 
                    : 'border-white/10 opacity-40'
                }`}
              >
                <div className="text-sm text-white/60">{event.date}</div>
                <div className="font-medium">{event.event}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
