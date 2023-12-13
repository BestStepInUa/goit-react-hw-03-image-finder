import { Component } from "react";

export default class Searchbar extends Component {
     state = {  
        query: ''  
    }
    
    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm">
                    <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                    className="SearchForm-input"
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                    />
                </form>
            </header>)
    }
}