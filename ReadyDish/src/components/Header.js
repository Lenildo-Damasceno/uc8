import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usarCarrinho } from '../context/CartContext';

export default function Cabecalho({ aoPressionarCarrinho }) {
  const { quantidadeItens } = usarCarrinho();
  return (
    <View style={styles.header}>
      <View><Text style={styles.brand}>ReadyDish</Text><Text style={styles.subtitle}>Pronto para matar a fome</Text></View>
      <Pressable style={styles.cart} onPress={aoPressionarCarrinho} accessibilityLabel="Abrir carrinho">
        <Text style={styles.icon}>🛒</Text>
        {quantidadeItens > 0 && <Text style={styles.badge}>{quantidadeItens}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F2E8DC' },
  brand: { color: '#D94F30', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#75675D', fontSize: 12, marginTop: 2 },
  cart: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#FFF0E7', alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 21 },
  badge: { position: 'absolute', top: -3, right: -2, backgroundColor: '#D94F30', color: '#FFF', minWidth: 20, height: 20, borderRadius: 10, textAlign: 'center', fontSize: 12, fontWeight: '700', lineHeight: 20 },
});
