import { Link, useNavigate } from 'react-router-dom';
import Tag from './Tag';
import UserItemSmall from './UserItemSmall';
import { toRelativeDateString, truncate } from '../common/formatHelpers';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import placeholderImage from '../assets/productpictures/placeholder.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { grey } from '@mui/material/colors';



function PostItemSmall({ post }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, mb: 4 }}>
    <CardHeader
      title={
        <Typography variant="h5">
          <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {post.title}
          </Link>
        </Typography>
      }
    />
    <CardMedia
      sx={{ height: 140 }}
      image={post.imageUrl || placeholderImage}
      alt={`Bild till ${post.title}`}
    />
    <CardContent>
      <Box mb={2}>
        {post.tags && post.tags.length > 0 && post.tags.map((tag) => <Tag key={tag} text={tag} />)}
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {truncate(post.body, 100)}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        onClick={() => navigate(`/posts/${post.id}`)}
        endIcon={<ChevronRightIcon />}
      >
        Läs mer
      </Button>
    </CardActions>
  </Card>
    
  );
}

export default PostItemSmall;
