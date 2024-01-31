import './App.scss';
import {Coins} from './components/Coins';
import {Routes, Route} from 'react-router-dom';
import {CoinInfo} from './components/CoinInfo';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path=':coinId' element={<CoinInfo />} />
        <Route path='/' element={<Coins />} />
      </Routes>
    </>
  );
}

export default App;
