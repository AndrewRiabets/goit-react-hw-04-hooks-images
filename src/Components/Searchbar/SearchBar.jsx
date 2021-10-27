import { Component } from "react";
import PropTypes from "prop-types";

export default class SearchBar extends Component {
    state = {
        imputValue: '',
    }

    handleNameChange = event => {
        this.setState({ imputValue: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.imputValue.trim() === '') {
            alert('Enter something');
            return;
        }
            
        this.props.onSubmit(this.state.imputValue);
        this.setState({ imputValue: '' });
    };

    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>
                    <input
                    className="SearchForm-input"
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                    onChange={this.handleNameChange}
                    />
                </form>
            </header>
        )}
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};