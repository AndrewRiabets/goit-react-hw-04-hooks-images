// import './App.css';=
import { useState } from 'react';
import SearchBar from './Components/Searchbar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="App">
      <SearchBar onSubmit={setInputValue} />
      <ImageGallery inputValue={inputValue} />
    </div>
  );
}
