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
// let searchQuery;
// let currentQuery;
// let page;
// let currentPage;
// const perPage = 40;
export default class App extends Component {
  state = {
    query: '',
    currentQuery: '',
    page: null,
    currentPage: null,
    hits: []
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, currentQuery, page, currentPage } = this.state
     if (currentQuery === query) {
       Notify.warning("Error! You are already searching for this keyword");
       this.setState({query: ''})
       return;
      }
      if (query === '') {
      Notify.warning("Error! You must specify a keyword to search for.");
      this.setState({query: ''})
      return;
      }
      try {
        this.setState({page: 1})
        console.log(`searchQuery: ${query}, page before fetch: ${page}`);
        let data = await fetchImgs(query, page);
        console.log('Hits: ', data.hits);
        if (data.hits && data.hits.length > 0) {
          Notify.success(`Hooray! We found ${data.totalHits} images.`)
          this.setState({query: ''})
          this.setState(prevState => page === prevState.page +1)
          this.setState({currentPage: page})
          this.setState({currentQuery: query})
          console.log(`searchQuery: ${query}, page after fetch: ${page}`);
        } else {
          Notify.failure("Sorry, there are no images matching your search query. Please try again");
          this.setState({ query: '' })
          this.setState({ query: currentQuery })
          this.setState({page: currentPage})
        }
      } catch (error) {
        console.error(error.message);
      } 
  }

  handleSearchbarSubmit = query => {
    console.log(query)
    this.setState({query})
  };

  // async onSearchForm(e) {
  //   const {searchQuery, page} = this.state
  //   e.preventDefault();
  //   searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  //   if (currentQuery === searchQuery) {
  //     Notify.warning("Error! You are already searching for this keyword");
  //     this.setState({searchQuery: ''})
  //     return;
  //   };
  //   if (searchQuery === '') {
  //     Notify.warning("Error! You must specify a keyword to search for.");
  //     this.setState({searchQuery: ''})
  //     return;
  //   };
  //   try {
  //     page = 1;
  //     console.log(`searchQuery: ${searchQuery}, page before fetch: ${page}`);
  //     let data = await fetchImgs(searchQuery, page);
  //     console.log('Hits: ', data.hits);
  //     if (data.hits && data.hits.length > 0) {
  //       Notify.success(`Hooray! We found ${data.totalHits} images.`)
  //       this.setState({searchQuery: ''})
  //       page++;
  //       currentPage = page;
  //       currentQuery = searchQuery;
  //       console.log(`searchQuery: ${searchQuery}, page after fetch: ${page}`);
  //     } else {
  //       Notify.failure("Sorry, there are no images matching your search query. Please try again");
  //       this.setState({searchQuery: ''})
  //       searchQuery = currentQuery;
  //       page = currentPage;
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }

    render() {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
        </AppContainer>
      )
    }
  }