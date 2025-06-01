import { FC, useState } from 'react';

import { IFoodCart } from 'types/products.types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

import minus from 'assets/icons/Busket/minus.svg';
import plus from 'assets/icons/Busket/plus.svg';

import { addToCart, incrementFromCart } from 'src/store/yourFeatureSlice';

interface IProps {
  item: IFoodCart;
}

const BusketCard: FC<IProps> = ({ item }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  const increment = () => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const decrement = () => {
    dispatch(incrementFromCart(item));
  };

  return (
    <div className='busket-card'>
      <div className='busket-card__img-wrapper'>
        {!isLoaded && (
          <div className='cart-img-skeleton absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse'></div>
        )}
        <img
          src={item.productPhoto}
          alt=''
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      <div className='busket-card__text'>
        <h3>{item.productName}</h3>
        <div className='flex items-center'>
          <span className='price' style={{ color: colorTheme }}>
            {item.modificators ? item.modificators.price : +item.productPrice} с
          </span>
          {item.modificators?.name && (
            <span className='weight mx-[5px]'> | </span>
          )}
          {item.modificators?.name && (
            <span className='weight'>{item.modificators.name}</span>
          )}
        </div>
      </div>
      <div className='busket-card__counter'>
        <img onClick={decrement} src={minus} alt='' />
        <span>{item.quantity}</span>
        <img onClick={increment} src={plus} alt='' />
      </div>
    </div>
  );
};

export default BusketCard;
