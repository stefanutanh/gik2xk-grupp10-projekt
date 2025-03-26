import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Popover
} from '@mui/material';
import { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CartView from './components/CartView';
import { getAll } from './services/CartService';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Ladda antal varor i varukorgen
  useEffect(() => {
    loadCartCount();
    
    // Lägg till en timer för att uppdatera varukorgen med jämna mellanrum
    const intervalId = setInterval(loadCartCount, 30000); // Var 30:e sekund
    
    return () => clearInterval(intervalId); // Rensa timern när komponenten avmonteras
  }, []);

  const loadCartCount = async () => {
    try {
      const items = await getAll();
      if (items && Array.isArray(items)) {
        setCartItemCount(items.length);
      }
    } catch (err) {
      console.error("Fel vid hämtning av varukorg:", err);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCartClick = (event) => {
    setCartAnchorEl(event.currentTarget);
    loadCartCount(); // Uppdatera räknaren när varukorgen öppnas
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const openCartPage = () => {
    handleCartClose();
    navigate('/checkout');
  };

  const cartOpen = Boolean(cartAnchorEl);
  const cartId = cartOpen ? 'cart-popover' : undefined;

  const navItems = [
    { text: 'Hem', icon: <HomeIcon />, path: '/' },
    { text: 'Skapa produkt', icon: <AddCircleIcon />, path: '/products/new' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button onClick={handleCartClick}>
            <ListItemIcon>
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Varukorg" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );

  return (
    <>
      <Box component="header" sx={{ flexGrow: 1 }}>
        <AppBar 
          position="static" 
          elevation={3}
          sx={{
            background: (theme) => `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Typography 
              variant="h1" 
              component="div" 
              sx={{ 
                flexGrow: isMobile ? 0 : 1,
                fontSize: isMobile ? '2rem' : '3rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Grupp 10's webbshopp
              </Link>
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button 
                  key={item.text} 
                  color="inherit" 
                  component={Link} 
                  to={item.path}
                  startIcon={item.icon}
                  sx={{ 
                    mx: 1, 
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease'
                    },
                    borderRadius: '8px',
                    padding: '8px 16px',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* Shopping Cart Icon */}
            <IconButton 
              color="inherit" 
              aria-label="shopping cart"
              aria-describedby={cartId}
              onClick={handleCartClick}
              sx={{ 
                ml: 2,
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        {drawer}
      </Box>
      
      {/* Cart Popover */}
      <Popover
        id={cartId}
        open={cartOpen}
        anchorEl={cartAnchorEl}
        onClose={handleCartClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ width: 400, maxWidth: '100vw', p: 2 }}>
          <CartView />
        </Box>
      </Popover>
      
      <Container 
        sx={{ 
          mt: 4, 
          mb: 8,
          minHeight: 'calc(100vh - 200px)' 
        }} 
        maxWidth="xl" 
        component="main"
      >
        <Outlet />
      </Container>

      {/* Basic Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          bgcolor: 'primary.dark', 
          color: 'white',
          textAlign: 'center',
          mt: 'auto'
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2">
            © {new Date().getFullYear()} Webbshopen - Tillverkad av 97 % återanvända pixlar
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default App;