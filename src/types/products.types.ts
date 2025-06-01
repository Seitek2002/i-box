export interface ICategory {
  id: number;
  categoryName: string;
}

export interface IFoodCart {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  weight: number;
  productPhoto: string;
  category: ICategory;
  quantity: number;
  modificators?: IModificator;
}

export interface IModificator {
  id: number;
  name: string;
  price: number;
}

export interface IProduct {
  id: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  weight: number;
  productPhoto: string;
  category: ICategory;
  modificators: IModificator[];
  isRecommended: boolean
}

export interface IOrderProduct {
  venueSlug: string,
  spotSlug: string,
  tableNum?: string,
  phone: string,
  comment: string,
  serviceMode: number,
  servicePrice: string,
  tipsPrice: string,
  orderProducts: {
    product: number,
    count: number,
    modificator?: number
  }[]
}
