import {
    Card, CardContent, CardMedia, Typography, IconButton,
    CardActions, Button, Tooltip, Rating, Box
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import type { Product } from "../api/productsAPI";
  
  interface Props {
    product: Product;
    onDelete: (id: number) => void;
  }
  
  export const ProductCard: React.FC<Props> = ({ product, onDelete }) => (
    <Card sx={{ minWidth: 280, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: 2, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="180"
        sx={{ objectFit: product.isPlaceholder ? "fill" : "contain", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Tooltip title={product.title} placement="top">
          <Typography gutterBottom variant="h6" noWrap>{product.title}</Typography>
        </Tooltip>
        <Typography variant="body2" color="text.secondary">Price: ${product.price}</Typography>
        <Typography variant="body2" color="text.secondary">Stock: {product.stock}</Typography>
        <Box display="flex" alignItems="center">
          <Rating value={product.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" ml={1}>({product.rating})</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        <Button size="small">Details</Button>
        <Tooltip title="Remove from list">
          <IconButton color="error" onClick={() => onDelete(product.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );