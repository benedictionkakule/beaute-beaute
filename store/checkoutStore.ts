import { create } from "zustand";

type CheckoutData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
};

type CheckoutStore = {
  checkoutData: CheckoutData;

  setCheckoutData: (data: CheckoutData) => void;

  clearCheckoutData: () => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  checkoutData: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  },

  setCheckoutData: (data) =>
    set({
      checkoutData: data,
    }),

  clearCheckoutData: () =>
    set({
      checkoutData: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
      },
    }),
}));