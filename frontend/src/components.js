import React, { useState, useEffect, useRef } from 'react';

// Mock Data
const mockPlaylists = [
  { id: 1, name: 'Liked Songs', image: 'https://images.unsplash.com/photo-1470019693664-1d202d2c0907?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxtdXNpY3xlbnwwfHx8YmxhY2t8MTc1NDUwOTYxMHww&ixlib=rb-4.1.0&q=85', songs: 42 },
  { id: 2, name: 'My Playlist #1', image: 'https://images.unsplash.com/photo-1526394931762-90052e97b376?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxtdXNpY3xlbnwwfHx8YmxhY2t8MTc1NDUwOTYxMHww&ixlib=rb-4.1.0&q=85', songs: 23 },
  { id: 3, name: 'Chill Vibes', image: 'https://images.unsplash.com/photo-1605731414532-6b26976cc153?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxtdXNpY3xlbnwwfHx8YmxhY2t8MTc1NDUwOTYxMHww&ixlib=rb-4.1.0&q=85', songs: 15 },
  { id: 4, name: 'Workout Mix', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxtdXNpY3xlbnwwfHx8YmxhY2t8MTc1NDUwOTYxMHww&ixlib=rb-4.1.0&q=85', songs: 38 },
  { id: 5, name: 'Jazz Collection', image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxjb25jZXJ0fGVufDB8fHxibGFja3wxNzU0NTYxNTM5fDA&ixlib=rb-4.1.0&q=85', songs: 67 },
  { id: 6, name: 'Party Hits', image: 'https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxjb25jZXJ0fGVufDB8fHxibGFja3wxNzU0NTYxNTM5fDA&ixlib=rb-4.1.0&q=85', songs: 89 }
];

const mockRecentlyPlayed = [
  { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', image: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzfGVufDB8fHxibGFja3wxNzU0NTYxNTQ0fDA&ixlib=rb-4.1.0&q=85' },
  { id: 2, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'Stay', image: 'https://images.unsplash.com/photo-1510133744874-096621a0e01e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxoZWFkcGhvbmVzfGVufDB8fHxibGFja3wxNzU0NTYxNTQ0fDA&ixlib=rb-4.1.0&q=85' },
  { id: 3, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', image: 'https://images.unsplash.com/photo-1599669454699-248893623440?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmVzfGVufDB8fHxibGFja3wxNzU0NTYxNTQ0fDA&ixlib=rb-4.1.0&q=85' },
  { id: 4, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', image: 'https://images.pexels.com/photos/7098114/pexels-photo-7098114.jpeg' },
  { id: 5, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', image: 'https://images.pexels.com/photos/2330137/pexels-photo-2330137.jpeg' },
  { id: 6, title: 'positions', artist: 'Ariana Grande', album: 'Positions', image: 'https://images.pexels.com/photos/6091163/pexels-photo-6091163.jpeg' }
];

const mockMadeForYou = [
  { id: 1, name: 'Discover Weekly', description: 'Your weekly mixtape of fresh music', image: 'https://images.pexels.com/photos/9395109/pexels-photo-9395109.jpeg' },
  { id: 2, name: 'Release Radar', description: 'Catch all the latest music from artists you follow', image: 'https://images.pexels.com/photos/20147091/pexels-photo-20147091.jpeg' },
  { id: 3, name: 'Daily Mix 1', description: 'Made for you • Pop, R&B', image: 'https://images.unsplash.com/photo-1590721791974-d6c8ca43f6bc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxjb25jZXJ0fGVufDB8fHxibGFja3wxNzU0NTYxNTM5fDA&ixlib=rb-4.1.0&q=85' }
];

const mockFriendActivity = [
  { id: 1, user: 'Alex', track: 'Blinding Lights', artist: 'The Weeknd', time: '2 min ago' },
  { id: 2, user: 'Sarah', track: 'As It Was', artist: 'Harry Styles', time: '5 min ago' },
  { id: 3, user: 'Mike', track: 'Heat Waves', artist: 'Glass Animals', time: '12 min ago' },
  { id: 4, user: 'Emma', track: 'Bad Habit', artist: 'Steve Lacy', time: '18 min ago' }
];

// Icons Components
const PlayIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const PauseIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const SkipPreviousIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
  </svg>
);

const SkipNextIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
);

const ShuffleIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
  </svg>
);

const RepeatIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
  </svg>
);

const VolumeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg className="w-5 h-5" fill={filled ? "#1DB954" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const LibraryIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 14l5-5 5 5z"/>
  </svg>
);

// Main Components
export const Sidebar = ({ currentView, setCurrentView }) => {
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(true);

  return (
    <div className="w-64 bg-black text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="text-white font-bold text-2xl flex items-center">
          <span className="text-[#1DB954] mr-2">♪</span>
          Spotify
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 space-y-2">
        <button 
          onClick={() => setCurrentView('home')}
          className={`flex items-center space-x-4 w-full p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors ${currentView === 'home' ? 'bg-[#1a1a1a]' : ''}`}
        >
          <HomeIcon />
          <span className="font-semibold">Home</span>
        </button>
        <button 
          onClick={() => setCurrentView('search')}
          className={`flex items-center space-x-4 w-full p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors ${currentView === 'search' ? 'bg-[#1a1a1a]' : ''}`}
        >
          <SearchIcon />
          <span className="font-semibold">Search</span>
        </button>
      </nav>

      {/* Your Library */}
      <div className="mt-6 flex-1">
        <div className="px-6">
          <button 
            onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
            className="flex items-center space-x-4 w-full p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            <LibraryIcon />
            <span className="font-semibold">Your Library</span>
            <div className="ml-auto">
              <PlusIcon />
            </div>
          </button>
        </div>

        {/* Recently Played Section */}
        <div className="mt-2 px-3">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm text-gray-400">Recently Played</span>
          </div>
          <div className="space-y-1">
            {mockRecentlyPlayed.slice(0, 3).map((track) => (
              <div key={track.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                <img src={track.image} alt={track.title} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{track.title}</p>
                  <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playlists */}
        {isLibraryExpanded && (
          <div className="mt-4 px-3 flex-1 overflow-y-auto">
            <div className="space-y-1">
              {mockPlaylists.map((playlist) => (
                <div key={playlist.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                  <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{playlist.name}</p>
                    <p className="text-gray-400 text-xs">{playlist.songs} songs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const TopBar = () => {
  return (
    <div className="bg-[#191414] px-8 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-[#000] rounded-full text-white hover:bg-[#333] transition-colors">
          <ArrowIcon />
        </button>
        <button className="p-2 bg-[#000] rounded-full text-white hover:bg-[#333] transition-colors rotate-180">
          <ArrowIcon />
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#333] transition-colors">
          Install App
        </button>
        <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center text-black font-bold text-sm">
          U
        </div>
      </div>
    </div>
  );
};

export const MainContent = ({ currentView }) => {
  if (currentView === 'search') {
    return <SearchView />;
  }
  
  return <HomeView />;
};

const HomeView = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-[#191414] to-[#121212] text-white overflow-y-auto">
      <TopBar />
      
      {/* Greeting */}
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">Good evening</h1>
        
        {/* Recently Played Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {mockRecentlyPlayed.slice(0, 6).map((track) => (
            <div key={track.id} className="bg-[#2a2a2a] rounded-lg flex items-center hover:bg-[#3a3a3a] transition-colors cursor-pointer group">
              <img src={track.image} alt={track.title} className="w-16 h-16 rounded-l-lg object-cover" />
              <div className="flex-1 px-4">
                <p className="font-semibold text-white truncate">{track.title}</p>
              </div>
              <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
                  <PlayIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Made for You */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Made for you</h2>
            <button className="text-gray-400 hover:text-white text-sm font-semibold">Show all</button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {mockMadeForYou.map((playlist) => (
              <div key={playlist.id} className="bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-colors cursor-pointer group">
                <div className="relative mb-4">
                  <img src={playlist.image} alt={playlist.name} className="w-full aspect-square rounded-lg object-cover" />
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all hover:scale-105 transform translate-y-2 group-hover:translate-y-0">
                    <PlayIcon />
                  </button>
                </div>
                <h3 className="font-bold text-white mb-2">{playlist.name}</h3>
                <p className="text-gray-400 text-sm">{playlist.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recently played</h2>
            <button className="text-gray-400 hover:text-white text-sm font-semibold">Show all</button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {mockRecentlyPlayed.map((track) => (
              <div key={track.id} className="bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-colors cursor-pointer group">
                <div className="relative mb-4">
                  <img src={track.image} alt={track.title} className="w-full aspect-square rounded-lg object-cover" />
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all hover:scale-105 transform translate-y-2 group-hover:translate-y-0">
                    <PlayIcon />
                  </button>
                </div>
                <h3 className="font-semibold text-white mb-1 truncate">{track.title}</h3>
                <p className="text-gray-400 text-sm truncate">{track.artist}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Your Playlists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your playlists</h2>
            <button className="text-gray-400 hover:text-white text-sm font-semibold">Show all</button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {mockPlaylists.map((playlist) => (
              <div key={playlist.id} className="bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-colors cursor-pointer group">
                <div className="relative mb-4">
                  <img src={playlist.image} alt={playlist.name} className="w-full aspect-square rounded-lg object-cover" />
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all hover:scale-105 transform translate-y-2 group-hover:translate-y-0">
                    <PlayIcon />
                  </button>
                </div>
                <h3 className="font-semibold text-white mb-1 truncate">{playlist.name}</h3>
                <p className="text-gray-400 text-sm">{playlist.songs} songs</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const SearchView = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex-1 bg-gradient-to-br from-[#191414] to-[#121212] text-white overflow-y-auto">
      <TopBar />
      
      <div className="px-8 py-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What do you want to listen to?"
              className="block w-full pl-12 pr-4 py-3 border border-gray-600 rounded-full bg-[#242424] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
            />
          </div>
        </div>

        {!searchTerm ? (
          <>
            {/* Browse All */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Browse all</h2>
              <div className="grid grid-cols-5 gap-6">
                {[
                  { name: 'Podcasts', color: 'bg-green-600', image: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzfGVufDB8fHxibGFja3wxNzU0NTYxNTQ0fDA&ixlib=rb-4.1.0&q=85' },
                  { name: 'Made For You', color: 'bg-blue-600', image: 'https://images.unsplash.com/photo-1510133744874-096621a0e01e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxoZWFkcGhvbmVzfGVufDB8fHxibGFja3wxNzU0NTYxNTQ0fDA&ixlib=rb-4.1.0&q=85' },
                  { name: 'Charts', color: 'bg-orange-600', image: 'https://images.unsplash.com/photo-1599669454699-248893623440?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmVzfGVufDB8fHxibGFja3wxNzU0NTYxNTQ0fDA&ixlib=rb-4.1.0&q=85' },
                  { name: 'New Releases', color: 'bg-red-600', image: 'https://images.pexels.com/photos/7098114/pexels-photo-7098114.jpeg' },
                  { name: 'Discover', color: 'bg-purple-600', image: 'https://images.pexels.com/photos/2330137/pexels-photo-2330137.jpeg' },
                  { name: 'Concerts', color: 'bg-pink-600', image: 'https://images.pexels.com/photos/6091163/pexels-photo-6091163.jpeg' },
                  { name: 'Pop', color: 'bg-yellow-600', image: 'https://images.pexels.com/photos/9395109/pexels-photo-9395109.jpeg' },
                  { name: 'Hip-Hop', color: 'bg-indigo-600', image: 'https://images.pexels.com/photos/20147091/pexels-photo-20147091.jpeg' },
                  { name: 'Rock', color: 'bg-gray-600', image: 'https://images.unsplash.com/photo-1590721791974-d6c8ca43f6bc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxjb25jZXJ0fGVufDB8fHxibGFja3wxNzU0NTYxNTM5fDA&ixlib=rb-4.1.0&q=85' },
                  { name: 'Jazz', color: 'bg-teal-600', image: 'https://images.unsplash.com/photo-1470019693664-1d202d2c0907?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxtdXNpY3xlbnwwfHx8YmxhY2t8MTc1NDUwOTYxMHww&ixlib=rb-4.1.0&q=85' }
                ].map((category, index) => (
                  <div key={index} className={`${category.color} rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden`}>
                    <h3 className="font-bold text-white text-xl mb-4">{category.name}</h3>
                    <img src={category.image} alt={category.name} className="absolute bottom-0 right-0 w-20 h-20 object-cover rounded-lg transform rotate-12 translate-x-2 translate-y-2" />
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Search results for "{searchTerm}"</h2>
            {/* Search results would go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export const RightSidebar = () => {
  return (
    <div className="w-80 bg-[#121212] text-white p-6 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">Friend Activity</h3>
        <p className="text-gray-400 text-sm mb-4">Let friends and followers on Spotify see what you're listening to.</p>
        <div className="space-y-4">
          {mockFriendActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold">
                {activity.user[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{activity.user}</p>
                <p className="text-gray-300 text-xs truncate">{activity.track}</p>
                <p className="text-gray-400 text-xs">{activity.artist} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack] = useState(mockRecentlyPlayed[0]);
  const [progress, setProgress] = useState(45);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Simulate progress update
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress(prev => prev < 100 ? prev + 0.5 : 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-[#181818] border-t border-gray-800 px-4 py-3 flex items-center justify-between">
      {/* Currently Playing */}
      <div className="flex items-center space-x-3 w-1/4">
        <img src={currentTrack.image} alt={currentTrack.title} className="w-14 h-14 rounded object-cover" />
        <div className="min-w-0 flex-1">
          <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
          <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
        </div>
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <HeartIcon filled={isLiked} />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center w-1/2 max-w-md">
        <div className="flex items-center space-x-4 mb-2">
          <button className="text-gray-400 hover:text-white transition-colors">
            <ShuffleIcon />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipPreviousIcon />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipNextIcon />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <RepeatIcon />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full">
          <span className="text-xs text-gray-400">1:23</span>
          <div className="flex-1 bg-gray-600 rounded-full h-1">
            <div 
              className="bg-white rounded-full h-1 transition-all duration-300 group relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span className="text-xs text-gray-400">3:45</span>
        </div>
      </div>

      {/* Volume and Additional Controls */}
      <div className="flex items-center space-x-3 w-1/4 justify-end">
        <VolumeIcon />
        <div className="w-20 bg-gray-600 rounded-full h-1">
          <div 
            className="bg-white rounded-full h-1"
            style={{ width: `${volume}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};