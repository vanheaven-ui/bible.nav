import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { BASE_URL, BOOKS_URL, dateOptions } from '../constants';
import fetchData from '../data/apiRequests';
import verseOfDay from '../data/verseOfDay';
import { getBookName, getChapters } from '../redux/actions';
import '../styles/home.css';

function App() {
  // useHistory hook to route the different components
  const hist = useHistory();

  // useDispatch hook to disptach actions to the Redux store
  const dispatch = useDispatch();

  // Verse of the day state variables
  const [VoD, setVoD] = useState('');
  const [ref, setRef] = useState('');
  console.log(VoD, ref);

  // Variables for books of the bible
  const [newTestament, setNewTestament] = useState([]);
  const [oldTestament, setOldTestament] = useState([]);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentTime] = useState(new Date().toLocaleDateString('en', dateOptions));

  // variables to show chapters
  const [showChapters, setShowChapters] = useState(false);

  // useEffect hook to fetch data only once when component mounts
  useEffect(() => {
    verseOfDay().then(data => {
      console.log(data);
      setVoD(data.Output);
      setRef(`${data.Book} ${data.Chapter}:${data.Verse}`);
    });

    fetchData(BOOKS_URL)
      .then(data => {
        setOldTestament(data.data.slice(0, 53));
        setNewTestament(data.data.slice(53));
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
    dispatch(getBookName(e.target.name));
    fetchData(`${BASE_URL}/books/${e.target.id}/chapters`)
      .then(chapters => {
        dispatch(getChapters(chapters.data));
        setShowChapters(true);
        hist.push(`/books/${e.target.id}`);
      });
  };

  return (
    <>
      <div className="App">
        <section className="hero">
          <div className="hero-text">
            <Container>
              <Row>
                <Col xs={{ span: 12, order: 'last' }} md={{ span: 6, order: 'first' }}>
                  <div className="left-hero">
                    <h2> Navigating the Bible simplified</h2>
                    <p>Your favorite bible verse is a login away</p>
                    <button type="button" className="orange-button">
                      <Link to="/signup">START HERE</Link>
                    </button>
                  </div>
                </Col>
                <Col xs={{ span: 12, order: 'first' }} md={{ span: 6, order: 'last' }}>
                  <div className="heading">
                    <small>{currentTime}</small>
                    <h4>VERSE OF THE DAY:</h4>
                    <h2>{ref}</h2>
                  </div>
                  <p>{VoD}</p>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        <section className="book-list">
          <h2 className="text-primary">GET BOOKS OF THE BIBLE</h2>
          <Container fluid id="bible-sections">
            <Row>
              <Col xs={12} md={6}>
                <p>Let us navigate the sections of the bible</p>
              </Col>
              <Col xs={12} md={6}>
                { !showOld && (
                <button type="button" name="new" onClick={e => handleClick(e)}>NEW TESTAMENT</button>
                )}
                { !showNew && (
                <button type="button" name="old" onClick={e => handleClick(e)}>OLD TESTAMENT</button>
                )}
                { showNew && (
                <div className="new">
                  { newTestament.length > 0 && newTestament.map(book => (
                    <button
                      name={book.name}
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
                      name={book.name}
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
              </Col>
            </Row>
          </Container>
        </section>
        <section className="favorites-pitch">
          <h3>Create your favorites</h3>
          <p>Have your favorites in one place by registering or signing in</p>
          <div className="buttons">
            <button type="button" className="orange-button"><Link to="/signup">REGISTER</Link></button>
            <button type="button" className="outline-btn"><Link to="/login">LOGIN</Link></button>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
