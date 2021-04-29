// import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import chaptersURL from '../constants';
// import fetchData from '../data/apiRequests';

const Verse = () => {
  const { id } = useParams();
  console.log(chaptersURL(id));
  console.log(id);

  return (
    <div className="verse">
      Working
    </div>
  );
};

export default Verse;
