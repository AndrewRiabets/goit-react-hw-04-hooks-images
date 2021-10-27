import axios from 'axios';

export function fetchPictures(inputValue, baseApi, apiKey, page) {
  return axios
    .get(
      `${baseApi}?q=${inputValue}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(r => r.data.hits);
}
