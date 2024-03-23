import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home';
import Nutrition from './pages/nutrition';
import Exercise from './pages/exercise';
import Glucose from './pages/glucose';

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/glucose" element={<Glucose />} />
      </Routes>
    </>
  );
}

export default App;
