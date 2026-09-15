import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usarCarrinho } from '../context/CartContext';
import { formatarMoeda } from '../utils/currency';

export default function TelaCarrinho({ aoContinuar }) {
  const { itens, alterarQuantidade, limparCarrinho, total } = usarCarrinho();
  if (!itens.length) return <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>🛒</Text><Text style={styles.title}>Seu carrinho está vazio</Text>
    <Text style={styles.emptyText}>Adicione uma refeição deliciosa para continuar.</Text>
    <Pressable style={styles.primaryButton} onPress={aoContinuar}><Text style={styles.primaryText}>Ver cardápio</Text></Pressable>
  </View>;

  return <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.heading}><Text style={styles.title}>Seu pedido</Text><Pressable onPress={limparCarrinho}><Text style={styles.clear}>Limpar</Text></Pressable></View>
    {itens.map((itemCarrinho) => <View key={itemCarrinho.id} style={styles.item}>
      <Text style={styles.emoji}>{itemCarrinho.emoji}</Text><View style={styles.itemInfo}><Text style={styles.itemName}>{itemCarrinho.nome}</Text><Text style={styles.price}>{formatarMoeda(itemCarrinho.preco * itemCarrinho.quantidade)}</Text></View>
      <View style={styles.counter}><Pressable style={styles.counterButton} onPress={() => alterarQuantidade(itemCarrinho.id, -1)}><Text style={styles.counterText}>−</Text></Pressable>
        <Text style={styles.quantity}>{itemCarrinho.quantidade}</Text><Pressable style={styles.counterButton} onPress={() => alterarQuantidade(itemCarrinho.id, 1)}><Text style={styles.counterText}>+</Text></Pressable>
      </View>
    </View>)}
    <View style={styles.summary}>
      <View style={styles.summaryLine}><Text style={styles.muted}>Subtotal</Text><Text>{formatarMoeda(total)}</Text></View>
      <View style={styles.summaryLine}><Text style={styles.muted}>Entrega</Text><Text style={styles.free}>Grátis</Text></View>
      <View style={styles.summaryLine}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>{formatarMoeda(total)}</Text>
      </View>
    </View>
    <Pressable style={styles.primaryButton}><Text style={styles.primaryText}>Finalizar pedido</Text></Pressable>
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 30 }, emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  emptyIcon: { fontSize: 60, marginBottom: 16 }, emptyText: { textAlign: 'center', color: '#75675D', marginTop: 8, marginBottom: 22 },
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, title: { color: '#312923', fontSize: 25, fontWeight: '800' }, clear: { color: '#D94F30', fontWeight: '700' },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 14, borderRadius: 16, marginBottom: 10, borderWidth: 1, borderColor: '#F1E6DA' },
  emoji: { fontSize: 34, marginRight: 12 }, itemInfo: { flex: 1 }, itemName: { color: '#312923', fontWeight: '700', marginBottom: 4 }, price: { color: '#D94F30', fontWeight: '700' },
  counter: { flexDirection: 'row', alignItems: 'center', gap: 8 }, counterButton: { width: 30, height: 30, backgroundColor: '#FFF0E7', borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  counterText: { color: '#D94F30', fontSize: 19, fontWeight: '700' }, quantity: { minWidth: 18, textAlign: 'center', fontWeight: '700' },
  summary: { backgroundColor: '#FFF', padding: 18, borderRadius: 16, marginTop: 12, gap: 12 }, summaryLine: { flexDirection: 'row', justifyContent: 'space-between' },
  muted: { color: '#75675D' }, free: { color: '#298A57', fontWeight: '700' }, totalLabel: { fontSize: 18, fontWeight: '800' }, total: { color: '#D94F30', fontSize: 18, fontWeight: '800' },
  primaryButton: { backgroundColor: '#D94F30', paddingVertical: 15, paddingHorizontal: 24, borderRadius: 14, alignItems: 'center', marginTop: 18 }, primaryText: { color: '#FFF', fontWeight: '800', fontSize: 15 },
});
