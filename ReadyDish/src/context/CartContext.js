import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CHAVE_ARMAZENAMENTO = '@readydish:cart';
const ContextoCarrinho = createContext(null);

export function ProvedorCarrinho({ children }) {
  const [itens, definirItens] = useState([]);
  const [estaPronto, definirEstaPronto] = useState(false);

  useEffect(() => {
    async function carregarCarrinho() {
      try {
        const carrinhoSalvo = await AsyncStorage.getItem(CHAVE_ARMAZENAMENTO);
        if (carrinhoSalvo) {
          const itensSalvos = JSON.parse(carrinhoSalvo);
          definirItens(itensSalvos.map((item) => ({
            id: item.id,
            nome: item.nome ?? item.name,
            descricao: item.descricao ?? item.description,
            preco: item.preco ?? item.price,
            categoria: item.categoria ?? item.category,
            emoji: item.emoji,
            destaque: item.destaque ?? item.featured,
            quantidade: item.quantidade ?? item.quantity,
          })));
        }
      } catch (erro) {
        console.warn('Não foi possível carregar o carrinho.', erro);
      } finally {
        definirEstaPronto(true);
      }
    }
    carregarCarrinho();
  }, []);

  useEffect(() => {
    if (!estaPronto) return;
    AsyncStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(itens)).catch((erro) =>
      console.warn('Não foi possível salvar o carrinho.', erro)
    );
  }, [itens, estaPronto]);

  function adicionarItem(produto) {
    definirItens((itensAtuais) => {
      const produtoExiste = itensAtuais.find((item) => item.id === produto.id);
      if (produtoExiste) return itensAtuais.map((item) => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item);
      return [...itensAtuais, { ...produto, quantidade: 1 }];
    });
  }

  function alterarQuantidade(id, valor) {
    definirItens((itensAtuais) => itensAtuais
      .map((item) => item.id === id ? { ...item, quantidade: item.quantidade + valor } : item)
      .filter((item) => item.quantidade > 0));
  }

  function limparCarrinho() { definirItens([]); }

  const quantidadeItens = itens.reduce((soma, item) => soma + item.quantidade, 0);
  const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  const valorContexto = useMemo(() => ({ itens, adicionarItem, alterarQuantidade, limparCarrinho, quantidadeItens, total, estaPronto }), [itens, quantidadeItens, total, estaPronto]);

  return <ContextoCarrinho.Provider value={valorContexto}>{children}</ContextoCarrinho.Provider>;
}

export function usarCarrinho() {
  const contexto = useContext(ContextoCarrinho);
  if (!contexto) throw new Error('usarCarrinho deve ser usado dentro de ProvedorCarrinho');
  return contexto;
}
