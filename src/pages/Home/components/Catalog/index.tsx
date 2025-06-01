import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductsQuery } from 'api/Products.api';
import { IFoodCart, IProduct } from 'types/products.types';
import { useAppSelector } from 'hooks/useAppSelector';
import CatalogCard from 'components/Cards/Catalog';
import FoodDetail from 'components/FoodDetail';

import nothing from 'assets/images/not-found-products.png';

import './style.scss';

import { t } from 'i18next';

interface IProps {
  searchText?: string;
}

const Catalog: FC<IProps> = ({ searchText }) => {
  const { venue } = useParams();
  const [isShow, setIsShow] = useState(false);
  const [activeFood, setActiveFood] = useState<IProduct | null>(null);
  const cart = useAppSelector((state) => state.yourFeature.cart);
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  const navigate = useNavigate();
  const { data: items } = useGetProductsQuery({
    search: searchText,
    venueSlug: venue,
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

  function getCartItemPrice(item: IFoodCart): number {
    if (item.modificators?.price) {
      return item.modificators.price;
    }
    return item.productPrice;
  }

  const subtotal = cart.reduce((acc, item) => {
    const realPrice = getCartItemPrice(item);
    return acc + realPrice * item.quantity;
  }, 0);

  return (
    <section className='catalog'>
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
            modificators: [
              {
                id: 0,
                name: '',
                price: 0,
              },
            ],
            id: 0,
          }
        }
      />
      <h2>{t('allDishes')}</h2>
      {items && items.length > 0 ? (
        <div className='catalog__content'>
          {items?.map((item) => {
            return (
              <CatalogCard foodDetail={handleOpen} key={item.id} item={item} />
            );
          })}
          {window.innerWidth < 768 && cart.length !== 0 && (
            <div className='catalog__footer'>
              <button
                onClick={() => navigate('/cart')}
                style={{ backgroundColor: colorTheme }}
              >
                {t('basket.order')}
                <span className='font-light absolute right-[30px]'>
                  {subtotal} с
                </span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className='mt-[24px] flex flex-col items-center'>
          <h3 className='text-center text-[24px] font-semibold mb-[24px]'>
            Увы, ничего не найдено{'('}
          </h3>
          <img src={nothing} alt='' className='w-1/2' />
        </div>
      )}
    </section>
  );
};

export default Catalog;
