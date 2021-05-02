import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import chaptersURL from '../constants';
import fetchData from '../data/apiRequests';
import { getChapterID, getChapterNum, getVerses } from '../redux/actions';
import { getVerseNumbers } from '../redux/selectors';

const Book = ({ login }) => {
  console.log(login);
  // Get chapters from Redux store using useSelector hook
  const chapters = useSelector(state => state.chapter);
  const user = useSelector(state => state.user);
  if (Object.keys(user).length > 0) {
    console.log(user.user.username);
  }

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
    dispatch(getChapterNum(e.target.textContent));
    dispatch(getChapterID(e.target.id));
    fetchData(chaptersURL(e.target.id))
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setVerses(getVerseNumbers(data.data.content));
        dispatch(getVerses(data.data.content));
      });
  };

  // get specific verse on click but login first
  const getVerse = e => {
    if (Object.keys(user).length > 0 && login) {
      hist.push(`/books/${id}/verses/${e.target.id}`);
    } else {
      hist.push('/login');
    }
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

Book.propTypes = {
  login: PropTypes.bool.isRequired,
};

export default Book;
