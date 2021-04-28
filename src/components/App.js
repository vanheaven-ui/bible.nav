import { useSelector } from 'react-redux';

function App() {
  const currentUser = useSelector(state => state.user);

  return (
    <div className="App">
      { Object.keys(currentUser).length > 0 && (
      <p>
        Logged in:
        {currentUser.user.username}
      </p>
      )}
      Starting out
    </div>
  );
}

export default App;
