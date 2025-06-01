import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetVenueQuery } from 'api/Venue.api';

// import { useAppSelector } from 'hooks/useAppSelector';
// import bell from 'assets/icons/SubHeader/bell.svg';
// import check from 'assets/icons/SubHeader/check.svg';
// import logo from 'assets/images/SubHeader/logo.png';
import './style.scss';

import { clearCart, setVenue } from 'src/store/yourFeatureSlice';
import { loadVenueFromStorage } from 'src/utlis/storageUtils';

const SubHeader = () => {
  const { venue, id } = useParams();
  const dispatch = useDispatch();
  // const venueData = useAppSelector((state) => state.yourFeature.venue);
  const { data } = useGetVenueQuery({
    venueSlug: venue || '',
    tableId: Number(id) || undefined,
  });

  useEffect(() => {
    if (data) dispatch(setVenue(data));
  }, [data, dispatch]);

  useEffect(() => {
    const loadedVenue = loadVenueFromStorage();

    if (loadedVenue.companyName !== venue) {
      dispatch(clearCart());
    }

    // if(venueData.activeSpot !== location.pathname.split('/').filter((item) => +item)[0]) {

    // }
  }, []);

  return (
    <div className='sub-header'>
      <div className='sub-header__content'>
        <div className='venue'>
          <div className='logo'>
            <img src={data?.logo} alt='' />
          </div>
          <div>
            <div className='name'>{data?.companyName}</div>
            <span className='schedule'>{data?.schedule}</span>
          </div>
        </div>
        <div className='flex items-center justify-between md:gap-[12px] md:flex-initial'>
          {/* {data?.table?.tableNum && (
            <div className='call'>
              <img src={bell} alt='' />
              <span className='hidden md:inline'>Позвать официанта</span>
            </div>
          )}
          {
            data?.table?.tableNum ? (
              <div className='check'>
                <img src={check} alt='' />
                <span className='hidden md:inline'>Чек</span>
              </div>
            ) : (
              <div className='check'>
                <img src={check} alt='' />
                <span>Чек</span>
              </div>
            )
          } */}
          {data?.table?.tableNum && (
            <div className='table'>Стол №{data.table.tableNum}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
