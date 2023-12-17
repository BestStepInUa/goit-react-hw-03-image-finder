import { Component } from "react";

export default class Searchbar extends Component {
     state = {  
        query: ''  
    }

    handelChange = evt => {
        const { name, value } = evt.currentTarget        
        this.setState({[name]: value})
    }

    handelFormSubmit = evt => {
        const { query } = this.state
        evt.preventDefault()       
        this.props.onSubmit(query)
        this.reset()
    }

    reset = () => {
        this.setState({query: ''})
    }
    
    render() {
        const { query } = this.state
       
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handelFormSubmit}>
                    <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                    className="SearchForm-input"
                    type="text"
                    name="query"
                    value={query}
                    onChange={this.handelChange}    
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                </form>
            </header>)
    }
}