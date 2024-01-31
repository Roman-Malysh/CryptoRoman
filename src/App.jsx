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
        <Route path='/CryptoRoman/:coinId' element={<CoinInfo />} />
        <Route path='/CryptoRoman' element={<Coins />} />
      </Routes>
    </>
  );
}

export default App;
