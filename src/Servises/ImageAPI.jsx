import axios from 'axios';

const apiKey = '23201132-c06471d6b76c1dab4fe3668e8';
const baseApi = 'https://pixabay.com/api/';
export function fetchPictures(inputValue, page) {
  return axios
    .get(
      `${baseApi}?q=${inputValue}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(r => r.data.hits);
}
