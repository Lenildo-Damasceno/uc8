// Importa os hooks pedidos para controlar os campos e atualizar a data formatada.
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Recebe as funções para salvar a tarefa e voltar para a lista.
export default function AddTarefa({ aoSalvar, aoVoltar }) {
  // Guarda o texto digitado no campo nome.
  const [nome, setNome] = useState('');

  // Guarda o objeto Date selecionado no calendário.
  const [dataVencimento, setDataVencimento] = useState(new Date());

  // Controla se o calendário deve aparecer na tela.
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  // Guarda a prioridade escolhida pelo usuário.
  const [prioridade, setPrioridade] = useState('Baixa');

  // Guarda a data pronta para ser mostrada e salva na tarefa.
  const [dataFormatada, setDataFormatada] = useState('');

  // Sempre que dataVencimento mudar, atualiza a data no formato brasileiro.
  useEffect(() => {
    setDataFormatada(dataVencimento.toLocaleDateString('pt-BR'));
  }, [dataVencimento]);

  // Recebe a nova data escolhida no calendário.
  function escolherData(evento, dataEscolhida) {
    setMostrarCalendario(false);

    // Quando o usuário confirma uma data, atualiza o estado.
    if (dataEscolhida) {
      setDataVencimento(dataEscolhida);
    }
  }

  // Cria o objeto simples da tarefa e envia para a página principal.
  function salvar() {
    if (!nome.trim()) {
      Alert.alert('Campo obrigatório', 'Digite o nome da tarefa.');
      return;
    }

    aoSalvar({
      id: Date.now().toString(),
      nome: nome.trim(),
      data: dataFormatada,
      prioridade,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova tarefa</Text>

      <Text style={styles.label}>Nome da tarefa</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Ex.: Fazer atividade"
        style={styles.input}
      />

      <Text style={styles.label}>Data de vencimento</Text>
      <Pressable style={styles.campoData} onPress={() => setMostrarCalendario(true)}>
        <Text>{dataFormatada}</Text>
      </Pressable>

      {/* O calendário aparece somente quando o usuário tocar no campo de data. */}
      {mostrarCalendario && (
        <DateTimePicker value={dataVencimento} mode="date" onChange={escolherData} />
      )}

      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.prioridades}>
        {['Baixa', 'Média', 'Alta'].map((opcao) => (
          <Pressable
            key={opcao}
            onPress={() => setPrioridade(opcao)}
            style={[styles.opcao, prioridade === opcao && styles.opcaoSelecionada]}
          >
            <Text style={prioridade === opcao && styles.textoSelecionado}>{opcao}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.botaoSalvar} onPress={salvar}>
        <Text style={styles.textoBotao}>Salvar tarefa</Text>
      </Pressable>

      <Pressable style={styles.botaoVoltar} onPress={aoVoltar}>
        <Text style={styles.textoVoltar}>Cancelar</Text>
      </Pressable>
    </View>
  );
}








// Estilos simples usados somente nesta página.
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 24, paddingTop: 70 },
  titulo: { color: '#0F172A', fontSize: 28, fontWeight: '700', marginBottom: 30 },
  label: { color: '#334155', fontSize: 16, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: 10, borderWidth: 1, fontSize: 16, padding: 14 },
  campoData: { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: 10, borderWidth: 1, padding: 14 },
  prioridades: { flexDirection: 'row', gap: 8 },
  opcao: { backgroundColor: '#E2E8F0', borderRadius: 8, flex: 1, padding: 12, alignItems: 'center' },
  opcaoSelecionada: { backgroundColor: '#2563EB' },
  textoSelecionado: { color: '#FFFFFF', fontWeight: '700' },
  botaoSalvar: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 10, marginTop: 32, padding: 16 },
  textoBotao: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  botaoVoltar: { alignItems: 'center', marginTop: 16, padding: 12 },
  textoVoltar: { color: '#2563EB', fontSize: 16 },
});
