import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const GEO_DATA = [
  { country_code: 'us', country_name: 'United States', region: 'North America', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 1, apple: 1, paramount: 1, total_services: 7 },
  { country_code: 'au', country_name: 'Australia', region: 'Asia Pacific', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 1, total_services: 6 },
  { country_code: 'mx', country_name: 'Mexico', region: 'Latin America', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 1, total_services: 6 },
  { country_code: 'cl', country_name: 'Chile', region: 'Latin America', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 1, total_services: 6 },
  { country_code: 'br', country_name: 'Brazil', region: 'Latin America', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 1, total_services: 6 },
  { country_code: 'pa', country_name: 'Panama', region: 'Latin America', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 1, total_services: 6 },
  { country_code: 'ar', country_name: 'Argentina', region: 'Latin America', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 1, total_services: 6 },
  { country_code: 'fr', country_name: 'France', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 1, total_services: 6 },
  { country_code: 'co', country_name: 'Colombia', region: 'Latin America', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 1, total_services: 6 },
  { country_code: 'se', country_name: 'Sweden', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'dk', country_name: 'Denmark', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'ca', country_name: 'Canada', region: 'North America', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 1, total_services: 5 },
  { country_code: 'ch', country_name: 'Switzerland', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 1, total_services: 5 },
  { country_code: 'hu', country_name: 'Hungary', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'pl', country_name: 'Poland', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'ph', country_name: 'Philippines', region: 'Asia Pacific', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'cz', country_name: 'Czech Republic', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'de', country_name: 'Germany', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 1, total_services: 5 },
  { country_code: 'at', country_name: 'Austria', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 1, total_services: 5 },
  { country_code: 'no', country_name: 'Norway', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'fi', country_name: 'Finland', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'pe', country_name: 'Peru', region: 'Latin America', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'ec', country_name: 'Ecuador', region: 'Latin America', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'gb', country_name: 'United Kingdom', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 1, total_services: 5 },
  { country_code: 'ie', country_name: 'Ireland', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 1, total_services: 5 },
  { country_code: 'it', country_name: 'Italy', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 1, total_services: 5 },
  { country_code: 'es', country_name: 'Spain', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'nl', country_name: 'Netherlands', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'be', country_name: 'Belgium', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'pt', country_name: 'Portugal', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'bg', country_name: 'Bulgaria', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 5 },
  { country_code: 'jp', country_name: 'Japan', region: 'Asia Pacific', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 4 },
  { country_code: 'kr', country_name: 'South Korea', region: 'Asia Pacific', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 4 },
  { country_code: 'sg', country_name: 'Singapore', region: 'Asia Pacific', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 4 },
  { country_code: 'hk', country_name: 'Hong Kong', region: 'Asia Pacific', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 4 },
  { country_code: 'nz', country_name: 'New Zealand', region: 'Asia Pacific', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 4 },
  { country_code: 'ro', country_name: 'Romania', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 0, paramount: 0, total_services: 4 },
  { country_code: 'hr', country_name: 'Croatia', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 0, paramount: 0, total_services: 4 },
  { country_code: 'rs', country_name: 'Serbia', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 0, paramount: 0, total_services: 4 },
  { country_code: 'mk', country_name: 'North Macedonia', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 1, hulu: 0, apple: 0, paramount: 0, total_services: 4 },
  { country_code: 'gr', country_name: 'Greece', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 4 },
  { country_code: 'lt', country_name: 'Lithuania', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 4 },
  { country_code: 'in', country_name: 'India', region: 'Asia Pacific', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'th', country_name: 'Thailand', region: 'Asia Pacific', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'my', country_name: 'Malaysia', region: 'Asia Pacific', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'id', country_name: 'Indonesia', region: 'Asia Pacific', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'vn', country_name: 'Vietnam', region: 'Asia Pacific', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'za', country_name: 'South Africa', region: 'Africa', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'ae', country_name: 'United Arab Emirates', region: 'Middle East', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'il', country_name: 'Israel', region: 'Middle East', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'ua', country_name: 'Ukraine', region: 'Europe', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'tr', country_name: 'Turkey', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 0, paramount: 0, total_services: 3 },
  { country_code: 'si', country_name: 'Slovenia', region: 'Europe', netflix: 1, disney: 1, prime: 0, hbo: 1, hulu: 0, apple: 0, paramount: 0, total_services: 3 },
  { country_code: 'md', country_name: 'Moldova', region: 'Europe', netflix: 1, disney: 0, prime: 1, hbo: 1, hulu: 0, apple: 1, paramount: 0, total_services: 4 },
  { country_code: 'az', country_name: 'Azerbaijan', region: 'Asia', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'cy', country_name: 'Cyprus', region: 'Europe', netflix: 1, disney: 0, prime: 1, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'ee', country_name: 'Estonia', region: 'Europe', netflix: 1, disney: 1, prime: 0, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 3 },
  { country_code: 'is', country_name: 'Iceland', region: 'Europe', netflix: 1, disney: 1, prime: 1, hbo: 0, hulu: 0, apple: 0, paramount: 0, total_services: 3 },
  { country_code: 'ru', country_name: 'Russia', region: 'Europe', netflix: 0, disney: 0, prime: 0, hbo: 0, hulu: 0, apple: 1, paramount: 0, total_services: 1 },
  { country_code: 'sk', country_name: 'Slovakia', region: 'Europe', netflix: 1, disney: 0, prime: 0, hbo: 0, hulu: 0, apple: 0, paramount: 0, total_services: 1 },
];

