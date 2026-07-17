import { create } from "zustand";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type Order = {
  items: OrderItem[];
  total: number;
  orderNumber: string;

  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
};

type OrderStore = {
  order: Order | null;
  createOrder: (order: Order) => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  order: null,

  createOrder: (order) =>
    set({
      order,
    }),
}));