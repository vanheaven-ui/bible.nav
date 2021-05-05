import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RAPID_API_BASE } from '../constants';
import '../styles/verse.css';

const Verse = () => {
  // Get route parameters using useParams hook
  const { id, verse } = useParams();
  const [text, setText] = useState('');
  console.log(id, verse);

  // stte variables to manange verse
  const [scripture, setScripture] = useState({});
  console.log(scripture);

  // Grab the chapterId and the data from Redux store
  const { chapterID, chapterNum } = useSelector(state => state.chapterId);
  const bookName = useSelector(state => state.name);
  const { jwt: token, user } = useSelector(state => state.user);
  console.log(bookName, chapterNum);
  const userId = user.id;
  console.log(token);

  // Get verse chosen from external api
  useEffect(() => {
    fetch(`${RAPID_API_BASE}?Verse=${verse}&chapter=${chapterNum}&Book=${bookName}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '36b571e37emshf64ca4aee9ccebcp1eeaefjsn46401cd9bc4a',
        'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then(data => {
        setText(data.Output);
        setScripture(data);
      })
      .catch(err => console.error(err));
  }, []);

  // Create a verse id to match against the data
  const verseID = `${chapterID}.${verse}`;
  console.log(verseID);

  // Add to favorites on click
  const addFavorite = () => {
    fetch(`https://biblenav-api.herokuapp.com/api/v1/users/${userId}/favorites`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      },
      body: JSON.stringify(scripture),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err.message));
  };

  return (
    <section className="verse">
      <div id="google_translate_element" />
      <h2>{`${bookName}`}</h2>
      <h3>
        Chapter:
        {' '}
        {chapterNum}
        {' '}
        Verse:
        {' '}
        {verse}
      </h3>
      <p>{text}</p>
      <button
        type="button"
        onClick={() => addFavorite()}
      >
        Add to favourites(Should use a star)
      </button>
    </section>
  );
};

export default Verse;
