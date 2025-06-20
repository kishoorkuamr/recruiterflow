export interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  stock: number;
  rating: number;
  isPlaceholder?: boolean; 
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export const fetchProducts = async (skip = 0, limit = 20): Promise<ProductsResponse> => {
  const res = await fetch(`https://dummyjson.com/products/search?q=&skip=${skip}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};