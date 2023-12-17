import { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio.js';

import Searchbar from "components/Searchbar/";

import fetchImgs from "components/helpers/API";

import AppContainer from './App.styled'

Notify.init({
    width: '300px',
    position: 'left-top',
    fontSize: '16px',    
});

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1
  }

  handleSearchbarSubmit = query => {
    console.log(query)
  };

  async onSearchForm(e) {
    const {searchQuery, page} = this.state
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    if (currentQuery === searchQuery) {
      Notify.warning("Error! You are already searching for this keyword");
      this.setState({searchQuery: ''})
      return;
    };
    if (searchQuery === '') {
      Notify.warning("Error! You must specify a keyword to search for.");
      this.setState({searchQuery: ''})
      return;
    };
    try {
      page = 1;
      console.log(`searchQuery: ${searchQuery}, page before fetch: ${page}`);
      let data = await fetchImgs(searchQuery, page);
      console.log('Hits: ', data.hits);
      if (data.hits && data.hits.length > 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`)
        this.setState({searchQuery: ''})
        page++;
        currentPage = page;
        currentQuery = searchQuery;
        console.log(`searchQuery: ${searchQuery}, page after fetch: ${page}`);
      } else {
        Notify.failure("Sorry, there are no images matching your search query. Please try again");
        this.setState({searchQuery: ''})
        searchQuery = currentQuery;
        page = currentPage;
      }
    } catch (error) {
      console.error(error.message);
    }

    render() {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
        </AppContainer>
      )
    }
  }
}