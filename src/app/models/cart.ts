export interface Cart {
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  id: undefined | number;
  quantity: undefined | number;
  userId: number;
  productId: number;
}
