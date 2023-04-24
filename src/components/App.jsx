import { Component } from "react";
import { fetchImages } from "services";
import { Searchbar, ImageGallery, Loader, Button } from "components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from "./App.module.css"


export class App extends Component {

state = {
  images: [],
  query: '',
  page: 1,
  total: '', 
  shownQuantity: '',
  isLoading: false,
  error: null,
}

async componentDidUpdate(_, prevState) {
  const { query, page, total } = this.state;

  if (query !== prevState.query || page !== prevState.page) {
    this.setState({isLoading: true})

    try {
    const data = await fetchImages(query, page);

    if (data.totalHits === 0) {
      toast.error('Sorry, there are no images matching your search query. Please try again.')
    }

    if (query !== prevState.query && data.totalHits !== 0) {
      toast.success(`Hooray! We found ${data.totalHits} images.`);
    }

    this.setState(({images}) => ({
      images: [...images, ...data.hits],
      total: data.totalHits,
    }));
    } catch (error) {
      console.log(error);
      this.setState({error});
    } finally {
      this.setState(({images, total}) => {
        if (total / images.length <= 1) {
          console.log('...');
          toast.warning("We're sorry, but you've reached the end of search results.");
        }
        return ({
        shownQuantity: images.length,
        isLoading: false,
      })});
    }
  }  
}

handleFormSubmit = (query) => {
  this.setState({
    images: [],
    page: 1,
    query,
  })
}

handleLoadMore = () => {
  this.setState(({page}) => ({page: page + 1}));
}

render() {
  const { images, isLoading, total, shownQuantity, error } = this.state;

  (total / shownQuantity <= 1) && toast.warning("We're sorry, but you've reached the end of search results.");


  return( 
  <div className={css.app}>
    <Searchbar
      onFormSubmit={this.handleFormSubmit}
    />

    {error && <p>Looks like something went wrong. Please, try again!</p> }

    {images.length > 0 && <ImageGallery
      items={images}
    />}

    {isLoading && <Loader/> }

    {(images.length > 0 && total/shownQuantity > 1 && !isLoading) &&  <Button
      onLoadMoreClick={this.handleLoadMore}
      isLoading={isLoading}
    />}

    <ToastContainer 
    autoClose={5000}
    />    
  </div>
  )
}
}
