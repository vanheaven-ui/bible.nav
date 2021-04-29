import { BOOKS_URL } from '../constants';

const getBibleBooks = async () => {
  const res = fetch(BOOKS_URL, {
    headers: {
      'api-key': '9914cf5e73852dc9b24942666ef8d6bd',
    },
  });
  return res;
};

export default getBibleBooks;
