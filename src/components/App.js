import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BASE_URL, BOOKS_URL } from '../constants';
import fetchData from '../data/apiRequests';
import { getChapters } from '../redux/actions';

function App() {
  // get currently logged user from redux store after login
  const currentUser = useSelector(state => state.user);

  // useHistory hook to route the different components
  const hist = useHistory();

  // useDispatch hook to disptach actions to the Redux store
  const dispatch = useDispatch();

  // Variables for books of the bible
  const [newTestament, setNewTestament] = useState([]);
  const [oldTestament, setOldTestament] = useState([]);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // variables to show chapters
  const [showChapters, setShowChapters] = useState(false);

  // useEffect hook to fetch data only once when component mounts
  useEffect(() => {
    fetchData(BOOKS_URL).then(res => res.json())
      .then(data => {
        setNewTestament(data.data.slice(0, 53));
        setOldTestament(data.data.slice(53));
      });
  }, []);

  // function to handle click event on buttons
  const handleClick = e => {
    if (e.target.name === 'new' && !showNew) {
      setShowNew(true);
    } else {
      setShowNew(false);
    }

    if (e.target.name === 'old' && !showOld) {
      setShowOld(true);
    } else {
      setShowOld(false);
    }

    if (showChapters) {
      setShowChapters(false);
    }
  };

  // Function to fetch chapters of each book
  const fetchChapters = e => {
    console.log(`${BASE_URL}/books/${e.target.id}/chapters`);
    fetchData(`${BASE_URL}/books/${e.target.id}/chapters`)
      .then(res => res.json())
      .then(chapters => {
        dispatch(getChapters(chapters.data));
        setShowChapters(true);
        hist.push(`/books/${e.target.id}`);
      });
  };

  return (
    <>
      <div className="App">
        { Object.keys(currentUser).length > 0 && (
        <p>
          Logged in:
          {' '}
          {currentUser.user.username}
        </p>
        )}
      </div>

      <div className="book-list">
        { !showOld && (
          <button type="button" name="new" onClick={e => handleClick(e)}>OLD TESTAMENT</button>
        )}
        { !showNew && (
          <button type="button" name="old" onClick={e => handleClick(e)}>NEW TESTAMENT</button>
        )}
        { showNew && (
          <div className="new">
            { newTestament.length > 0 && newTestament.map(book => (
              <button
                type="button"
                id={book.id}
                key={book.id}
                onClick={e => fetchChapters(e)}
              >
                {book.name}
              </button>
            ))}
          </div>
        )}
        { showOld && (
          <div className="old">
            { oldTestament.length > 0 && oldTestament.map(book => (
              <button
                type="button"
                id={book.id}
                key={book.id}
                onClick={e => fetchChapters(e)}
              >
                {book.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
