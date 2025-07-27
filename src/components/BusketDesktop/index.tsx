import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/useAppSelector';
import BusketCard from 'components/Cards/Cart';

import './style.scss';

const BusketDesktop = ({
  to,
  createOrder,
  disabled,
}: {
  createOrder?: () => void;
  to: string;
  disabled?: boolean;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.yourFeature.cart);
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/cart') {
      if (createOrder) createOrder();
    } else {
      navigate(to);
    }
  };

  return (
    <div className='busket__content'>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <BusketCard key={item.id} item={item} />
          ))}
          <button
            style={{ backgroundColor: '#f80101' }}
            onClick={handleClick}
            disabled={disabled}
          >
            {t('button.next')}
          </button>
        </>
      ) : (
        <div className='busket__empty text-center'>{t('basket.addItems')}</div>
      )}
    </div>
  );
};

export default BusketDesktop;
