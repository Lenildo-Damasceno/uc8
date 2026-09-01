import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Inicial({ navigation, route }) {
  // O nome chega do Login por meio de route.params.
  const nome = route.params?.nome || 'Usuário';

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, {nome}!</Text>
      <Text style={styles.subtitulo}>Bem-vindo ao Gerenciador de Compromissos.</Text>

      <Pressable style={styles.botao} onPress={() => navigation.navigate('Tarefas')}>
        <Text style={styles.textoBotao}>Ver minhas tarefas</Text>
      </Pressable>

      <Pressable onPress={() => navigation.replace('Login')}>
        <Text style={styles.sair}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#F8FAFC', padding: 24 },
  titulo: { color: '#0F172A', fontSize: 30, fontWeight: '700', marginBottom: 10 },
  subtitulo: { color: '#475569', fontSize: 16, marginBottom: 32 },
  botao: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 10, padding: 16 },
  textoBotao: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  sair: { color: '#DC2626', fontSize: 16, marginTop: 22, textAlign: 'center' },
});
