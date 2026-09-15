import { Pressable, StyleSheet, Text, View } from 'react-native';

const linksNavegacao = [
  { identificador: 'inicio', rotulo: 'Início', icone: '🏠' },
  { identificador: 'cardapio', rotulo: 'Cardápio', icone: '🍴' },
  { identificador: 'carrinho', rotulo: 'Carrinho', icone: '🛒' },
];

export default function NavegacaoInferior({ paginaAtual, aoMudar }) {
  return <View style={styles.nav}>{linksNavegacao.map((linkNavegacao) => {
    const estaAtivo = paginaAtual === linkNavegacao.identificador;
    return <Pressable key={linkNavegacao.identificador} style={styles.link} onPress={() => aoMudar(linkNavegacao.identificador)}>
      <Text style={[styles.icon, estaAtivo && styles.active]}>{linkNavegacao.icone}</Text>
      <Text style={[styles.label, estaAtivo && styles.active]}>{linkNavegacao.rotulo}</Text>
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
