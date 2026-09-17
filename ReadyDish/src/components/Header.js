import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { usarCarrinho } from '../context/CartContext';

export default function Cabecalho({ aoPressionarCarrinho, aoPressionarGerenciar }) {
  const { quantidadeItens } = usarCarrinho();
  return (
    <View style={styles.header}>
      <View style={styles.brandBox}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" accessibilityLabel="Logo ReadyDish" />
        <Text style={styles.subtitle}>Pronto para matar a fome</Text>
      </View>
      <View style={styles.actions}>
        {aoPressionarGerenciar && (
          <Pressable style={styles.manage} onPress={aoPressionarGerenciar} accessibilityLabel="Abrir gerenciamento de pratos">
            <Text style={styles.manageText}>Gerenciar</Text>
          </Pressable>
        )}
        <Pressable style={styles.cart} onPress={aoPressionarCarrinho} accessibilityLabel="Abrir carrinho">
          <Text style={styles.icon}>🛒</Text>
          {quantidadeItens > 0 && <Text style={styles.badge}>{quantidadeItens}</Text>}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F2E8DC' },
  brandBox: { flex: 1, paddingRight: 10 },
  logo: { width: 118, height: 34 },
  subtitle: { color: '#75675D', fontSize: 12, marginTop: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  manage: { paddingHorizontal: 12, height: 36, borderRadius: 18, backgroundColor: '#25352D', alignItems: 'center', justifyContent: 'center' },
  manageText: { color: '#FFF', fontSize: 12, fontWeight: '800' },
  cart: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#FFF0E7', alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 21 },
  badge: { position: 'absolute', top: -3, right: -2, backgroundColor: '#D94F30', color: '#FFF', minWidth: 20, height: 20, borderRadius: 10, textAlign: 'center', fontSize: 12, fontWeight: '700', lineHeight: 20 },
});
