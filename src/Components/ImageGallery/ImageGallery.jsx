import { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPictures } from '../../Servises/ImageAPI';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../ModalWindow/ModalWindow';
import Button from '../Button/Button';

export default class ImageGallery extends Component {
  state = {
    baseApi: 'https://pixabay.com/api/',
    apiKey: '23201132-c06471d6b76c1dab4fe3668e8',
    page: 1,
    pictures: [],
    error: null,
    largeUrl: '',
    showModal: false,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    const { baseApi, apiKey, page, pictures } = this.state;
    const prevInputValue = prevProps.inputValue;
    const nextInputValue = this.props.inputValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevInputValue !== nextInputValue) {
      this.setState({ status: 'pending' });
      this.setState({ pictures: [] });

      fetchPictures(nextInputValue, baseApi, apiKey, page)
        .then(pictures => {
          if (pictures.length === 0) {
            return this.setState({ status: 'rejected' });
          }
          this.getPictures(pictures);
        })
        .then(this.setState({ status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    } else if (prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      fetchPictures(nextInputValue, baseApi, apiKey, page)
        .then(pictures => this.getPictures(pictures))
        .then(this.setState({ status: 'resolved' }))
        .then(() =>
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          }),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  getPictures = arr => {
    const newArr = arr.map(picture => {
      return {
        id: picture.id,
        webformatURL: picture.webformatURL,
        largeImageURL: picture.largeImageURL,
      };
    });
    this.setState({
      pictures: [...this.state.pictures, ...newArr],
    });
  };

  onLoadMoreClick = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  takeModalPicture = url => {
    this.setState({ largeUrl: url, showModal: true });
  };

  render() {
    const { pictures, status, showModal, largeUrl } = this.state;
    const { takeModalPicture, toggleModal, onLoadMoreClick } = this;
    const { inputValue } = this.props;

    if (status === 'idle') {
      return <h1 className="title">Want a picture?</h1>;
    }
    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <h1 className="title">
          By searching <span className="rejected-span">{inputValue}</span> you
          will not find pictures on this resource, sorry :()
        </h1>
      );
    }

    if (status === 'resolved') {
      return (
        <div>
          <ul className="ImageGallery">
            {pictures.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                webformatURL={picture.webformatURL}
                largeImageURL={picture.largeImageURL}
                onOpen={takeModalPicture}
              />
            ))}
          </ul>
          {showModal && (
            <Modal onClose={toggleModal}>
              <img src={largeUrl} alt="modal-img" />
              <button type="button" onClick={toggleModal}>
                Close Modal
              </button>
            </Modal>
          )}
          <Button onLoadMoreClick={onLoadMoreClick} />
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  inputValue: PropTypes.string,
};
