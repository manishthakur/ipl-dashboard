import './App.css';
import { TeamPage } from './pages/TeamPage';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { MatchPage } from './pages/MatchPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/teams/:teamName/matches/:year" element={<MatchPage />} />
        </Routes>
        <Routes>
          <Route path="/teams/:teamName" element={<TeamPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
