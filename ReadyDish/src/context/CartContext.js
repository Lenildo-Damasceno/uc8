import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = '@readydish:cart';
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadCart() {
      try {
        const savedCart = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedCart) setItems(JSON.parse(savedCart));
      } catch (error) {
        console.warn('Não foi possível carregar o carrinho.', error);
      } finally {
        setIsReady(true);
      }
    }
    loadCart();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch((error) =>
      console.warn('Não foi possível salvar o carrinho.', error)
    );
  }, [items, isReady]);

  function addItem(product) {
    setItems((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setItems((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }

  function clearCart() { setItems([]); }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const value = useMemo(() => ({ items, addItem, changeQuantity, clearCart, itemCount, total, isReady }), [items, itemCount, total, isReady]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider');
  return context;
}
