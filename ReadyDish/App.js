import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ProvedorCarrinho } from './src/context/CartContext';
import Cabecalho from './src/components/Header';
import NavegacaoInferior from './src/components/BottomNav';
import TelaInicio from './src/screens/HomeScreen';
import TelaCardapio from './src/screens/MenuScreen';
import TelaCarrinho from './src/screens/CartScreen';
import GerenciarPratos from './src/screens/GerenciarPratos';
import { abrirDB, visualizarTabelas } from './src/database/database';
import { listarPratos } from './src/repository/RepoPrato';

export default function Aplicativo() {
  const [pagina, definirPagina] = useState('inicio');
  // Guarda temporariamente na tela o resultado da consulta; o banco e a fonte dos dados.
  const [produtos, definirProdutos] = useState([]);

  // Le os pratos persistidos e atualiza o cardapio exibido.
  async function carregarProdutos() {
    const pratos = await listarPratos();
    definirProdutos(pratos);
  }

  useEffect(() => {
    async function inicializarBanco() {
      try {
        // Abre o SQLite, cria as tabelas se necessario e carrega os pratos.
        const db = await abrirDB();
        await visualizarTabelas(db);
        await carregarProdutos();
      } catch (erro) {
        console.error('Erro ao abrir o banco de dados:', erro);
      }
    }

    inicializarBanco();
  }, []);

  return (
    <SafeAreaProvider>
      <ProvedorCarrinho>
        <SafeAreaView style={styles.app} edges={['top', 'bottom']}>
          <StatusBar style="dark" backgroundColor="#FFF" />
          <Cabecalho
            aoPressionarCarrinho={() => definirPagina('carrinho')}
            aoPressionarGerenciar={() => definirPagina('gerenciar')}
          />
          <View style={styles.content}>
            {pagina === 'inicio' && <TelaInicio aoVerCardapio={() => definirPagina('cardapio')} produtos={produtos} />}
            {pagina === 'cardapio' && <TelaCardapio produtos={produtos} />}
            {pagina === 'carrinho' && <TelaCarrinho aoContinuar={() => definirPagina('cardapio')} />}
            {pagina === 'gerenciar' && (
              <GerenciarPratos
                aoVoltar={() => definirPagina('inicio')}
                aoAtualizarCardapio={(pratosAtualizados) => definirProdutos(pratosAtualizados)}
              />
            )}
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
