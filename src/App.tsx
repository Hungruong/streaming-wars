import { useState } from 'react'
import RaceChart from './components/RaceChart'
import GeographicMap from './components/GeographicMap'
import ContentBubble from './components/ContentBubble'
import GenreTrends from './components/GenreTrends'

type TabId = 'race' | 'bubble' | 'genre' | 'map';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'race', label: 'Subscriber Race', icon: '📈' },
  { id: 'bubble', label: 'Content Library', icon: '🎬' },
  { id: 'genre', label: 'Genre Trends', icon: '📊' },
  { id: 'map', label: 'Global Reach', icon: '🌍' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('race');

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-r from-[#E50914]/20 via-[#B535F6]/20 to-[#113CCF]/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            The Streaming Wars
          </h1>
          <p className="text-white/60 mt-2 text-lg">
            Interactive visualization of the battle for streaming dominance
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'bg-white text-black' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'}
                `}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'race' && <RaceChart />}
        {activeTab === 'bubble' && <ContentBubble />}
        {activeTab === 'genre' && <GenreTrends />}
        {activeTab === 'map' && <GeographicMap />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/40">
          <p>Data sources: Netflix IR, Disney IR, Streaming Availability API, Kaggle</p>
        </div>
      </footer>
    </div>
  )
}
