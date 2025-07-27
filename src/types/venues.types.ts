export interface ISpot {
  id: number;
  name: string;
  address: string | null;
}

export interface IVenues {
  colorTheme: string;
  slug: string;
  logo: string;
  schedule: string;
  serviceFeePercent: number;
  location: string;
  table: {
    id: number;
    tableNum: string;
  };
  spots?: ISpot[];
  activeSpot: number;
  isDeliveryAvailable: boolean;
  isTakeoutAvailable: boolean;
  isDineinAvailable: boolean;
}
