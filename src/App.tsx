import './App.css'
import React, { useEffect, useState } from 'react';
import CharacterList from './components/CharacterList/CharacterList';
import HomePage from './components/HomePage/HomePage'
import Loader from './components/Loader/Loader';
import { Provider } from 'react-redux';
import store from './redux/store';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App:React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
      {/* <WatchList /> */}
    </Provider>  
  )
}

export default App;
