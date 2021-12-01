// eslint-disable-next-line
import React, {useState, useEffect} from 'react';
import './App.css';
import Hero from './components/hero/hero';
import Navbar from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
