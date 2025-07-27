import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { usePostOrdersMutation } from 'api/Orders.api';
import { useGetProductsQuery } from 'api/Products.api';
import { IReqCreateOrder } from 'types/orders.types';
import { IFoodCart, IProduct } from 'types/products.types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import Empty from './components/Empty';
import BusketDesktop from 'components/BusketDesktop';
import BusketCard from 'components/Cards/Cart';
import CatalogCard from 'components/Cards/Catalog';
import ClearCartModal from 'components/ClearCartModal';
import FoodDetail from 'components/FoodDetail';

import clearCartIcon from 'assets/icons/Busket/clear-cart.svg';
import cookie from 'assets/icons/Busket/cookie.svg';
import headerArrowIcon from 'assets/icons/Busket/header-arrow.svg';

import './style.scss';

import { useMask } from '@react-input/mask';
import { clearCart, setUsersData } from 'src/store/yourFeatureSlice';
import { loadUsersDataFromStorage } from 'src/utlis/storageUtils';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const [postOrder] = usePostOrdersMutation();
  const userData = loadUsersDataFromStorage();
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const cart = useAppSelector((state) => state.yourFeature.cart);
  const [isLoading, setIsLoading] = useState(false);
  const venueData = useAppSelector((state) => state.yourFeature.venue);

  const [phoneNumber, setPhoneNumber] = useState(
    `+996${userData.phoneNumber.replace('996', '')}`
  );
  const [address, setAddress] = useState(userData.address || '');

  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  const [activeFood, setActiveFood] = useState<IProduct | null>(null);
  const [clearCartModal, setClearCartModal] = useState(false);

  const navigate = useNavigate();
  const { data } = useGetProductsQuery({
    fridgeSlug: venueData.slug,
  });

  const inputRef = useMask({
    mask: '+996_________',
    replacement: { _: /\d/ },
  });


  const handleClose = () => {
    setIsShow(false);
    document.body.style.height = '';
    document.body.style.overflow = '';
  };

  const handleOpen = (food: IProduct) => {
    setIsShow(true);
    setActiveFood(food);
    document.body.style.height = '100dvh';
    document.body.style.overflow = 'hidden';
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);

    if (!value.trim()) {
      setPhoneError('Это обязательное поле');
    } else if (value.length < 13) {
      setPhoneError('Тут нужно минимум 12 символов');
    } else {
      setPhoneError('');
    }
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);

    if (!value.trim()) {
      setAddressError('Это обязательное поле');
    } else if (value.trim().length < 4) {
      setAddressError('Тут нужно минимум 4 символа');
    } else {
      setAddressError('');
    }
  };

  const isButtonDisabled = useMemo(() => {
    if (phoneError) return false;
    if (addressError) return false;
    if (!phoneNumber.trim() || phoneNumber.length < 12) return false;
    if (!address.trim() || address.trim().length < 4) return false;
    return true;
  }, [phoneNumber, address, phoneError, addressError]);

  const handleOrder = async () => {
    
    setIsLoading(true);

    const orderProducts = cart.map((item) => {
      if (item.modificators?.id) {
        return {
          product: +item.id.split(',')[0],
          count: +item.quantity,
          modificator: item.modificators.id,
        };
      } else {
        return {
          product: +item.id.split(',')[0],
          count: +item.quantity,
        };
      }
    });

    const acc: IReqCreateOrder = {
      phone: phoneNumber
        .replace('-', '')
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace('+', '')
        .replace(' ', ''),
      orderProducts,
      serviceMode: 3,
      fridgeSlug: venueData.slug,
      address: venueData.location,
    };

    if (venueData?.table?.tableNum) {
      acc.serviceMode = 1;
      acc.table = +venueData.table.id;
    }

    dispatch(
      setUsersData({
        ...userData,
        phoneNumber: acc.phone,
        address,
      })
    );

    const { data: res } = await postOrder({
      ...acc,
    });

    if (res?.paymentUrl) {
      dispatch(clearCart());
      setIsLoading(false);
      window.location.href = res.paymentUrl;
    } else {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  function getCartItemPrice(item: IFoodCart): number {
    if (item.modificators?.price) {
      return item.modificators.price;
    }
    return item.productPrice;
  }

  const solveTotalSum = () => {
    const subtotal = cart.reduce((acc, item) => {
      const realPrice = getCartItemPrice(item);
      return acc + realPrice * item.quantity;
    }, 0);
    return subtotal;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='cart'>
      <FoodDetail
        isShow={isShow}
        setIsShow={handleClose}
        item={
          activeFood || {
            category: { categoryName: '', id: 0 },
            productName: '',
            productPhoto: '',
            productPrice: 0,
            weight: 0,
            productDescription: '',
            isRecommended: false,
            modificators: [{ id: 0, name: '', price: 0 }],
            id: 0,
          }
        }
      />
      <ClearCartModal isShow={clearCartModal} setActive={setClearCartModal} />
      {isLoading && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-[100]'>
          <div className='bg-white size-full p-[20px] rounded-[15px] flex flex-col items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid'
              width='200'
              height='200'
              style={{
                background: 'transparent',
                shapeRendering: 'auto',
                display: 'block',
              }}
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g>
                <g transform='rotate(0 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.9166666666666666s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(30 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.8333333333333334s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(60 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.75s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(90 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.6666666666666666s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(120 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.5833333333333334s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(150 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.5s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(180 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.4166666666666667s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(210 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.3333333333333333s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(240 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.25s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(270 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.16666666666666666s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(300 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='-0.08333333333333333s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g transform='rotate(330 50 50)'>
                  <rect
                    fill={"#f80101"}
                    height='12'
                    width='6'
                    ry='6'
                    rx='3'
                    y='24'
                    x='47'
                  >
                    <animate
                      repeatCount='indefinite'
                      begin='0s'
                      dur='1s'
                      keyTimes='0;1'
                      values='1;0'
                      attributeName='opacity'
                    ></animate>
                  </rect>
                </g>
                <g></g>
              </g>
            </svg>
            Ожидайте...
          </div>
        </div>
      )}

      <header className='cart__header'>
        <img
          src={headerArrowIcon}
          alt=''
          onClick={() => navigate(-1)}
          className='cursor-pointer'
        />
        <h3>{t('basket.title')}</h3>
        <img
          src={clearCartIcon}
          alt=''
          onClick={() => setClearCartModal(true)}
        />
      </header>

      {window.innerWidth < 768 && (
        <>
          <div className='cart__items'>
            {cart.length > 0 ? (
              cart.map((item) => <BusketCard key={item.id} item={item} />)
            ) : (
              <div />
            )}
          </div>
        </>
      )}

      <div className='md:flex gap-[24px]'>
        <div className='md:w-[50%]'>
          {cart.length > 0 ? (
            <>
              <div className='cart__contacts'>
                <label htmlFor='phoneNumber'>
                  <span className='text-[14px]'>
                    {t('phoneNumber')}{' '}
                    <span className='required' style={{ color: '#f80101' }}>
                      {t('necessarily')}
                    </span>
                  </span>
                  <input
                    type='text'
                    placeholder='+996'
                    id='phoneNumber'
                    ref={inputRef}
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                  />
                  {phoneError && (
                    <div className='error-message'>{phoneError}</div>
                  )}
                </label>
              </div>

              <div className='cart__sum bg-[#fff]'>
                <div className='cart__sum-ress border-[#f3f3f3]'>
                  {t('empty.totalAmount')} <span>{solveTotalSum()} c</span>
                </div>
              </div>
            </>
          ) : (
            <Empty />
          )}
        </div>

        {window.innerWidth >= 768 && (
          <div className='busket flex-1'>
            <BusketDesktop
              to='/order'
              createOrder={handleOrder}
              disabled={!isButtonDisabled || !cart.length}
            />
          </div>
        )}
      </div>

      {(data?.filter((item) => item.isRecommended) ?? []).length > 0 && (
        <div className='cart__forgot'>
          <h4 className='cart__forgot-title'>
            {t('orders.forgotten')}
            <img src={cookie} alt='cookie' />
          </h4>
          <div className='cart__forgot-wrapper'>
            {data
              ?.filter((item) => item.isRecommended)
              .map((item) => (
                <CatalogCard
                  foodDetail={handleOpen}
                  key={item.id}
                  item={item}
                />
              ))}
          </div>
        </div>
      )}

      {window.innerWidth < 768 && (
        <footer className='cart__footer'>
          <button
            disabled={!cart.length || !isButtonDisabled}
            style={{ backgroundColor: '#f80101' }}
            onClick={handleOrder}
          >
            {t('button.next') || 'Далее'}
          </button>
        </footer>
      )}
    </section>
  );
};

export default Cart;
