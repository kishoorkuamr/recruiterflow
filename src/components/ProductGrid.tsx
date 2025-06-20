import { useEffect, useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useProductsStore } from "../store/useProductsStore";
import { ProductCard } from "./ProductCard";
import { fetchProducts } from "../api/productsAPI";
import { motion, AnimatePresence } from "framer-motion";
import placholderSvg from "../assets/placeholder.svg";

const LIMIT = 20;

export const ProductGrid = () => {
  const { products, deleteProduct, addProduct, setProducts, total } = useProductsStore();
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const loadMore = async () => {
    if (loading || products.length >= total) return;
    setLoading(true);
    const { products: more, total: newTotal } = await fetchProducts(skip, LIMIT);
    setProducts([...products, ...more], newTotal);
    setSkip(skip + LIMIT);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(0, LIMIT).then(({ products, total }) => {
      setProducts(products, total);
      setSkip(LIMIT);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore();
    });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loader.current, skip, products]);

  const handleAdd = () => {
    const id = Date.now();
    addProduct({
      id,
      thumbnail: placholderSvg,
      title: `New Product #${id}`,
      price: 0,
      stock: 0,
      rating: 0,
      isPlaceholder: true,
    });
  };

  return (
    <Box sx={{ px: 4, py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Product List</Typography>
        <Button variant="contained" onClick={handleAdd}>Add Product</Button>
      </Box>

      <Box
        component={motion.div}
        layout
        sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-start" }}
      >
        <AnimatePresence>
          {Array.isArray(products) && products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              style={{ width: 300 }}
            >
              <ProductCard product={product} onDelete={deleteProduct} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {products.length < total && (
        <Box ref={loader} sx={{ textAlign: 'center', py: 4 }}>
          <Typography>Loading more...</Typography>
        </Box>
      )}
    </Box>
  );
};