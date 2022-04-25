/* eslint-disable no-underscore-dangle */
import { Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import Product from '../components/Product';
import { getProducts } from '../services/productService';
import CenterSpinner from '../components/commons/CenterSpinner';
import ProductForm from '../components/ProductForm';

const Products = () => {
  const [product, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const response = await getProducts();
    setProducts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const makeCard = (prod: Product) => (
    <Grid item xs={12} sm={3} key={prod.id}>
      <Product
        id={prod.id}
        avatarUrl={prod.avatarUrl}
        name={prod.name}
        description={prod.description}
        imageUrl={prod.imageUrl}
        price={prod.price}
      />
    </Grid>
  );

  if (loading) return <CenterSpinner />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton color="primary" onClick={() => setOpen(true)}>
          <Typography component="h2" variant="h6" color="inherit">
            ADD PRODUCT
          </Typography>
          <AddIcon />
        </IconButton>
      </Grid>
      {product.map(prod => makeCard(prod))}
      <ProductForm open={open} setOpen={setOpen} fetch={fetch} />
    </Grid>
  );
};

export default Products;
