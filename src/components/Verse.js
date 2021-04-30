import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVerse } from '../redux/selectors';

const Verse = () => {
  const { id, verse } = useParams();
  console.log(id, verse);

  // Grab the chapterId and the data from Redux store
  const chapterID = useSelector(state => state.chapterId);
  const details = useSelector(state => state.verses);

  // Create a verse id to match against the data
  const verseID = `${chapterID}.${verse}`;
  console.log(verseID);

  // Get the preferred verse
  getVerse(details, verseID);

  return (
    <div className="verse">
      Working
      <h2>{verseID}</h2>
      <p>{getVerse(details, verseID)}</p>
    </div>
  );
};

export default Verse;
