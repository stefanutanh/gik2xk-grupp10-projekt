import { Link, Outlet } from 'react-router-dom';
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
  useTheme
} from '@mui/material';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TagIcon from '@mui/icons-material/LocalOffer';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Hem', icon: <HomeIcon />, path: '/' },
    { text: 'Skapa produkt', icon: <AddCircleIcon />, path: '/posts/new' },
    { text: 'Kategorier', icon: <TagIcon />, path: '/' }
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
              sx={{ 
                ml: 2,
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        {drawer}
      </Box>
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
            © {new Date().getFullYear()} Webbshopen - Alla rättigheter reserverade
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default App;