const COUNTRY_NAME_MAP: Record<string, string> = {
  'United States of America': 'us',
  'United States': 'us',
  'Canada': 'ca',
  'Mexico': 'mx',
  'Brazil': 'br',
  'Argentina': 'ar',
  'Chile': 'cl',
  'Colombia': 'co',
  'Peru': 'pe',
  'Panama': 'pa',
  'Ecuador': 'ec',
  'United Kingdom': 'gb',
  'Germany': 'de',
  'France': 'fr',
  'Spain': 'es',
  'Italy': 'it',
  'Netherlands': 'nl',
  'Belgium': 'be',
  'Austria': 'at',
  'Switzerland': 'ch',
  'Sweden': 'se',
  'Norway': 'no',
  'Denmark': 'dk',
  'Finland': 'fi',
  'Poland': 'pl',
  'Portugal': 'pt',
  'Ireland': 'ie',
  'Czechia': 'cz',
  'Czech Rep.': 'cz',
  'Hungary': 'hu',
  'Romania': 'ro',
  'Bulgaria': 'bg',
  'Greece': 'gr',
  'Turkey': 'tr',
  'Russia': 'ru',
  'Ukraine': 'ua',
  'Australia': 'au',
  'New Zealand': 'nz',
  'Japan': 'jp',
  'South Korea': 'kr',
  'Korea': 'kr',
  'Singapore': 'sg',
  'Hong Kong': 'hk',
  'India': 'in',
  'Thailand': 'th',
  'Malaysia': 'my',
  'Philippines': 'ph',
  'Indonesia': 'id',
  'Vietnam': 'vn',
  'Viet Nam': 'vn',
  'United Arab Emirates': 'ae',
  'Israel': 'il',
  'South Africa': 'za',
  'Croatia': 'hr',
  'Serbia': 'rs',
  'Slovenia': 'si',
  'Slovakia': 'sk',
  'Lithuania': 'lt',
  'Estonia': 'ee',
  'Iceland': 'is',
  'Cyprus': 'cy',
  'Moldova': 'md',
  'Azerbaijan': 'az',
  'North Macedonia': 'mk',
  'Macedonia': 'mk',
};

type ServiceKey = 'netflix' | 'disney' | 'prime' | 'hbo' | 'hulu' | 'apple' | 'paramount';

