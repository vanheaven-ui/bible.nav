import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getBibleBooks from '../data/apiRequests';

function App() {
  // get currently logged user from redux store after login
  const currentUser = useSelector(state => state.user);

  // Variables for books of the bible
  const [newTestament, setNewTestament] = useState([]);
  const [oldTestament, setOldTestament] = useState([]);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // useEffect hook to fetch data only once when component mounts
  useEffect(() => {
    getBibleBooks().then(res => res.json())
      .then(data => {
        console.log(data.data.slice(53));
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
          <button type="button" name="new" onClick={e => handleClick(e)}>NEW TESTAMENT</button>
        )}
        { !showNew && (
          <button type="button" name="old" onClick={e => handleClick(e)}>OLD TESTAMENT</button>
        )}
        { showNew && (
          <div className="new">
            { newTestament && newTestament.map(book => (
              <button type="button" key={book.id}>{book.name}</button>
            ))}
          </div>
        )}
        { showOld && (
          <div className="old">
            { oldTestament && oldTestament.map(book => (
              <button type="button" key={book.id}>{book.name}</button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
