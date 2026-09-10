import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function HomeScreen({ onSeeMenu }) {
  return <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
    <View style={styles.hero}>
      <Text style={styles.eyebrow}>ENTREGA RÁPIDA</Text>
      <Text style={styles.title}>Comida gostosa,{`\n`}sem perder tempo.</Text>
      <Text style={styles.copy}>Escolha seu prato pronto e receba quentinho.</Text>
      <Pressable style={styles.heroButton} onPress={onSeeMenu}><Text style={styles.heroButtonText}>Ver cardápio  →</Text></Pressable>
    </View>
    <Text style={styles.sectionTitle}>Favoritos da casa</Text>
    {products.filter((product) => product.featured).map((product) => <ProductCard key={product.id} product={product} />)}
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 30 }, hero: { backgroundColor: '#25352D', borderRadius: 24, padding: 24, marginBottom: 26 },
  eyebrow: { color: '#F2B36D', fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
  title: { color: '#FFF', fontSize: 29, lineHeight: 36, fontWeight: '800', marginTop: 8 },
  copy: { color: '#D6DED9', marginTop: 10, lineHeight: 20 },
  heroButton: { alignSelf: 'flex-start', backgroundColor: '#D94F30', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12, marginTop: 20 },
  heroButtonText: { color: '#FFF', fontWeight: '700' },
  sectionTitle: { fontSize: 21, color: '#312923', fontWeight: '800', marginBottom: 14 },
});
