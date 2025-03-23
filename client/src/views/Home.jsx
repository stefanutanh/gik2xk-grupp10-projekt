import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';
import TagList from '../components/TagList';
import CartView from '../components/CartView';
import { 
  Alert, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Divider,
  Container,
  Card,
  CardContent
} from '@mui/material';
import { useState } from 'react';

function Home() {
  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);

  function clearMessage() {
    window.history.replaceState({}, '');
  }
  
  return (
    <Container maxWidth="xl">
      {message && open && (
        <Alert
          onClose={() => {
            setOpen(false);
            clearMessage();
          }}
          variant="filled"
          severity="success"
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}
      
      <Grid container spacing={4}>
        {/* Products Section */}
        <Grid component="section" item xs={12} md={8}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 2,
              background: (theme) => `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                color: 'white', 
                mb: 1,
                textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
              }}
            >
              Våra produkter
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'white',
                mb: 2,
                opacity: 0.9
              }}
            >
              Utforska vårt sortiment med högkvalitativa produkter till ockerpriser!
            </Typography>
          </Paper>
          
          <Card sx={{ p: 2, borderRadius: 2 }}>
            <CardContent>
              <ProductList />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Sidebar - Cart and Tags */}
        <Grid component="section" item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 2,
              background: (theme) => `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                color: 'white', 
                mb: 0,
                fontSize: '1.8rem',
                textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
              }}
            >
              Din varukorg
            </Typography>
          </Paper>
          
          <Card sx={{ mb: 4, borderRadius: 2, overflow: 'visible' }}>
            <CardContent>
              <CartView />
            </CardContent>
          </Card>
          
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 2,
              background: (theme) => `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                color: 'white', 
                mb: 0,
                fontSize: '1.8rem',
                textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
              }}
            >
              Kategorier
            </Typography>
          </Paper>
          
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <TagList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;