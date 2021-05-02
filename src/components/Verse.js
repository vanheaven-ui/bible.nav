import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVerse } from '../redux/selectors';

const Verse = () => {
  // Get route parameters using useParams hook
  const { id, verse } = useParams();
  console.log(id, verse);

  // Grab the chapterId and the data from Redux store
  const { chapterID, chapterNum } = useSelector(state => state.chapterId);
  const details = useSelector(state => state.verses);
  const bookName = useSelector(state => state.name);
  const { jwt: token, user } = useSelector(state => state.user);
  console.log(bookName, chapterNum);
  const userId = user.id;
  console.log(token);

  // Create a verse id to match against the data
  const verseID = `${chapterID}.${verse}`;
  console.log(verseID);
  console.log(`https://biblenav-api.herokuapp.com/api/v1/users/${userId}/favorites`);
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
      body: JSON.stringify({
        book_name: bookName,
        chapter_num: chapterNum,
        verse_num: verse,
        verse: getVerse(details, verseID),
      }),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err.message));
  };

  return (
    <div className="verse">
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
      <p>{getVerse(details, verseID)}</p>
      <button
        type="button"
        onClick={() => addFavorite()}
      >
        Add to favourites(Should use a star)
      </button>
    </div>
  );
};

export default Verse;
