import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { IProduct } from "types/products.types";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

import whiteMinus from "assets/icons/CatalogCard/white-minus.svg";
import whitePlus from "assets/icons/CatalogCard/white-plus.svg";

import "./style.scss";

import { addToCart, incrementFromCart } from "src/store/yourFeatureSlice";

interface IProps {
  item: IProduct;
  foodDetail?: (item: IProduct) => void;
}

const CatalogCard: FC<IProps> = ({ item, foodDetail }) => {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const cart = useAppSelector((state) => state.yourFeature.cart);
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  const openFoodDetail = () => {
    if (foodDetail) foodDetail(item as IProduct);
  };

  const handleClick = () => {
    if (item.modificators.length) {
      openFoodDetail();
    } else {
      const newItem = {
        ...item,
        id: item.id + "",
        modificators: undefined,
        quantity: 1,
      };
      dispatch(addToCart(newItem));
    }
  };
  const { t } = useTranslation();
  const handleDecrement = () => {
    if (item.modificators.length) {
      openFoodDetail();
    } else {
      dispatch(incrementFromCart(item));
    }
  };

  const foundCartItem = cart.find(
    (cartItem) => +cartItem.id.split(",")[0] == item.id
  );

  return (
    <div className="cart-block bg-white">
      <div className="cart-img">
        {!isLoaded && (
          <div className="cart-img-skeleton absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse"></div>
        )}
        <img
          src={item.productPhoto}
          alt="img"
          onLoad={() => setIsLoaded(true)} 
          className={`transition-opacity duration-300 cursor-pointer ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onClick={openFoodDetail}
        />
      </div>
      {item.modificators.length ? (
        <div className="cart-info">
          <span className="cart-price" style={{ color: colorTheme }}>
            от {+item.modificators[0].price} с
          </span>
        </div>
      ) : (
        <div className="cart-info">
          <span className="cart-price" style={{ color: colorTheme }}>
            {+item.productPrice} с
          </span>
        </div>
      )}
      <h4 className="cart-name">{item.productName}</h4>
      {!foundCartItem && (
        <button
          className="cart-btn bg-[#F1F2F3] text-[#000]"
          onClick={handleClick}
        >
          {t("button.add")}
        </button>
      )}
      {foundCartItem &&
        foundCartItem.modificators &&
        foundCartItem.modificators.name && (
          <button
            className="cart-btn bg-[#F1F2F3] text-[#000]"
            onClick={handleClick}
          >
            {t("button.add")}
          </button>
        )}
      {foundCartItem && !foundCartItem?.modificators?.name && (
        <div
          className="cart-btn active"
          style={{ backgroundColor: colorTheme }}
        >
          <img onClick={handleDecrement} src={whiteMinus} alt="minus" />
          <span className="cart-count text-[#fff]">
            {foundCartItem?.quantity}
          </span>
          <img onClick={handleClick} src={whitePlus} alt="plus" />
        </div>
      )}
    </div>
  );
};

export default CatalogCard;
