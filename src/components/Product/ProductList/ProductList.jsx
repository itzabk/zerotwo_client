// @mui
import { Grid } from "@mui/material";
import ShopProductCard from "./ProductCard";

// ----------------------------------------------------------------------//

export default function ProductList({ products, ...other }) {
  return (
    <>
      <Grid container spacing={3} {...other}>
        {products?.ids?.map((product) => (
          <Grid key={product} item xs={12} sm={6} md={3}>
            <ShopProductCard product={products.entities[product]} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
