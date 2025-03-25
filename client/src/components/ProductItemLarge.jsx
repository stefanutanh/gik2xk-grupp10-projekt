import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography
} from '@mui/material';
import Tag from './Tag';
import placeholderImage from '../assets/productpictures/placeholder.png';

function ProductItemLarge({ post }) {
  return (
    <Paper sx={{ my: 4, p: 4, borderRadius: 2 }} elevation={3}>
      <Box>
        <Typography variant="h2">{post.title}</Typography>
       
      </Box>
      <Card elevation={0}>
        <CardMedia component="img" image={post.imageUrl || placeholderImage} />
        <CardContent>
          {post.tags &&
            post.tags.map((tag) => <Tag key={`tag_${tag}`} text={tag} />)}
          <Typography variant="body2">{post.body}</Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default ProductItemLarge;
