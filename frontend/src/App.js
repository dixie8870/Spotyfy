import React, { useState } from "react";
import "./App.css";
import { Sidebar, MainContent, RightSidebar, Player } from './components';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="App h-screen flex flex-col bg-black">
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        
        {/* Main Content Area */}
        <MainContent currentView={currentView} />
        
        {/* Right Sidebar */}
        <RightSidebar />
      </div>
      
      {/* Bottom Player */}
      <Player />
    </div>
  );
}

export default App;