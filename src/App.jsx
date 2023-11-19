import './App.css'
import { CharacterList } from './components/CharacterList/CharacterList.jsx';
import HomePage from './components/HomePage/HomePage'
import { Provider } from 'react-redux';
import store from './redux/store';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  return (
    <Provider store={store}>
      <HomePage/>
      <CharacterList />
    </Provider>
  )
}

export default App;

