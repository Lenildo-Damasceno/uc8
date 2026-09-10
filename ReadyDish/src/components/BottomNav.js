import { Pressable, StyleSheet, Text, View } from 'react-native';

const links = [
  { id: 'inicio', label: 'Início', icon: '🏠' },
  { id: 'cardapio', label: 'Cardápio', icon: '🍴' },
  { id: 'carrinho', label: 'Carrinho', icon: '🛒' },
];

export default function BottomNav({ currentPage, onChange }) {
  return <View style={styles.nav}>{links.map((link) => {
    const active = currentPage === link.id;
    return <Pressable key={link.id} style={styles.link} onPress={() => onChange(link.id)}>
      <Text style={[styles.icon, active && styles.active]}>{link.icon}</Text>
      <Text style={[styles.label, active && styles.active]}>{link.label}</Text>
    </Pressable>;
  })}</View>;
}

const styles = StyleSheet.create({
  nav: { flexDirection: 'row', backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#F2E8DC', paddingVertical: 8 },
  link: { flex: 1, alignItems: 'center', gap: 2 },
  icon: { fontSize: 20, opacity: 0.55 },
  label: { fontSize: 12, color: '#75675D' },
  active: { color: '#D94F30', opacity: 1, fontWeight: '700' },
});
