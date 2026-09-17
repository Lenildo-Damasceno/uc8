import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { deletarPrato, editarPrato, inserirPrato, listarPratos } from '../repository/RepoPrato';

const estadoInicial = {
  id: null,
  nome: '',
  descricao: '',
  preco: '',
  categoria: '',
  emoji: '🍽️',
  destaque: false,
};

export default function GerenciarPratos({ aoVoltar, aoAtualizarCardapio }) {
  const [pratos, definirPratos] = useState([]);
  const [formulario, definirFormulario] = useState(estadoInicial);
  const [salvando, definirSalvando] = useState(false);

  async function carregarPratos() {
    const dados = await listarPratos();
    definirPratos(dados);
    if (aoAtualizarCardapio) {
      aoAtualizarCardapio(dados);
    }
  }

  useEffect(() => {
    carregarPratos().catch((erro) => console.error('Erro ao carregar pratos:', erro));
  }, []);

  function atualizarCampo(campo, valor) {
    definirFormulario((atual) => ({ ...atual, [campo]: valor }));
  }

  function iniciarEdicao(prato) {
    definirFormulario({
      id: prato.id,
      nome: prato.nome,
      descricao: prato.descricao,
      preco: String(prato.preco),
      categoria: prato.categoria,
      emoji: prato.emoji,
      destaque: prato.destaque,
    });
  }

  function limparFormulario() {
    definirFormulario(estadoInicial);
  }

  async function salvarPrato() {
    if (!formulario.nome.trim() || !formulario.descricao.trim() || !formulario.preco.trim() || !formulario.categoria.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, descrição, preço e categoria.');
      return;
    }

    try {
      definirSalvando(true);

      if (formulario.id) {
        await editarPrato(formulario.id, formulario);
      } else {
        await inserirPrato(formulario);
      }

      await carregarPratos();
      limparFormulario();
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar o prato.');
      console.error('Erro ao salvar prato:', erro);
    } finally {
      definirSalvando(false);
    }
  }

  function confirmarExclusao(prato) {
    Alert.alert('Excluir prato', `Deseja apagar ${prato.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletarPrato(prato.id);
            await carregarPratos();
            if (formulario.id === prato.id) {
              limparFormulario();
            }
          } catch (erro) {
            Alert.alert('Erro', 'Não foi possível excluir o prato.');
            console.error('Erro ao excluir prato:', erro);
          }
        },
      },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.topo}>
        <View>
          <Text style={styles.eyebrow}>GESTÃO DO CARDÁPIO</Text>
          <Text style={styles.title}>Pratos do restaurante</Text>
        </View>
        <Pressable style={styles.secondaryButton} onPress={aoVoltar}>
          <Text style={styles.secondaryText}>Voltar</Text>
        </Pressable>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>{formulario.id ? 'Editar prato' : 'Novo prato'}</Text>

        <TextInput style={styles.input} placeholder="Nome do prato" placeholderTextColor="#9B8D83" value={formulario.nome} onChangeText={(valor) => atualizarCampo('nome', valor)} />
        <TextInput style={styles.input} placeholder="Descrição" placeholderTextColor="#9B8D83" value={formulario.descricao} onChangeText={(valor) => atualizarCampo('descricao', valor)} multiline />
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.flex]} placeholder="Preço" placeholderTextColor="#9B8D83" keyboardType="decimal-pad" value={formulario.preco} onChangeText={(valor) => atualizarCampo('preco', valor)} />
          <TextInput style={[styles.input, styles.flex]} placeholder="Categoria" placeholderTextColor="#9B8D83" value={formulario.categoria} onChangeText={(valor) => atualizarCampo('categoria', valor)} />
        </View>
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.flex]} placeholder="Emoji" placeholderTextColor="#9B8D83" value={formulario.emoji} onChangeText={(valor) => atualizarCampo('emoji', valor)} />
          <View style={styles.switchBox}>
            <Text style={styles.switchLabel}>Destaque</Text>
            <Switch value={formulario.destaque} onValueChange={(valor) => atualizarCampo('destaque', valor)} trackColor={{ false: '#D7C8B9', true: '#25352D' }} thumbColor="#FFF" />
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={salvarPrato} disabled={salvando}>
            <Text style={styles.primaryText}>{salvando ? 'Salvando...' : formulario.id ? 'Salvar edição' : 'Adicionar prato'}</Text>
          </Pressable>
          {formulario.id && (
            <Pressable style={styles.clearButton} onPress={limparFormulario}>
              <Text style={styles.clearText}>Cancelar edição</Text>
            </Pressable>
          )}
        </View>
      </View>

      <Text style={styles.listTitle}>Pratos cadastrados</Text>
      {pratos.map((prato) => (
        <View key={prato.id} style={styles.itemCard}>
          <View style={styles.itemTop}>
            <Text style={styles.itemEmoji}>{prato.emoji}</Text>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{prato.nome}</Text>
              <Text style={styles.itemDescription}>{prato.descricao}</Text>
              <Text style={styles.itemMeta}>{prato.categoria} • R$ {Number(prato.preco).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.itemActions}>
            <Pressable style={styles.editButton} onPress={() => iniciarEdicao(prato)}>
              <Text style={styles.editText}>Editar</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={() => confirmarExclusao(prato)}>
              <Text style={styles.deleteText}>Deletar</Text>
            </Pressable>
          </View>
        </View>
      ))}

      {!pratos.length && <Text style={styles.empty}>Nenhum prato cadastrado ainda.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 32 },
  topo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  eyebrow: { color: '#D94F30', fontSize: 11, fontWeight: '800', letterSpacing: 1.3 },
  title: { color: '#312923', fontSize: 25, fontWeight: '800', marginTop: 4 },
  secondaryButton: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EADFD4', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  secondaryText: { color: '#312923', fontWeight: '700' },
  formCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#F1E6DA', marginBottom: 22 },
  formTitle: { color: '#312923', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  input: { backgroundColor: '#FFF9F2', borderWidth: 1, borderColor: '#EADFD4', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, color: '#312923', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 10 },
  flex: { flex: 1 },
  switchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF9F2', borderWidth: 1, borderColor: '#EADFD4', borderRadius: 14, paddingHorizontal: 14, marginBottom: 10 },
  switchLabel: { color: '#312923', fontWeight: '700' },
  actions: { marginTop: 4, gap: 10 },
  primaryButton: { backgroundColor: '#D94F30', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  primaryText: { color: '#FFF', fontWeight: '800' },
  clearButton: { backgroundColor: '#FFF0E7', paddingVertical: 13, borderRadius: 14, alignItems: 'center' },
  clearText: { color: '#D94F30', fontWeight: '800' },
  listTitle: { color: '#312923', fontSize: 20, fontWeight: '800', marginBottom: 12 },
  itemCard: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F1E6DA', borderRadius: 18, padding: 14, marginBottom: 12 },
  itemTop: { flexDirection: 'row', gap: 12 },
  itemEmoji: { fontSize: 34, width: 44, textAlign: 'center' },
  itemInfo: { flex: 1 },
  itemName: { color: '#312923', fontSize: 16, fontWeight: '800' },
  itemDescription: { color: '#75675D', marginTop: 4, lineHeight: 18 },
  itemMeta: { color: '#D94F30', marginTop: 8, fontWeight: '700' },
  itemActions: { flexDirection: 'row', gap: 10, marginTop: 14 },
  editButton: { flex: 1, backgroundColor: '#25352D', paddingVertical: 11, borderRadius: 12, alignItems: 'center' },
  editText: { color: '#FFF', fontWeight: '800' },
  deleteButton: { flex: 1, backgroundColor: '#FDEBE7', paddingVertical: 11, borderRadius: 12, alignItems: 'center' },
  deleteText: { color: '#D94F30', fontWeight: '800' },
  empty: { textAlign: 'center', color: '#75675D', marginTop: 18 },
});