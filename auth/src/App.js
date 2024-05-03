import { Route, Routes } from 'react-router-dom';
// import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Errors from './Components/Errors';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/*' element={<Errors />} />
      </Routes>
    </div>
  );
}

export default App;
