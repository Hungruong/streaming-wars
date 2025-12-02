import { useState, useMemo } from 'react';

// Platform config
const PLATFORMS = [
  { id: 'Netflix', color: '#E50914', key: 'Netflix' },
  { id: 'Disney+', color: '#113CCF', key: 'Disney+' },
  { id: 'Prime Video', color: '#00A8E1', key: 'Prime Video' },
  { id: 'Hulu', color: '#1CE783', key: 'Hulu' },
];

// Sample aggregated data (from Kaggle dataset analysis)
const CONTENT_DATA = [
  { platform: 'Netflix', totalTitles: 3560, avgRating: 5.8, originalCount: 1200 },
  { platform: 'Prime Video', totalTitles: 12000, avgRating: 5.2, originalCount: 800 },
  { platform: 'Disney+', totalTitles: 1200, avgRating: 6.8, originalCount: 400 },
  { platform: 'Hulu', totalTitles: 2800, avgRating: 5.5, originalCount: 600 },
];

// Top rated content per platform
const TOP_CONTENT = {
  'Netflix': [
    { title: 'Breaking Bad', year: 2008, rating: '9.4/10' },
    { title: 'Stranger Things', year: 2016, rating: '8.7/10' },
    { title: 'The Crown', year: 2016, rating: '8.6/10' },
  ],
  'Disney+': [
    { title: 'The Mandalorian', year: 2019, rating: '8.7/10' },
    { title: 'WandaVision', year: 2021, rating: '7.9/10' },
    { title: 'Loki', year: 2021, rating: '8.2/10' },
  ],
  'Prime Video': [
    { title: 'The Boys', year: 2019, rating: '8.7/10' },
    { title: 'Fleabag', year: 2016, rating: '8.7/10' },
    { title: 'The Marvelous Mrs. Maisel', year: 2017, rating: '8.7/10' },
  ],
  'Hulu': [
    { title: "The Handmaid's Tale", year: 2017, rating: '8.4/10' },
    { title: 'Only Murders in the Building', year: 2021, rating: '8.1/10' },
    { title: 'The Bear', year: 2022, rating: '8.6/10' },
  ],
};

export default function ContentBubble() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [metric, setMetric] = useState<'titles' | 'rating'>('titles');

  // Calculate bubble sizes
  const maxTitles = Math.max(...CONTENT_DATA.map(d => d.totalTitles));
  const maxRating = Math.max(...CONTENT_DATA.map(d => d.avgRating));

  const getBubbleSize = (data: typeof CONTENT_DATA[0]) => {
    const base = 60;
    const scale = metric === 'titles' 
      ? (data.totalTitles / maxTitles) 
      : (data.avgRating / maxRating);
    return base + scale * 140;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Content Library Comparison</h2>
        <p className="text-white/60">Compare content volume and quality across platforms</p>
      </div>

      {/* Metric toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMetric('titles')}
          className={`px-4 py-2 rounded-lg transition ${
            metric === 'titles' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          By Total Titles
        </button>
        <button
          onClick={() => setMetric('rating')}
          className={`px-4 py-2 rounded-lg transition ${
            metric === 'rating' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          By Avg Rating
        </button>
      </div>

      {/* Bubble visualization */}
      <div className="bg-white/5 rounded-xl p-8">
        <div className="flex flex-wrap justify-center items-center gap-8 min-h-[400px]">
          {CONTENT_DATA.map((data) => {
            const platform = PLATFORMS.find(p => p.id === data.platform);
            const size = getBubbleSize(data);
            const isSelected = selectedPlatform === data.platform;

            return (
              <button
                key={data.platform}
                onClick={() => setSelectedPlatform(isSelected ? null : data.platform)}
                className="relative transition-transform hover:scale-105 focus:outline-none"
                style={{ width: size, height: size }}
              >
                {/* Bubble */}
                <div
                  className={`absolute inset-0 rounded-full transition-all ${
                    isSelected ? 'ring-4 ring-white' : ''
                  }`}
                  style={{
                    backgroundColor: platform?.color,
                    opacity: selectedPlatform && !isSelected ? 0.3 : 1,
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="font-bold text-lg">{data.platform}</span>
                  <span className="text-2xl font-bold">
                    {metric === 'titles' 
                      ? data.totalTitles.toLocaleString()
                      : data.avgRating.toFixed(1)
                    }
                  </span>
                  <span className="text-sm opacity-70">
                    {metric === 'titles' ? 'titles' : 'avg rating'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CONTENT_DATA.map((data) => {
          const platform = PLATFORMS.find(p => p.id === data.platform);
          return (
            <div
              key={data.platform}
              className={`bg-white/5 rounded-xl p-5 transition-all cursor-pointer ${
                selectedPlatform === data.platform ? 'ring-2 ring-white' : ''
              }`}
              onClick={() => setSelectedPlatform(
                selectedPlatform === data.platform ? null : data.platform
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: platform?.color }}
                />
                <span className="font-bold">{data.platform}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">Total Titles</span>
                  <span className="font-medium">{data.totalTitles.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Avg Rating</span>
                  <span className="font-medium">{data.avgRating}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Originals</span>
                  <span className="font-medium">{data.originalCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top content section */}
      {selectedPlatform && (
        <div className="bg-white/5 rounded-xl p-6 animate-fade-in">
          <h3 className="font-bold mb-4">
            Top Rated on {selectedPlatform}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TOP_CONTENT[selectedPlatform as keyof typeof TOP_CONTENT]?.map((item, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-white/60">{item.year}</div>
                  </div>
                  <div className="text-yellow-400 font-bold">{item.rating}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="bg-gradient-to-r from-netflix/20 to-transparent rounded-xl p-6">
        <h3 className="font-bold mb-2">Key Insights</h3>
        <ul className="space-y-2 text-white/80">
          <li>• Prime Video has the largest library but lowest average rating</li>
          <li>• Disney+ has highest quality (6.8 avg) with curated content</li>
          <li>• Netflix leads in original content production</li>
        </ul>
      </div>
    </div>
  );
}
