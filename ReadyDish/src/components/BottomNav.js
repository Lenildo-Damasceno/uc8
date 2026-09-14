import { Pressable, StyleSheet, Text, View } from 'react-native';

const linksNavegacao = [
  { id: 'inicio', label: 'Início', icon: '🏠' },
  { id: 'cardapio', label: 'Cardápio', icon: '🍴' },
  { id: 'carrinho', label: 'Carrinho', icon: '🛒' },
];

export default function NavegacaoInferior({ paginaAtual, aoMudar }) {
  return <View style={styles.nav}>{linksNavegacao.map((link) => {
    const estaAtivo = paginaAtual === link.id;
    return <Pressable key={link.id} style={styles.link} onPress={() => aoMudar(link.id)}>
      <Text style={[styles.icon, estaAtivo && styles.active]}>{link.icon}</Text>
      <Text style={[styles.label, estaAtivo && styles.active]}>{link.label}</Text>
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
