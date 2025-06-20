import { create } from 'zustand';
import type { Product } from '../api/productsAPI';

interface ProductsState {
  products: Product[];
  total: number;
  setProducts: (list: Product[], total: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (prod: Product) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  total: 0,
  setProducts: (list, total) => set({ products: list, total }),
  deleteProduct: (id) => set((state) => {
    const index = state.products.findIndex((p) => p.id === id);
    if (index === -1) return {};
    const updated = [...state.products];
    updated.splice(index, 1);
    return { products: updated };
  }),
  addProduct: (prod) => set((state) => ({ products: [prod, ...state.products] })),
}));