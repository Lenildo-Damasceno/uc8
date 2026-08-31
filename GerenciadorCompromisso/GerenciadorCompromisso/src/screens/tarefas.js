import { FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';





// Recebe o array de tarefas e a função que abre a página de cadastro.
export default function Tarefas({ tarefas, aoAdicionar }) {
  // Desenha uma tarefa por vez dentro da FlatList.
  function renderizarTarefa({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>Vencimento: {item.data}</Text>
        <Text>Prioridade: {item.prioridade}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.titulo}>Minhas Tarefas</Text>

      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://www.youtube.com/@ministerioshekinahof')}
      >
        Abrir canal no YouTube
      </Text>

      {/* A FlatList exibe os dados guardados no array tarefas. */}
      <FlatList
        data={tarefas}
        renderItem={renderizarTarefa}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa cadastrada.</Text>}
        contentContainerStyle={tarefas.length === 0 ? styles.listaVazia : styles.lista}
      />





      {/* Ao tocar, chama a função recebida do App para trocar de página. */}
      <Pressable style={styles.botao} onPress={aoAdicionar}>
        <Text style={styles.textoBotao}>Adicionar nova tarefa</Text>
      </Pressable>
    </View>
  );
}









// Estilos simples usados somente nesta página.
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1188ff', padding: 24, paddingTop: 70 },
  titulo: { color: '#f6eff8', fontSize: 28, fontWeight: '700', marginBottom: 24 },
  link: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 16, textDecorationLine: 'underline' },
  lista: { paddingBottom: 12 },
  listaVazia: { flexGrow: 1, justifyContent: 'center' },
  vazio: { color: '#000000', fontSize: 16, textAlign: 'center' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 10, marginBottom: 12, padding: 16 },
  nome: { color: '#0F172A', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  botao: { alignItems: 'center', backgroundColor: '#fafafa', borderRadius: 10, padding: 16 },
  textoBotao: { color: '#0c0b0b', fontSize: 16, fontWeight: '700' },
});
