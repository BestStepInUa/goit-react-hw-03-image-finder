import { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio.js';

import Searchbar from "components/Searchbar/";

import fetchImgs from "components/helpers/API";

import AppContainer from './App.styled'
import ImageGallery from "components/ImageGallery";
import LoadMoreButton from "components/LoadMoreButton";

Notify.init({
    width: '300px',
    position: 'left-top',
    fontSize: '16px',    
});
export default class App extends Component {

  state = {
    query: '',
    page: 1,
    hits: [],
    loadMore: false
  }

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state

    if (query === '') {
      Notify.warning("Error! You must specify a keyword to search for.")
      return
    }
       
    if (page !== prevState.page || query !== prevState.query) {
      try {
        let data = await fetchImgs(query, page)
        console.log('Hits:', data.hits);
        if (data.hits && data.hits.length > 0) {

          if (prevState.hits.length === 0) {
            Notify.success(`Hooray! We found ${data.totalHits} images.`)
          }
          
          this.setState((prevState) => ({
            hits: [...prevState.hits, ...data.hits],
            loadMore: this.state.page < Math.ceil(data.totalHits / 36 )
          }))

        } else {
          Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
      }
      catch (error) {
        console.error(error.message);
      }
      
    }
  }
  
  handleSearchbarSubmit = query => {
    console.log('query:', query)
    if (query === this.state.query) {
      Notify.warning("Error! You are already searching for this keyword.")
      return
    }
    this.setState({ query })
  };

  handleLoadMoreButton = _ => {
    this.setState((prevState) => ({ page: prevState.page + 1 }))
  }

  render() {
      const {hits, loadMore} = this.state
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          <ImageGallery hits={hits} />
          {loadMore > 0 && <LoadMoreButton onLoadMoreButtonClick={this.handleLoadMoreButton} />} 
       </AppContainer>
          
        
      )
    }
  }