import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Catalog from './components/Catalog';
import Categories from './components/Categories';
import Search from './components/Search';
import BusketDesktop from 'components/BusketDesktop';
import ClearCartModal from 'components/ClearCartModal';
import Header from 'components/Header';
// import Hero from 'components/Hero';
import SupHeader from 'components/SubHeader';

import clearCartIcon from 'assets/icons/Busket/clear-cart.svg';

import { loadUsersDataFromStorage } from 'src/utlis/storageUtils';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const [active, setActive] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const catalogRef = useRef<HTMLDivElement>(null);
  const [search, onSearch] = useState(false);
  const userData = loadUsersDataFromStorage();
  const { t } = useTranslation();
  const clearCartHandler = () => {
    setActive(!active);
  };

  const onSearchChange = (bool: boolean) => {
    onSearch(bool);
    document.body.style.overflow = bool ? 'hidden' : '';
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (categoryId?: number) => {
    setSelectedCategory(categoryId);
    catalogRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('mainPage', location.pathname);

    localStorage.setItem(
      'users',
      JSON.stringify({
        ...userData,
        activeSpot: +location.pathname.split('/').filter((item) => +item)[0],
      })
    );

    console.log(JSON.parse(localStorage.getItem('users') ?? '{}'));
  }, []);

  return (
    <>
      <ClearCartModal isShow={active} setActive={setActive} />
      <div className='bg-white rounded-[12px] p-[12px]'>
        <Header searchText={searchText} setSearchText={setSearchText} />
        <hr className='my-[10px]' />
        <SupHeader />
      </div>
      {window.innerWidth < 768 ? (
        <>
          {search && (
            <Search
              onSearchChange={onSearchChange}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          )}
          <Categories
            onCategoryChange={handleCategoryChange}
            onSearchChange={onSearchChange}
          />
          <div ref={catalogRef} className='pb-[100px]'>
            <Catalog selectedCategory={selectedCategory} />
          </div>
        </>
      ) : (
        <div className='flex gap-[30px] items-start pb-[50px] w-full'>
          <div className='w-[60%]'>
            <Categories
              onCategoryChange={handleCategoryChange}
              onSearchChange={onSearchChange}
            />
            <Catalog
              searchText={searchText}
              selectedCategory={selectedCategory}
            />
          </div>
          <div className='flex-1 sticky top-0'>
            <div className='busket'>
              <header className='busket__header'>
                <h2>{t('basket.title')}</h2>
                <img
                  onClick={clearCartHandler}
                  src={clearCartIcon}
                  alt=''
                  className='cursor-pointer'
                />
              </header>
              <BusketDesktop to='/cart' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
