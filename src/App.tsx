import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home/home';
import Nutrition from './pages/nutrition/nutrition';
import Exercise from './pages/exercise/exercise';
import Glucose from './pages/glucose/glucose';

function App() {
  return (
    <div className='page_container'>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/glucose" element={<Glucose />} />
      </Routes>
    </div>
  );
}

export default App;
