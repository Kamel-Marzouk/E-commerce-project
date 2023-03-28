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

export interface PriceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface Order {
  email: string;
  address: string;
  contact: string;
  totalPrice:number;
  userId:number
}
