import './App.css'
import { useEffect, useState } from 'react';
import { CharacterList } from './components/CharacterList/CharacterList.jsx';
import HomePage from './components/HomePage/HomePage'
import Loader from './components/Loader/Loader.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() =>{
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
    {isLoaded ? (
      <>
        <HomePage />
        <CharacterList />
      </>
    ) : (
      <Loader />
    )}
  </Provider>  
  )
}

export default App;

