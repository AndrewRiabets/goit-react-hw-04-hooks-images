import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchPictures } from '../../Servises/ImageAPI';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../ModalWindow/ModalWindow';
import Button from '../Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export default function ImageGallery({ inputValue }) {
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [largeUrl, setLargeUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    setStatus(Status.PENDING);
    setPage(1);
    fetchPictures(inputValue, page)
      .then(fetchedPictures => {
        if (fetchedPictures.length === 0) {
          return setStatus(Status.REJECTED);
        }
        setPictures(fetchedPictures);
      })
      .then(setStatus(Status.RESOLVED))
      .catch(error => setStatus(status.REJECTED));
  }, [inputValue]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setStatus(Status.PENDING);
    fetchPictures(inputValue, page)
      .then(fetchedPictures => {
        if (fetchedPictures.length === 0) {
          return setStatus(Status.REJECTED);
        }
        setPictures([...pictures, ...fetchedPictures]);
      })
      .then(setStatus(Status.RESOLVED))
      .catch(evt => setStatus(Status.REJECTED));
  }, [page]);

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setLargeUrl(!showModal);
  };

  const takeModalPicture = url => {
    setLargeUrl(url);
    setShowModal(true);
  };

  if (status === Status.IDLE) {
    return <h1 className="title">Want a picture?</h1>;
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    return (
      <h1 className="title">
        By searching <span className="rejected-span">{inputValue}</span> we will
        not find pictures on this resource, sorry :()
      </h1>
    );
  }

  if (status === Status.RESOLVED) {
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

ImageGallery.propTypes = {
  inputValue: PropTypes.string,
};
