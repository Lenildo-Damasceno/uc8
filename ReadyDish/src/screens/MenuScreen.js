import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';

export default function MenuScreen() {
  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => products.filter((product) =>
    (category === 'Todos' || product.category === category) && product.name.toLowerCase().includes(search.trim().toLowerCase())
  ), [category, search]);

  return <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Text style={styles.title}>Nosso cardápio</Text>
    <TextInput style={styles.search} value={search} onChangeText={setSearch} placeholder="Buscar pratos e bebidas..." placeholderTextColor="#9B8D83" />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
      {categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}>
        <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
      </Pressable>)}
    </ScrollView>
    <View>{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</View>
    {!filtered.length && <Text style={styles.empty}>Nenhum item encontrado.</Text>}
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 30 }, title: { color: '#312923', fontSize: 26, fontWeight: '800', marginBottom: 14 },
  search: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EADFD4', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13, color: '#312923' },
  categories: { gap: 8, paddingVertical: 14 }, chip: { borderWidth: 1, borderColor: '#DDCFC3', paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20 },
  chipActive: { backgroundColor: '#25352D', borderColor: '#25352D' }, chipText: { color: '#75675D', fontWeight: '600' },
  chipTextActive: { color: '#FFF' }, empty: { textAlign: 'center', color: '#75675D', marginTop: 40 },
});
