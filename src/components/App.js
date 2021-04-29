import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, BOOKS_URL } from '../constants';
import fetchData from '../data/apiRequests';

function App() {
  // get currently logged user from redux store after login
  const currentUser = useSelector(state => state.user);

  // Variables for books of the bible
  const [newTestament, setNewTestament] = useState([]);
  const [oldTestament, setOldTestament] = useState([]);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // variables to show chapters
  const [showChapters, setShowChapters] = useState(false);
  const [chapters, setChapters] = useState([]);

  console.log(chapters);
  console.log(showChapters);

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
    const { id } = e.target;
    fetchData(`${BASE_URL}/books/${id}/chapters`)
      .then(res => res.json())
      .then(chapters => {
        setChapters(chapters.data);
        setShowChapters(true);
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
      { showChapters && (
        <div className="chapter-list">
          { chapters && chapters.map(chapter => (
            <button
              key={chapter.id}
              type="button"
            >
              {chapter.number}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
