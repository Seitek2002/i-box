import { FC } from 'react';

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

  return (
    <div
      className={`categories__item ${active === item.id ? 'active' : ''}`}
      key={item.id}
      onClick={() => selectCategory(item.id)}
    >
      <div
        className={`categories__wrapper`}
        style={{
          backgroundColor: active === item.id ? "#f80101" : 'white',
          borderColor: active === item.id ? "#f80101" : 'white',
        }}
      >
        <img src={item.categoryPhoto} alt='icon' />
      </div>
      <span className='leading-tight text-black'>{item.categoryName}</span>
    </div>
  );
};

export default Item;
