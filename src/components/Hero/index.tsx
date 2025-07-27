import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { statusMessages } from 'pages/Order/enums';
import { IBanner, useGetBannersQuery } from 'api/Banners.api';
import { useGetOrdersQuery } from 'api/Orders.api';
import { IOrder } from 'types/orders.types';
import Loader from 'components/Loader';

import offer1 from 'assets/images/OrderStatus/Offer-1.png';
import offer2 from 'assets/images/OrderStatus/Offer-2.png';
import offer3 from 'assets/images/OrderStatus/schedule-status.png';

import './style.scss';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function getWorkStatus(schedule: string) {
  const [startTimeStr, endTimeStr] = schedule.split('-');

  const [startHours, startMinutes] = startTimeStr.split(':').map(Number);
  const [endHours, endMinutes] = endTimeStr.split(':').map(Number);

  const now = new Date();
  const nowHours = now.getHours();
  const nowMinutes = now.getMinutes();

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;
  const nowTotalMinutes = nowHours * 60 + nowMinutes;

  if (startTotalMinutes === endTotalMinutes) {
    return 'Заведение работает круглосуточно';
  }

  if (startTotalMinutes < endTotalMinutes) {
    if (
      nowTotalMinutes >= startTotalMinutes &&
      nowTotalMinutes < endTotalMinutes
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    if (
      nowTotalMinutes >= startTotalMinutes ||
      nowTotalMinutes < endTotalMinutes
    ) {
      return false;
    } else {
      return true;
    }
  }
}

const Hero = () => {
  const user = JSON.parse(localStorage.getItem('users') ?? '{}');
  const venue = JSON.parse(localStorage.getItem('venue') ?? '{}');
  const navigate = useNavigate();

  const {
    data: fetchedBanners,
    isLoading: bannersLoading,
    isError: bannersError,
  } = useGetBannersQuery({ venue_slug: venue.slug });

  const { data: fetchedOrders } = useGetOrdersQuery({
    phone: `${user.phoneNumber}`,
    fridgeSlug: venue.slug,
  });
  const { t } = useTranslation();

  const [orders, setOrders] = useState<IOrder[] | undefined>([]);

  const getStatusData = (serviceMode: number, status: number) => {
    if (!statusMessages[serviceMode]) {
      return {
        text: 'Ожидайте, заказ обрабатывается.',
        color: 'text-orange-500',
      };
    }

    const statusObj =
      statusMessages[serviceMode][status] || statusMessages[serviceMode][0];

    let colorClass = 'text-orange-500';
    if (status === 1) {
      colorClass = 'text-green-500';
    } else if (status === 7) {
      colorClass = 'text-red-500';
    }

    return {
      text: statusObj.title.text,
      color: colorClass,
    };
  };

  useEffect(() => {
    if (fetchedOrders) {
      setOrders(fetchedOrders);
    }
  }, [fetchedOrders]);

  const ws = new WebSocket(
    `wss://ibox.kg/ws/orders/?phone_number=${user.phoneNumber}`
  );

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onmessage = (event) => {
    const data: { order_id: number; status: number; status_text: string } =
      JSON.parse(event.data);
    setOrders((prevOrders) =>
      prevOrders?.map((order) =>
        order.id === data.order_id
          ? { ...order, status: data.status, statusText: data.status_text }
          : order
      )
    );
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected');
  };

  const handleOrderClick = (orderId: number | undefined) => {
    navigate(`/orders/${orderId}`);
  };

  const handleBannerClick = (url: string | undefined) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <section className='hero'>
      {bannersError && <p>{t('banner.error')}</p>}
      {bannersLoading && <Loader />}

      <Swiper
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
        className='hero-swiper'
      >
        {getWorkStatus(venue.schedule || '00:00-00:00') && (
          <SwiperSlide>
            <div
              className='hero__item'
              style={{
                backgroundImage: `url(${offer3})`,
              }}
            >
              <p
                className={`text-base md:text-[32px] max-w-[60%] font-bold text-[#a9a9a9]`}
              >
                Сейчас нерабочее время
              </p>
            </div>
          </SwiperSlide>
        )}

        {orders?.map((order) => {
          const { color } = getStatusData(order.serviceMode, order.status);

          return (
            <SwiperSlide key={`order-${order.id}`}>
              <div
                onClick={() => handleOrderClick(order.id)}
                className='hero__item'
                style={{
                  backgroundImage: `url(${
                    order.status === 0 ? offer1 : offer2
                  })`,
                }}
              >
                <span>Заказ №{order.id}</span>
                <p
                  className={`text-base md:text-[32px] max-w-[60%] font-bold ${color}`}
                >
                  {order.statusText}
                </p>
              </div>
            </SwiperSlide>
          );
        })}

        {fetchedBanners?.map((banner: IBanner) => (
          <SwiperSlide key={`banner-${banner.id}`}>
            <div
              className='hero__item banner__item cursor-pointer'
              onClick={() => handleBannerClick(banner.url)}
            >
              <img src={banner.image} alt={banner.title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
