import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Book = () => {
  // Get chapters from Redux store using useSelector hook
  const chapters = useSelector(state => state.chapter);

  // useHistory to browse to to verse page/component
  const hist = useHistory();

  // Method to load verse on Click
  const loadVerse = e => {
    console.log(e.target.id);
    hist.push('/verse');
  };

  return (
    <div className="chapter-list">
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
  );
};

export default Book;
