import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';
import css from "./ImageGallery.module.css"

export const ImageGallery = ({items}) => {

return (
    <ul className={css.galery}>

    {
        items.map((item) => {
            const {id, tags, webformatURL, largeImageURL} = item;
            return (
                <ImageGalleryItem
                key={id}
                alt={tags}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                />
            )
        })
    }

    </ul>
)}

ImageGallery.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),).isRequired,
}