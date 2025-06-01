import { FC } from 'react';

import { useAppSelector } from 'hooks/useAppSelector';

interface IProps {
  item: {
    id: number;
    categoryPhoto: string;
    categoryName: string;
  };
  active: number | undefined;
  selectCategory: (id: number | undefined) => void;
}

const Item: FC<IProps> = ({ item, active, selectCategory }) => {
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  return (
    <div
      className={`categories__item ${active === item.id ? 'active' : ''}`}
      key={item.id}
      onClick={() => selectCategory(item.id)}
    >
      <div
        className={`categories__wrapper`}
        style={{
          backgroundColor: active === item.id ? colorTheme : 'white',
          borderColor: active === item.id ? colorTheme : 'white',
        }}
      >
        <img src={item.categoryPhoto} alt='icon' />
      </div>
      <span className='leading-tight text-black'>{item.categoryName}</span>
    </div>
  );
};

export default Item;
