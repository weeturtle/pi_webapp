import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home/home';
import Nutrition from './pages/nutrition/nutrition';
import Exercise from './pages/exercise/exercise';
import Glucose from './pages/glucose/glucose';
import Login from './pages/login';
import ProtectedPage from './auth/ProtectedPage';

function App() {
  return (
    <div className='page_container'>
      <Navbar />
      
      <Routes>
        <Route element={<ProtectedPage />}>
          <Route path="/" element={<Home />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/glucose" element={<Glucose />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
