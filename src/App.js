import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Router>
          <Home/>
        </Router>
      </CookiesProvider>
    
    </div>
  );
}

export default App;
