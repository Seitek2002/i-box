import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import arrowIcon from 'assets/icons/Header/arrow.svg';
import logoIcon from 'assets/icons/Header/logo.svg';
import search from 'assets/icons/Header/search.svg';

import './style.scss';

const LANGUAGES = ['RU', 'KG', 'ENG'];
const LANGUAGE_MAP: Record<string, string> = {
  ru: 'RU',
  kg: 'KG',
  en: 'ENG',
};

interface IProps {
  searchText: string;
  setSearchText?: (text: string) => void;
}

const Header: FC<IProps> = ({ searchText, setSearchText }) => {
  const { i18n } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const activeLang = useMemo(
    () => LANGUAGE_MAP[i18n.language] || 'RU',
    [i18n.language]
  );
  const { t } = useTranslation();
  const toggleLanguageMenu = () => setIsLanguageOpen((prev) => !prev);

  const selectLanguage = (language: string) => {
    const langCode = language === 'RU' ? 'ru' : language === 'KG' ? 'kg' : 'en';
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
    setIsLanguageOpen(false);

    if (navigator.vibrate) navigator.vibrate(50);
    window.location.reload();
  };

  return (
    <header className='header'>
      <div className='header__content'>
        <div className='logo'>
          <img src={logoIcon} alt='iMenu Logo' />
          <span>iBox.kg</span>
        </div>

        {setSearchText && (
          <label htmlFor='search' className='header__search bg-[#F9F9F9]'>
            <img src={search} alt='' />
            <input
              type='text'
              placeholder={t("search")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value.trim())}
              id='search'
            />
          </label>
        )}

        <div className='language'>
          <button
            className={`language-selected bg-gray-100 ${
              isLanguageOpen ? 'active' : ''
            }`}
            onClick={toggleLanguageMenu}
          >
            {activeLang} <img src={arrowIcon} alt='Toggle Language' />
          </button>

          <div
            className={`language__wrapper bg-gray-100 ${
              isLanguageOpen ? 'active' : ''
            }`}
          >
            {LANGUAGES.filter((lang) => lang !== activeLang).map((lang) => (
              <button
                key={lang}
                className='language__item text-gray-900 cursor-pointer'
                onClick={() => selectLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
