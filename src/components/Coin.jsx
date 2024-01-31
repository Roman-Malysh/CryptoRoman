
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from './useWindowDimension';
import '../styles/Coin.scss';

export const Coin = ({coin}) => {

  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();

  return (
    <tr className="coin" onClick={() => navigate(`${coin.id}`)}>
      <td className="coin__p">{coin.market_cap_rank}</td>
      <td className="coin__p"><div className="coin__image-wrap"><img className='coin__image' src={coin.image} alt="" />{coin.symbol}</div></td>
      <td className="coin__p">${coin.current_price.toLocaleString()}</td>
      <td className="coin__p">{coin.market_cap_change_percentage_24h}%</td>
      {width > 700 ? (<td className="coin__p">${coin.total_volume.toLocaleString()}</td>) : null}
      {width > 700 ? (<td className="coin__p">${coin.market_cap.toLocaleString()}</td>) : null}
    </tr>
  )
}