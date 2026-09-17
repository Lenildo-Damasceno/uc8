import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import CartaoProduto from '../components/ProductCard';

export default function TelaCardapio({ produtos = [] }) {
  const [categoria, definirCategoria] = useState('Todos');
  const [busca, definirBusca] = useState('');
  const categorias = useMemo(() => ['Todos', ...new Set(produtos.map((produto) => produto.categoria))], [produtos]);
  const produtosFiltrados = useMemo(() => produtos.filter((produto) =>
    (categoria === 'Todos' || produto.categoria === categoria) && produto.nome.toLowerCase().includes(busca.trim().toLowerCase())
  ), [categoria, busca, produtos]);

  return <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Text style={styles.title}>Nosso cardápio</Text>
    <TextInput style={styles.search} value={busca} onChangeText={definirBusca} placeholder="Buscar pratos e bebidas..." placeholderTextColor="#9B8D83" />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
      {categorias.map((categoriaDisponivel) => <Pressable key={categoriaDisponivel} onPress={() => definirCategoria(categoriaDisponivel)} style={[styles.chip, categoria === categoriaDisponivel && styles.chipActive]}>
        <Text style={[styles.chipText, categoria === categoriaDisponivel && styles.chipTextActive]}>{categoriaDisponivel}</Text>
      </Pressable>)}
    </ScrollView>
    <View>{produtosFiltrados.map((produto) => <CartaoProduto key={produto.id} produto={produto} />)}</View>
    {!produtosFiltrados.length && <Text style={styles.empty}>Nenhum item encontrado.</Text>}
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 30 }, title: { color: '#312923', fontSize: 26, fontWeight: '800', marginBottom: 14 },
  search: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EADFD4', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13, color: '#312923' },
  categories: { gap: 8, paddingVertical: 14 }, chip: { borderWidth: 1, borderColor: '#DDCFC3', paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20 },
  chipActive: { backgroundColor: '#25352D', borderColor: '#25352D' }, chipText: { color: '#75675D', fontWeight: '600' },
  chipTextActive: { color: '#FFF' }, empty: { textAlign: 'center', color: '#75675D', marginTop: 40 },
});
