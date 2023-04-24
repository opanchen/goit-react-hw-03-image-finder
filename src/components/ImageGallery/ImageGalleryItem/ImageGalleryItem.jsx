import { Component } from "react";
import css from "./ImageGalleryItem.module.css";
import { Modal } from "components";
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {

    state = {
        isModalOpen: false,
    }

    static propTypes = {
        alt: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }

    toggleModal = () => {
        this.setState(({isModalOpen}) => ({isModalOpen: !isModalOpen})) 
    }

    render() {
        const { alt, largeImageURL, webformatURL } = this.props;
        const {isModalOpen} = this.state;
        return (
            <li 
            className={css['galery-item']}>
            <img className={css['galery-image']} src={webformatURL} alt={alt} onClick={this.toggleModal}
            />
            {isModalOpen && 
                        <Modal
                        alt={alt}
                        largeImageURL={largeImageURL}
                        onClose={this.toggleModal}
                        />
            }
          </li> 
        )
    }

}