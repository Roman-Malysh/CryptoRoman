import '../styles/Coins.scss';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Loader } from './Loader';
import {Coin} from './Coin';
import React from 'react';
import useWindowDimensions from './useWindowDimension';

export const Coins = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {height, width} = useWindowDimensions();

  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

  const getCoins = async () => {
    try {
      const data = axios.get(url).then((response) => setData(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <>
      {isLoading ? ( <Loader/>) : (<table className='coins'>
        <thead className='coins__header'>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h</th>
            {width > 700 ? <th>Volume</th> : null}
            {width > 700 ? <th>Mkt Cap</th> : null}
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => (
            <Coin coin={coin} key={coin.market_cap_rank} />
          ))}
        </tbody>
      </table>)}
    </>
  );
};
