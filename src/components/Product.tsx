import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { FC } from 'react';

const Product: FC<Product> = ({
  avatarUrl,
  name,
  description,
  imageUrl,
  price,
}) => (
  //   const [open, setOpen] = useState(false);

  <Card>
    <CardHeader
      avatar={<Avatar src={avatarUrl} />}
      action={
        <IconButton aria-label="settings">
          <ShareIcon />
        </IconButton>
      }
      title={name}
      subheader={`${name} $${price}`}
    />
    <CardMedia style={{ height: '150px' }} image={imageUrl} />
    <CardContent>
      <Typography variant="body2" component="p">
        {description}
      </Typography>
      <h1>
        <Typography variant="body1" component="p">
          ${price}
        </Typography>
      </h1>
    </CardContent>
  </Card>
);

export default Product;
