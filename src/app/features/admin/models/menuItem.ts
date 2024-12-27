import { IMenuCategory } from './menuCategory';

export interface IMenuItem {
  _id: string;
  menuCategoryId: IMenuCategory;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string;
  __v: number;
  showHoverText?: boolean;
}
