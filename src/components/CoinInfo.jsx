import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Loader} from './Loader';
import * as DOMPurify from 'dompurify';
import useWindowDimensions from './useWindowDimension';
import '../styles/CoinInfo.scss';

import axios from 'axios';

export const CoinInfo = () => {
  const params = useParams();

  const [coin, setCoin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { height, width } = useWindowDimensions();

  console.log(coin);

  const getCoin = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;
    setIsLoading(true);
    try {
      const data = await axios
        .get(url)
        .then((response) => setCoin(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCoin();
  }, []);

  const Info = (
    <div className='coinInfo'>
      <h2 className='coinInfo__h2'>{coin.name}</h2>
      <div className='coinInfo__wrapper-one-withPadding coinInfo__wrapper-one'>
        <p className='coinInfo__rank'>Rank #{coin.market_cap_rank}</p>
        <div className='coinInfo__price'>
          {coin.image ? <img src={coin.image.small} alt='img' className='coinInfo__image' /> : null}
          <span>
            {coin.name} {coin.symbol}
          </span>
        </div>
        {coin.market_data ? (
          <p className='coinInfo__p'>
            ${coin.market_data.current_price.usd.toLocaleString()}
          </p>
        ) : null}
      </div>
      <div className='coinInfo__wrapper-one'>
        <table className='coins'>
          <thead className='coins__header'>
            <tr>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              {width > 700 ?
              (
                <>
                  <th>14d</th>
                  <th>30d</th>
                  <th>1yr</th>
                </>
              ) : null}
            </tr>
          </thead>
          <tbody>
            <tr>
              {coin.market_data?.price_change_percentage_1h_in_currency ? (
                <th>
                  {coin.market_data.price_change_percentage_1h_in_currency.usd}%
                </th>
              ) : null}
              {coin.market_data?.price_change_percentage_24h_in_currency ? (
                <th>
                  {coin.market_data.price_change_percentage_24h_in_currency.usd}
                  %
                </th>
              ) : null}
              {coin.market_data?.price_change_percentage_7d_in_currency ? (
                <th>
                  {coin.market_data.price_change_percentage_7d_in_currency.usd}%
                </th>
              ) : null}
              {width > 700 ?
              (
                <>
                  {coin.market_data?.price_change_percentage_14d_in_currency ? (
                    <th>
                      {
                        coin.market_data.price_change_percentage_14d_in_currency
                          .usd
                      }
                      %
                    </th>
                  ) : null}
                  {coin.market_data?.price_change_percentage_30d_in_currency ? (
                    <th>
                      {
                        coin.market_data.price_change_percentage_30d_in_currency
                          .usd
                      }
                      %
                    </th>
                  ) : null}
                  {coin.market_data?.price_change_percentage_1y_in_currency ? (
                    <th>
                      {
                        coin.market_data.price_change_percentage_1y_in_currency
                          .usd
                      }
                      %
                    </th>
                  ) : null}
                </>
              ) : null}
            </tr>
          </tbody>
        </table>
      </div>
      <div className='coinInfo__wrapper-one-withPadding coinInfo__wrapper-one'>
        <div className='grid'>
          {coin.market_data?.low_24h ? (
            <div className='grid__item'>
              <span>24 hours low</span>{' '}
              <span>${coin.market_data.low_24h.usd.toLocaleString()}</span>
            </div>
          ) : null}
          {coin.market_data?.high_24h ? (
            <div className='grid__item'>
              <span>24 hours high</span>{' '}
              <span>${coin.market_data.high_24h.usd.toLocaleString()}</span>
            </div>
          ) : null}
          {coin.market_data?.market_cap ? (
            <div className='grid__item'>
              <span>Market cap</span>
              <span>{coin.market_data.market_cap.usd.toLocaleString()}</span>
            </div>
          ) : null}
          {coin.market_data?.circulating_supply ? (
            <div className='grid__item'>
              <span>Circulating supply</span>
              <span>{coin.market_data.circulating_supply.toLocaleString()}</span>
            </div>
          ) : null}
        </div>
      </div>
      <h2 className='coinInfo__h2'>About</h2>
      <p
        className='coinInfo__description'
        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(coin.description ? coin.description.en : '')}}></p>
    </div>
  );

  return <>{isLoading ? <Loader /> : Info}</>;
};
