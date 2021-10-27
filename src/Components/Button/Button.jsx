import PropTypes from 'prop-types';
export default function Button({ onLoadMoreClick }) {
  return (
    <div className="more">
      <button type="submit" className="Button" onClick={onLoadMoreClick}>
        Load More
      </button>
    </div>
  );
}

Button.propTypes = {
  onLoadMoreClick: PropTypes.func,
};
