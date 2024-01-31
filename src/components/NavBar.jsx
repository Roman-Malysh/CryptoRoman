import '../App.scss';
import {GiCoins} from 'react-icons/gi';
import {useNavigate} from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className='title'>
      <div className='wrapper' onClick={() => navigate('/CryptoRoman')}>
        <GiCoins size={40} color='#89CFF0' />
      </div>
      <h1 className='title__text'>
        Coins <span className='title__span'>Search</span>
      </h1>
    </nav>
  );
};
