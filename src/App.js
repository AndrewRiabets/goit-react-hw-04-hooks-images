// import './App.css';=
import { Component } from 'react';
import SearchBar from './Components/Searchbar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    loading: false,
    inputValue: '',
  };

  handleFormSubmit = inputValue => {
    this.setState({ inputValue });
  };
  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery inputValue={this.state.inputValue} />
      </div>
    );
  }
}
