import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return <View style={styles.card}>
    <View style={styles.image}><Text style={styles.emoji}>{product.emoji}</Text></View>
    <View style={styles.info}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
      <View style={styles.footer}><Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <Pressable style={styles.button} onPress={() => addItem(product)}><Text style={styles.buttonText}>Adicionar</Text></Pressable>
      </View>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', borderRadius: 18, marginBottom: 14, overflow: 'hidden', flexDirection: 'row', borderWidth: 1, borderColor: '#F1E6DA' },
  image: { width: 100, backgroundColor: '#FFF0E7', alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 45 }, info: { flex: 1, padding: 14 },
  name: { color: '#312923', fontSize: 16, fontWeight: '700' },
  description: { color: '#75675D', fontSize: 12, lineHeight: 17, marginTop: 4 },
  footer: { marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { color: '#D94F30', fontSize: 15, fontWeight: '800' },
  button: { backgroundColor: '#D94F30', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 12 },
});
