import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import chaptersURL from '../constants';
import fetchData from '../data/apiRequests';
import { getChapterID, getVerses } from '../redux/actions';
import { getVerseNumbers } from '../redux/reducers/selectors';

const Book = () => {
  // Get chapters from Redux store using useSelector hook
  const chapters = useSelector(state => state.chapter);

  // useParams to get the ID of the Chapter
  const { id } = useParams();

  // useDispatch to dispatch getVerses action
  const dispatch = useDispatch();

  // variables to handle verses
  const [verses, setVerses] = useState([]);
  console.log(verses);

  // useHistory to browse to to verse page/component
  const hist = useHistory();

  // Method to load verses on Click
  const loadVerse = e => {
    dispatch(getChapterID(e.target.id));
    fetchData(chaptersURL(e.target.id))
      .then(res => res.json())
      .then(data => {
        setVerses(getVerseNumbers(data.data.content));
        dispatch(getVerses(data.data.content));
      });
  };

  // get specific verse on click
  const getVerse = e => {
    hist.push(`/books/${id}/verses/${e.target.id}`);
  };

  return (
    <section className="book-details">
      <div className="chapter-list">
        <span>
          {`${id}`}
          {' '}
          Chapters
        </span>
        {' '}
        { chapters && chapters.map(chapter => (
          <button
            type="button"
            id={chapter.id}
            key={chapter.id}
            onClick={e => loadVerse(e)}
          >
            {chapter.number}
          </button>
        ))}
      </div>
      <div className="verse-list">
        <span>Verses: </span>
        {' '}
        { verses && verses.map(verse => (
          <button
            type="button"
            id={verse}
            key={verse}
            onClick={e => getVerse(e)}
          >
            {verse}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Book;
