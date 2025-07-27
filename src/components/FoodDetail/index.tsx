import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IModificator, IProduct } from 'types/products.types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

import close from './close.svg';
import minus from 'assets/icons/Busket/minus.svg';
import plus from 'assets/icons/Busket/plus.svg';

import { useGesture } from '@use-gesture/react';
import { addToCart } from 'src/store/yourFeatureSlice';

interface IProps {
  item: IProduct;
  setIsShow: () => void;
  isShow: boolean;
}

const FoodDetail: FC<IProps> = ({ setIsShow, item, isShow }) => {
  const cart = useAppSelector((state) => state.yourFeature.cart);
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();
  const [counter, setCounter] = useState(1);
  const sizes: IModificator[] = item.modificators || [];
  const [selectedSize, setSelectedSize] = useState<IModificator>({
    id: 0,
    name: '',
    price: 0,
  });
  const dispatch = useAppDispatch();

  const VibrationClick = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, []);

  const handleCounterChange = useCallback((delta: number) => {
    setCounter((prev) => Math.max(1, prev + delta));
  }, []);

  const handleDone = useCallback(() => {
    if (item) {
      const newItem = {
        ...item,
        modificators: selectedSize,
        id: item.id + ',' + selectedSize.id,
        quantity: counter,
      };
      dispatch(addToCart(newItem));
    }

    setIsShow();
  }, [item, setIsShow, selectedSize, counter, dispatch]);

  const selectSize = useCallback(
    (sizeKey: IModificator) => {
      setSelectedSize(sizeKey);
      VibrationClick();
    },
    [VibrationClick]
  );

  const bind = useGesture({
    onDrag: ({ movement: [, y], down }) => {
      if (!down && y > 100) {
        setIsShow();
      }
    },
  });

  const handleImageClick = () => {
    setIsShow();
    VibrationClick();
  };

  useEffect(() => {
    if (item.modificators[0]) {
      setSelectedSize(item.modificators[0]);
      if (
        cart.find((cartItem) => cartItem.id === item.id + ',' + selectedSize.id)
      ) {
        setCounter(
          cart.find(
            (cartItem) => cartItem.id === item.id + ',' + selectedSize.id
          )?.quantity || 1
        );
      }
    }
  }, [item.modificators]);

  useEffect(() => {
    if (
      cart.find((cartItem) => cartItem.id === item.id + ',' + selectedSize.id)
    ) {
      setCounter(
        cart.find((cartItem) => cartItem.id === item.id + ',' + selectedSize.id)
          ?.quantity || 1
      );
    } else {
      setCounter(1);
    }
  }, [cart, item.id, selectedSize.id]);

  useEffect(() => {
    setIsLoaded(false);
  }, [item?.productPhoto]);

  return (
    <>
      <div
        className={isShow ? 'overlay active' : 'overlay'}
        onClick={handleImageClick}
      ></div>
      <div
        className={`${isShow ? 'active' : ''} food-detail`}
        style={{ backgroundColor: '#fff' }}
      >
        <img
          src={close}
          alt='close'
          className='close'
          onClick={handleImageClick}
        />
        <div className='food-detail__wrapper'>
          <div {...bind()} className='img-wrapper'>
            {!isLoaded && (
              <div className='cart-img-skeleton absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse'></div>
            )}
            <img
              src={item?.productPhoto}
              alt='product'
              onLoad={() => setIsLoaded(true)}
              className={`transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <div className='food-detail__content'>
            <div className='description'>
              <h2>{item?.productName}</h2>
              <p>{item?.productDescription}</p>
            </div>
            {sizes.length !== 0 && (
              <div className='size'>
                <div className='flex items-center justify-between'>
                  <h2>{t('size.size')}</h2>
                  <div style={{ color: '#f80101' }} className='required'>
                    {t('necessarily')}
                  </div>
                </div>
                <div className='size__content'>
                  {sizes.map((sizeKey: IModificator, index: number) => (
                    <div
                      key={index}
                      className={`size__item bg-white ${
                        selectedSize.name === sizeKey.name ? 'active' : ''
                      }`}
                      style={{
                        borderColor:
                          selectedSize.name === sizeKey.name ? '#f80101' : '',
                      }}
                      onClick={() => selectSize(sizeKey)}
                    >
                      <span>{sizeKey.name}</span>
                      <div className='price'>{sizeKey.price} c</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <footer className='counter'>
              <div className='counter__left'>
                <img
                  src={minus}
                  alt=''
                  onClick={() => handleCounterChange(-1)}
                  className='cursor-pointer'
                />
                <span>{counter}</span>
                <img
                  src={plus}
                  alt=''
                  onClick={() => handleCounterChange(1)}
                  className='cursor-pointer'
                />
              </div>
              <div
                className='counter__right'
                style={{ backgroundColor: '#f80101', color: '#fff' }}
              >
                <button onClick={handleDone}>{t('button.add')}</button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetail;
