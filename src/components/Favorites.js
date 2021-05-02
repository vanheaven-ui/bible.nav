import { useState } from 'react';

const Favorites = () => {
  const [favorites] = useState([]);
  return (
    <section className="favorites">
      <h2>Your Favorites</h2>
      { favorites.length > 0 ? (favorites.map(favorite => (
        <>
          <h2>{favorite.book_name}</h2>
          <h3>
            {favorite.chapter_num}
            {' '}
            {favorite.verse_num}
          </h3>
          <p>{favorite.verse}</p>
        </>
      ))) : <p>No favorites yet</p>}
    </section>
  );
};

export default Favorites;
