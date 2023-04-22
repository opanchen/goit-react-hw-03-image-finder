import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import {SearchImageAPI } from "../services/imagesApi"
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import {Blocks} from 'react-loader-spinner'
import css from "./App.module.css"

export class App extends Component {

  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    shouldStop: false,
  }

  api = new SearchImageAPI();
  
  clearGallery = () => {
    this.setState({images: []})
  }

  handleFormSubmit = (query) => {
    this.api.query = query // --- api: setter method for query

    this.clearGallery();
    this.api.resetPage();
    this.handleImageSearch(query);
  }


  handleImageSearch  = async (query) => {
    try {
      this.setState({isLoading: true, isTotal: false});

      const dataImg = await this.api.fetchImages();

      this.setState(({images}) => {

        const newImgArr = [...images, ...dataImg.hits]

        if (newImgArr.length === dataImg.totalHits) {
          return ({
            shouldStop: true,
            images: newImgArr
          })
        }

        return ({
          searchQuery: this.api.searchQuery,
          images: newImgArr,
        })
      })

      this.api.incrementPage()

    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false})
    }
  }

  handleLoadingMore = () => {
    this.handleImageSearch()
  }
  
  render() {
    const {images, isLoading, shouldStop} = this.state;
    return (
      <div className={css.app}>
      <Searchbar
      onFormSubmit={this.handleFormSubmit}
      />
      <ImageGallery
      items={images}
      />
      {isLoading && 
      <div className={css.loader}>
        <Blocks
          className="blocks-wrapper"
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
      }
      {(images.length > 0 && !shouldStop) && (
      <Button
      onLoadMoreClick={this.handleLoadingMore}
      isLoading={isLoading}
      />
      )}
      </div>
    );
  }
};
