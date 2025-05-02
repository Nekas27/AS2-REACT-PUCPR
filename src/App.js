import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddUserForm from './components/AddUserForm';
import Confirmation from './components/Confirmation';
import Dashboard from './components/Dashboard'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>
            Meu Projetinho <span className="react">React</span> + <span className="firebase">Firebase</span>
          </h1>

          <nav>
            <Link to="/">Cadastro</Link> |{" "}
       
       
            <Link to="/confirmation">Confirmation</Link> |{" "}
            <Link to="/dashboard">Dashboard</Link> 
          </nav>

       
          <Routes>
            <Route path="/" element={<AddUserForm />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
