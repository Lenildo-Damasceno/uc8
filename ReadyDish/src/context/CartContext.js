import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CHAVE_ARMAZENAMENTO = '@readydish:cart';
const ContextoCarrinho = createContext(null);

export function ProvedorCarrinho({ children: filhos }) {
  const [itens, definirItens] = useState([]);
  const [estaPronto, definirEstaPronto] = useState(false);

  useEffect(() => {
    async function carregarCarrinho() {
      try {
        const carrinhoSalvo = await AsyncStorage.getItem(CHAVE_ARMAZENAMENTO);
        if (carrinhoSalvo) {
          const itensSalvos = JSON.parse(carrinhoSalvo);
          definirItens(itensSalvos.map((itemSalvo) => ({
            id: itemSalvo.id,
            nome: itemSalvo.nome ?? itemSalvo.name,
            descricao: itemSalvo.descricao ?? itemSalvo.description,
            preco: itemSalvo.preco ?? itemSalvo.price,
            categoria: itemSalvo.categoria ?? itemSalvo.category,
            emoji: itemSalvo.emoji,
            destaque: itemSalvo.destaque ?? itemSalvo.featured,
            quantidade: itemSalvo.quantidade ?? itemSalvo.quantity,
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
      const produtoExiste = itensAtuais.find((itemAtual) => itemAtual.id === produto.id);
      if (produtoExiste) return itensAtuais.map((itemAtual) => itemAtual.id === produto.id ? { ...itemAtual, quantidade: itemAtual.quantidade + 1 } : itemAtual);
      return [...itensAtuais, { ...produto, quantidade: 1 }];
    });
  }

  function alterarQuantidade(id, valor) {
    definirItens((itensAtuais) => itensAtuais
      .map((itemAtual) => itemAtual.id === id ? { ...itemAtual, quantidade: itemAtual.quantidade + valor } : itemAtual)
      .filter((itemAtual) => itemAtual.quantidade > 0));
  }

  function limparCarrinho() { definirItens([]); }

  const quantidadeItens = itens.reduce((soma, itemAtual) => soma + itemAtual.quantidade, 0);
  const total = itens.reduce((soma, itemAtual) => soma + itemAtual.preco * itemAtual.quantidade, 0);
  const valorContexto = useMemo(() => ({ itens, adicionarItem, alterarQuantidade, limparCarrinho, quantidadeItens, total, estaPronto }), [itens, quantidadeItens, total, estaPronto]);

  return <ContextoCarrinho.Provider value={valorContexto}>{filhos}</ContextoCarrinho.Provider>;
}

export function usarCarrinho() {
  const contexto = useContext(ContextoCarrinho);
  if (!contexto) throw new Error('usarCarrinho deve ser usado dentro de ProvedorCarrinho');
  return contexto;
}
