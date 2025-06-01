export interface IOrderProduct {
  product: {
    id: number;
    productName: string;
    productPhoto: string;
    weight: number;
  };
  count: number;
  modificator?: number;
  price: number;
}

export interface IReqCreateOrder {
  phone: string;
  comment?: string;
  serviceMode: number;
  address?: string;
  servicePrice?: number;
  tipsPrice?: number;
  spot: number;
  table?: number;
  venue_slug: string;
  orderProducts: {
    product: number;
    count: number;
    modificator?: number;
  }[];
}

export interface IOrder {
  id?: number;
  phone: string;
  comment?: string;
  address?: string;
  venue_slug: string;
  serviceMode: number;
  servicePrice?: string;
  tipsPrice?: string;
  orderProducts: IOrderProduct[];
  status: number;
  statusText: string;
}

export interface IOrderById {
  id: number;
  phone: string;
  comment?: string;
  address: string;
  status: number;
  serviceMode: number;
  servicePrice?: string;
  tipsPrice?: string;
  createdAt: string;
  orderProducts: IOrderProduct[];
  tableNum: string;
  statusText: string;
}

// orderProducts: [
//   {
//     product: 10;
//     count: 1;
//     modificator?: 2;
//   },
//   {
//     product: 10;
//     count: 1;
//     modificator?: 1;
//   },
//   {
//     product: 10;
//     count: 1;
//     modificator?: 0;
//   },
// ]
