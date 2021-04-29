export const BASE_URL = 'https://api.scripture.api.bible/v1/bibles/55212e3cf5d04d49-01';

export const BOOKS_URL = `${BASE_URL}/books?include-chapters=true&include-chapters-and-sections=true`;

const PARAMS = {
  notes: 'include-notes=false',
  titles: 'include-titles=false',
  chapterNum: 'include-chapter-numbers=true',
  verseNum: 'include-verse-numbers=true',
  verseSpan: 'include-verse-spans=false',
};

const CPARAMS = `?content-type=json&${PARAMS.notes}&${PARAMS.titles}&${PARAMS.chapterNum}&${PARAMS.verseNum}&${PARAMS.verseSpan}`;

const chaptersURL = id => `${BASE_URL}/chapters/${id}${CPARAMS}`;

export default chaptersURL;
