import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from './src/context/CartContext';
import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import CartScreen from './src/screens/CartScreen';

export default function App() {
  const [page, setPage] = useState('inicio');

  return (
    <SafeAreaProvider>
      <CartProvider>
        <SafeAreaView style={styles.app} edges={['top', 'bottom']}>
          <StatusBar style="dark" backgroundColor="#FFF" />
          <Header onCartPress={() => setPage('carrinho')} />
          <View style={styles.content}>
            {page === 'inicio' && <HomeScreen onSeeMenu={() => setPage('cardapio')} />}
            {page === 'cardapio' && <MenuScreen />}
            {page === 'carrinho' && <CartScreen onContinue={() => setPage('cardapio')} />}
          </View>
          <BottomNav currentPage={page} onChange={setPage} />
        </SafeAreaView>
      </CartProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#FFF9F2' },
  content: { flex: 1 },
});
