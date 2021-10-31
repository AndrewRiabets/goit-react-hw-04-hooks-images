import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ onSubmit }) {
  const [inputValue, setinputValue] = useState('');

  const handleNameChange = event => {
    setinputValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      alert('Enter something');
      return;
    }

    onSubmit(inputValue);
    setinputValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
