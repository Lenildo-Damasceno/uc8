import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ProvedorCarrinho } from './src/context/CartContext';
import Cabecalho from './src/components/Header';
import NavegacaoInferior from './src/components/BottomNav';
import TelaInicio from './src/screens/HomeScreen';
import TelaCardapio from './src/screens/MenuScreen';
import TelaCarrinho from './src/screens/CartScreen';

export default function Aplicativo() {
  const [pagina, definirPagina] = useState('inicio');

  return (
    <SafeAreaProvider>
      <ProvedorCarrinho>
        <SafeAreaView style={styles.app} edges={['top', 'bottom']}>
          <StatusBar style="dark" backgroundColor="#FFF" />
          <Cabecalho aoPressionarCarrinho={() => definirPagina('carrinho')} />
          <View style={styles.content}>
            {pagina === 'inicio' && <TelaInicio aoVerCardapio={() => definirPagina('cardapio')} />}
            {pagina === 'cardapio' && <TelaCardapio />}
            {pagina === 'carrinho' && <TelaCarrinho aoContinuar={() => definirPagina('cardapio')} />}
          </View>
          <NavegacaoInferior paginaAtual={pagina} aoMudar={definirPagina} />
        </SafeAreaView>
      </ProvedorCarrinho>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#FFF9F2' },
  content: { flex: 1 },
});
