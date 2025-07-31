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
  const { data } = useGetVenueQuery({
    fridgeSlug: venue || '',
    tableId: Number(id) || undefined,
  });

  useEffect(() => {
    if (data) dispatch(setVenue(data));
  }, [data, dispatch]);

  useEffect(() => {
    const loadedVenue = loadVenueFromStorage();

    if (loadedVenue.slug !== venue) {
      dispatch(clearCart());
    }
  }, []);

  return (
    <div className='sub-header'>
      <div className='sub-header__content'>
        <div className='venue'>
          <div className='flex flex-col gap-3'>
            <div className='name'>{data?.name}</div>
            <div className='name' style={{ color: 'gray', fontSize: '14px' }}>{data?.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
