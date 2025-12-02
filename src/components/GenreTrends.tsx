import { useState } from 'react';

// Genre data over time (aggregated from dataset)
const GENRE_DATA = [
  { year: 2018, Drama: 35, Comedy: 22, Action: 15, 'Sci-Fi': 8, Horror: 8, Documentary: 12 },
  { year: 2019, Drama: 34, Comedy: 21, Action: 16, 'Sci-Fi': 10, Horror: 8, Documentary: 11 },
  { year: 2020, Drama: 32, Comedy: 20, Action: 17, 'Sci-Fi': 12, Horror: 9, Documentary: 10 },
  { year: 2021, Drama: 30, Comedy: 19, Action: 18, 'Sci-Fi': 14, Horror: 9, Documentary: 10 },
  { year: 2022, Drama: 28, Comedy: 18, Action: 18, 'Sci-Fi': 15, Horror: 10, Documentary: 11 },
  { year: 2023, Drama: 27, Comedy: 18, Action: 17, 'Sci-Fi': 16, Horror: 10, Documentary: 12 },
  { year: 2024, Drama: 26, Comedy: 17, Action: 17, 'Sci-Fi': 16, Horror: 11, Documentary: 13 },
];

const GENRES = [
  { id: 'Drama', color: '#E50914' },
  { id: 'Comedy', color: '#1CE783' },
  { id: 'Action', color: '#00A8E1' },
  { id: 'Sci-Fi', color: '#B535F6' },
  { id: 'Horror', color: '#FF6B6B' },
  { id: 'Documentary', color: '#FFD93D' },
];

export default function GenreTrends() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(GENRES.map(g => g.id));
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  // Chart dimensions
  const chartWidth = 800;
  const chartHeight = 300;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Scales
  const years = GENRE_DATA.map(d => d.year);
  const xScale = (year: number) => {
    const index = years.indexOf(year);
    return padding.left + (index / (years.length - 1)) * innerWidth;
  };
  const yScale = (value: number) => {
    return padding.top + innerHeight - (value / 40) * innerHeight;
  };

  // Generate line path
  const getLinePath = (genre: string) => {
    return GENRE_DATA.map((d, i) => {
      const x = xScale(d.year);
      const y = yScale(d[genre as keyof typeof d] as number);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Get hovered data
  const hoveredData = hoveredYear ? GENRE_DATA.find(d => d.year === hoveredYear) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Genre Trends Over Time</h2>
        <p className="text-white/60">How content preferences have shifted (2018-2024)</p>
      </div>

      {/* Genre toggles */}
      <div className="flex flex-wrap gap-2">
        {GENRES.map(genre => (
          <button
            key={genre.id}
            onClick={() => toggleGenre(genre.id)}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              selectedGenres.includes(genre.id)
                ? 'text-white'
                : 'bg-white/10 text-white/40'
            }`}
            style={{
              backgroundColor: selectedGenres.includes(genre.id) ? genre.color : undefined,
            }}
          >
            {genre.id}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white/5 rounded-xl p-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full max-w-4xl mx-auto"
          style={{ minWidth: '600px' }}
        >
          {/* Grid lines */}
          {[0, 10, 20, 30, 40].map(value => (
            <g key={value}>
              <line
                x1={padding.left}
                y1={yScale(value)}
                x2={chartWidth - padding.right}
                y2={yScale(value)}
                stroke="rgba(255,255,255,0.1)"
              />
              <text
                x={padding.left - 10}
                y={yScale(value)}
                fill="rgba(255,255,255,0.5)"
                fontSize="12"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {value}%
              </text>
            </g>
          ))}

          {/* X axis labels */}
          {years.map(year => (
            <text
              key={year}
              x={xScale(year)}
              y={chartHeight - 10}
              fill="rgba(255,255,255,0.5)"
              fontSize="12"
              textAnchor="middle"
            >
              {year}
            </text>
          ))}

          {/* Lines */}
          {GENRES.filter(g => selectedGenres.includes(g.id)).map(genre => (
            <path
              key={genre.id}
              d={getLinePath(genre.id)}
              fill="none"
              stroke={genre.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Dots */}
          {GENRES.filter(g => selectedGenres.includes(g.id)).map(genre => (
            GENRE_DATA.map((d, i) => (
              <circle
                key={`${genre.id}-${i}`}
                cx={xScale(d.year)}
                cy={yScale(d[genre.id as keyof typeof d] as number)}
                r={hoveredYear === d.year ? 6 : 4}
                fill={genre.color}
                className="transition-all"
              />
            ))
          ))}

          {/* Hover areas */}
          {years.map((year, i) => (
            <rect
              key={year}
              x={xScale(year) - innerWidth / years.length / 2}
              y={padding.top}
              width={innerWidth / years.length}
              height={innerHeight}
              fill="transparent"
              onMouseEnter={() => setHoveredYear(year)}
              onMouseLeave={() => setHoveredYear(null)}
              className="cursor-pointer"
            />
          ))}

          {/* Hover line */}
          {hoveredYear && (
            <line
              x1={xScale(hoveredYear)}
              y1={padding.top}
              x2={xScale(hoveredYear)}
              y2={chartHeight - padding.bottom}
              stroke="rgba(255,255,255,0.3)"
              strokeDasharray="4"
            />
          )}
        </svg>

        {/* Hover tooltip */}
        {hoveredData && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <div className="font-bold mb-2">{hoveredYear}</div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {GENRES.filter(g => selectedGenres.includes(g.id)).map(genre => (
                <div key={genre.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: genre.color }}
                  />
                  <span className="text-sm">
                    {genre.id}: {hoveredData[genre.id as keyof typeof hoveredData]}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Key changes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📈</span>
            <span className="font-bold text-[#B535F6]">Sci-Fi</span>
          </div>
          <div className="text-3xl font-bold">+100%</div>
          <div className="text-white/60">8% → 16% (2018-2024)</div>
        </div>

        <div className="bg-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📉</span>
            <span className="font-bold text-[#E50914]">Drama</span>
          </div>
          <div className="text-3xl font-bold">-26%</div>
          <div className="text-white/60">35% → 26% (2018-2024)</div>
        </div>

        <div className="bg-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📊</span>
            <span className="font-bold text-[#FFD93D]">Documentary</span>
          </div>
          <div className="text-3xl font-bold">Stable</div>
          <div className="text-white/60">12% → 13% (2018-2024)</div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-[#B535F6]/20 to-transparent rounded-xl p-6">
        <h3 className="font-bold mb-2">Key Insights</h3>
        <ul className="space-y-2 text-white/80">
          <li>• Sci-Fi content doubled due to franchises like Star Wars, Marvel, and Stranger Things</li>
          <li>• Drama share declined as platforms diversified their catalogs</li>
          <li>• Horror grew steadily, driven by platforms like Shudder and Netflix originals</li>
          <li>• Documentary content remained stable with consistent audience demand</li>
        </ul>
      </div>
    </div>
  );
}