const SERVICES: { id: ServiceKey; name: string; color: string }[] = [
  { id: 'netflix', name: 'Netflix', color: '#E50914' },
  { id: 'disney', name: 'Disney+', color: '#113CCF' },
  { id: 'prime', name: 'Prime Video', color: '#00A8E1' },
  { id: 'hbo', name: 'Max', color: '#B535F6' },
  { id: 'hulu', name: 'Hulu', color: '#1CE783' },
  { id: 'apple', name: 'Apple TV+', color: '#888888' },
  { id: 'paramount', name: 'Paramount+', color: '#0064FF' },
];

// Gradient cam → vàng sáng cho All Services
const ALL_SERVICES_COLORS = [
  '#1a1a1a', // 0 - no data
  '#3d2814', // 1 - rất ít
  '#5c3a1a', // 2
  '#7a4d20', // 3
  '#996026', // 4
  '#b8732c', // 5
  '#d98c32', // 6
  '#f5a623', // 7 - full (vàng cam sáng)
];

export default function GeographicMap() {
  const [selectedService, setSelectedService] = useState<ServiceKey | 'all'>('all');
  const [tooltipContent, setTooltipContent] = useState<{
    name: string;
    services: string[];
    total: number;
  } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const getCountryData = (geoName: string) => {
    const code = COUNTRY_NAME_MAP[geoName];
    if (!code) return null;
    return GEO_DATA.find(d => d.country_code === code);
  };

  const getCountryColor = (geo: any) => {
    const name = geo.properties?.name || geo.properties?.NAME;
    const data = getCountryData(name);
    
    if (!data) return '#1a1a1a';

    if (selectedService === 'all') {
      return ALL_SERVICES_COLORS[data.total_services] || '#1a1a1a';
    } else {
      const service = SERVICES.find(s => s.id === selectedService);
      return data[selectedService] ? service?.color : '#1a1a1a';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const stats = SERVICES.map(service => ({
    ...service,
    count: GEO_DATA.filter(d => d[service.id]).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Global Streaming Availability</h2>
        <p className="text-white/60">Where are streaming services available worldwide?</p>
      </div>

      {/* Service filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedService('all')}
          className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
            selectedService === 'all' 
              ? 'text-black shadow-lg' 
              : 'bg-white/10 hover:bg-white/20'
          }`}
          style={{
            background: selectedService === 'all' 
              ? 'linear-gradient(to right, #d97706, #facc15)' 
              : undefined
          }}
        >
          <span>All Services</span>
          <span className={`text-sm ${selectedService === 'all' ? 'text-black/70' : 'opacity-70'}`}>
            {GEO_DATA.length}
          </span>
        </button>
        {SERVICES.map(service => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              selectedService === service.id ? 'text-white' : 'bg-white/10 hover:bg-white/20'
            }`}
            style={{ backgroundColor: selectedService === service.id ? service.color : undefined }}
          >
            <span>{service.name}</span>
            <span className="text-sm opacity-70">{stats.find(s => s.id === service.id)?.count}</span>
          </button>
        ))}
      </div>

      {/* Color range legend - chỉ hiện khi All Services */}
      {selectedService === 'all' && (
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/80 font-medium">Streaming Coverage Intensity</span>
            <span className="text-xs text-white/50">Hover over countries for details</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-xs text-white/50 mb-1">1/7</div>
              <div className="text-xs text-white/30">Limited</div>
            </div>
            <div className="flex-1 h-6 rounded-lg overflow-hidden flex shadow-inner">
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <div 
                  key={n} 
                  className="flex-1 h-full flex items-center justify-center text-xs font-medium"
                  style={{ 
                    backgroundColor: ALL_SERVICES_COLORS[n],
                    color: n >= 5 ? '#000' : '#fff'
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="text-xs text-white/50 mb-1">7/7</div>
              <div className="text-xs text-white/30">Full</div>
            </div>
          </div>
          <div className="text-xs text-white/40 mt-2 text-center">
            Only the United States has all 7 major streaming platforms
          </div>
        </div>
      )}

      {/* Single service legend */}
      {selectedService !== 'all' && (
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded"
                style={{ backgroundColor: SERVICES.find(s => s.id === selectedService)?.color }}
              />
              <span className="text-sm text-white/80">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#1a1a1a] border border-white/10" />
              <span className="text-sm text-white/80">Not available</span>
            </div>
            <div className="ml-auto text-sm text-white/50">
              {stats.find(s => s.id === selectedService)?.count} countries
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <div className="bg-white/5 rounded-xl overflow-hidden relative" onMouseMove={handleMouseMove}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [0, 35] }}
          style={{ width: '100%', height: '500px' }}
        >
          <ZoomableGroup>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name = geo.properties?.name || geo.properties?.NAME;
                  const data = getCountryData(name);
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getCountryColor(geo)}
                      stroke="#333"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none', fill: '#fff', fillOpacity: 0.3 },
                        pressed: { outline: 'none' },
                      }}
                      onMouseEnter={() => {
                        if (data) {
                          const services = SERVICES.filter(s => data[s.id]).map(s => s.name);
                          setTooltipContent({
                            name: data.country_name,
                            services,
                            total: data.total_services
                          });
                        } else {
                          setTooltipContent({
                            name: name || 'Unknown',
                            services: [],
                            total: 0
                          });
                        }
                      }}
                      onMouseLeave={() => setTooltipContent(null)}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip */}
        {tooltipContent && (
          <div
            className="fixed z-50 bg-black/95 text-white px-4 py-3 rounded-lg text-sm pointer-events-none border border-white/20 shadow-xl"
            style={{ 
              left: Math.min(tooltipPos.x + 15, window.innerWidth - 280), 
              top: tooltipPos.y + 15,
              maxWidth: '260px'
            }}
          >
            <div className="font-bold text-base mb-2">{tooltipContent.name}</div>
            {tooltipContent.services.length > 0 ? (
              <>
                <div className="text-white/60 text-xs mb-1">Available services:</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {tooltipContent.services.map(s => {
                    const service = SERVICES.find(srv => srv.name === s);
                    return (
                      <span 
                        key={s} 
                        className="px-2 py-0.5 rounded text-xs text-white"
                        style={{ backgroundColor: service?.color || '#555' }}
                      >
                        {s}
                      </span>
                    );
                  })}
                </div>
                <div className="text-white/50 text-xs">
                  {tooltipContent.total}/7 services available
                </div>
              </>
            ) : (
              <div className="text-white/50">No data available</div>
            )}
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {stats.map(service => (
          <div
            key={service.id}
            className={`bg-white/5 rounded-xl p-4 text-center cursor-pointer hover:bg-white/10 transition ${
              selectedService === service.id ? 'ring-2 ring-white/30' : ''
            }`}
            onClick={() => setSelectedService(service.id)}
          >
            <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: service.color }} />
            <div className="font-medium text-sm">{service.name}</div>
            <div className="text-2xl font-bold">{service.count}</div>
            <div className="text-white/40 text-xs">countries</div>
          </div>
        ))}
      </div>

      {/* Region breakdown */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="font-bold mb-4">Coverage by Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['North America', 'Europe', 'Asia Pacific', 'Latin America'].map(region => {
            const regionCountries = GEO_DATA.filter(d => d.region === region);
            const avgServices = regionCountries.length
              ? (regionCountries.reduce((sum, d) => sum + d.total_services, 0) / regionCountries.length).toFixed(1)
              : '0';
            return (
              <div key={region} className="bg-white/5 rounded-lg p-4">
                <div className="font-medium">{region}</div>
                <div className="text-sm text-white/60">{regionCountries.length} countries</div>
                <div className="text-lg font-bold mt-2">{avgServices} avg services</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-amber-500/20 to-transparent rounded-xl p-6">
        <h3 className="font-bold mb-2">Key Insight</h3>
        <p className="text-white/80">
          Only the <strong>United States</strong> has all 7 major streaming services. 
          Hulu is exclusively available in the US, while Netflix has the widest global reach at {stats.find(s => s.id === 'netflix')?.count} countries.
        </p>
      </div>
    </div>
  );
}