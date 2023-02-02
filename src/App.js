import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import { BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Home/>
      </Router>
       

    </div>
  );
}

export default App;
