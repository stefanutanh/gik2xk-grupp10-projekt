import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getAll, removeFromCart, updateCartItem, clearCart } from '../services/CartService';

function CartView() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Ladda varukorgen vid komponentmontering
  useEffect(() => {
    loadCart();
  }, []);

  // Funktion för att ladda varukorgen
  const loadCart = () => {
    getAll().then((items) => {
      setCartItems(items || []);
      calculateTotal(items);
    });
  };

  // Beräkna totalt pris
  const calculateTotal = (items) => {
    if (items && items.length > 0) {
      const sum = items.reduce((total, item) => {
        return total + (item.product.price * item.amount);
      }, 0);
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  };

  // Hantera uppdatering av antal
  const handleUpdateAmount = (cartRowId, currentAmount, change) => {
    const newAmount = currentAmount + change;
    if (newAmount <= 0) {
      // Om mängden blir 0 eller mindre, ta bort produkten
      handleRemoveItem(cartRowId);
    } else {
      updateCartItem(cartRowId, newAmount).then(() => {
        loadCart();
      });
    }
  };

  // Hantera borttagning av en produkt
  const handleRemoveItem = (cartRowId) => {
    removeFromCart(cartRowId).then(() => {
      loadCart();
    });
  };

  // Hantera tömning av varukorgen
  const handleClearCart = () => {
    // Här antar vi att varukorgs-ID finns i den första artikeln
    if (cartItems.length > 0) {
      const cartId = cartItems[0].cartId;
      clearCart(cartId).then(() => {
        setCartItems([]);
        setTotalPrice(0);
      });
    }
  };

  // Om inga produkter i varukorgen
  if (cartItems.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Din varukorg är tom</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <List>
        {cartItems.map((item) => (
          <Box key={`cart_item_${item.id}`}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => handleRemoveItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.product.title}
                secondary={`${item.product.price} kr/st`}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <IconButton size="small" onClick={() => handleUpdateAmount(item.id, item.amount, -1)}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{item.amount}</Typography>
                <IconButton size="small" onClick={() => handleUpdateAmount(item.id, item.amount, 1)}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body1" sx={{ minWidth: '80px', textAlign: 'right' }}>
                {item.amount * item.product.price} kr
              </Typography>
            </ListItem>
            <Divider />
          </Box>
        ))}
        <ListItem>
          <ListItemText primary="Totalt:" />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {totalPrice} kr
          </Typography>
        </ListItem>
      </List>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={handleClearCart}>Töm varukorg</Button>
        <Button variant="contained" color="primary">Till kassan</Button>
      </Box>
    </Box>
  );
}

export default CartView;