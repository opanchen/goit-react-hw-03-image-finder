import css from "./Button.module.css"
import PropTypes from 'prop-types';

export const Button = ({onLoadMoreClick, isLoading}) => {
    return (
        <button className={css.button} type="button" onClick={ () => onLoadMoreClick()} disabled={isLoading} >Load more</button>
    )
}

Button.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired,
}