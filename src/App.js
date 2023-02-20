import logo from './logo.svg';
import './App.css';
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
