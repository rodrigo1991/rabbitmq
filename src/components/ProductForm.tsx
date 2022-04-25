/* eslint-disable no-undef */
import { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

import { postProduct, postMq } from '../services/productService';

interface ProductFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  fetch: () => void;
}
const ProductForm: FC<ProductFormProps> = ({ open, setOpen, fetch }) => {
  const submitAssetProposal = async (e: any) => {
    e.preventDefault();
    const product: Product = {
      id: Math.round(Math.random() * 999999999),
      name: e.target.elements.name.value,
      categories: e.target.elements.categories.value,
      price: parseInt(e.target.elements.price.value, 10),
      description: e.target.elements.description.value,
      avatarUrl: e.target.elements.avatarUrl.value,
      imageUrl: e.target.elements.imageUrl.value,
    };
    console.log('Submit', product);
    const created = await postProduct(product);
    if (created.status === 201) {
      postMq(product);
      setOpen(false);
      fetch();
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>Create Product</DialogTitle>

      <form onSubmit={submitAssetProposal}>
        <DialogContent>
          <DialogContentText sx={{ display: 'flex' }} />
          <TextField name="name" label="Name" fullWidth variant="standard" />
          <TextField
            name="categories"
            label="Categories"
            fullWidth
            variant="standard"
          />
          <TextField
            type="number"
            name="price"
            label="Price"
            fullWidth
            variant="standard"
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            variant="standard"
          />

          <TextField
            name="avatarUrl"
            label="AvatarUrl"
            fullWidth
            variant="standard"
          />

          <TextField
            name="imageUrl"
            label="ImageUrl"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductForm;
