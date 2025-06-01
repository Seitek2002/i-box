import { useEffect } from 'react';

import AppRoutes from './router';
import { useAppSelector } from 'hooks/useAppSelector';

import './App.scss';

function App() {
  const venue = useAppSelector((state) => state.yourFeature.venue);

  useEffect(() => {
    document.title = venue.companyName;
  }, [venue.companyName]);

  return (
    <div className='relative font-inter bg-[#F1F2F3] px-[16px] pt-[12px] lg:max-w-[1140px] lg:mx-auto'>
      <AppRoutes />
    </div>
  );
}

export default App;
