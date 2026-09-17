import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import useAuth from '../context/authContext';

export default function Acesso() {
  const [cadastro, setCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { entrar, cadastrar } = useAuth();

  async function enviar() {
    if (!email.trim() || !senha || (cadastro && (!nome.trim() || !confirmacao))) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (cadastro && !email.includes('@')) {
      Alert.alert('Atenção', 'Digite um e-mail válido.');
      return;
    }
    if (cadastro && senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (cadastro && senha !== confirmacao) {
      Alert.alert('Atenção', 'As senhas não são iguais.');
      return;
    }
    try {
      setEnviando(true);
      if (cadastro) await cadastrar(nome, email, senha);
      else await entrar(email, senha);
    } catch (erro) {
      Alert.alert('Não foi possível continuar', erro.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ReadyDish</Text>
      <Text style={styles.subtitulo}>{cadastro ? 'Crie sua conta' : 'Entre para acessar o aplicativo'}</Text>
      {cadastro && <TextInput style={styles.campo} placeholder="Nome" value={nome} onChangeText={setNome} autoCapitalize="words" />}
      <TextInput style={styles.campo} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.campo} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      {cadastro && <TextInput style={styles.campo} placeholder="Confirme a senha" value={confirmacao} onChangeText={setConfirmacao} secureTextEntry />}
      <Pressable style={styles.botao} onPress={enviar} disabled={enviando}>
        <Text style={styles.textoBotao}>{cadastro ? 'Cadastrar' : 'Entrar'}</Text>
      </Pressable>
      <Pressable onPress={() => setCadastro(!cadastro)}>
        <Text style={styles.alternar}>{cadastro ? 'Já tenho uma conta' : 'Cadastre-se'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#FFF9F2' },
  titulo: { fontSize: 30, fontWeight: 'bold', color: '#25352D', marginBottom: 8 },
  subtitulo: { fontSize: 16, color: '#75675D', marginBottom: 24 },
  campo: { backgroundColor: '#FFF', borderColor: '#E7D8CA', borderWidth: 1, borderRadius: 10, padding: 14, marginBottom: 12 },
  botao: { backgroundColor: '#25352D', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
  alternar: { textAlign: 'center', color: '#25352D', marginTop: 20, fontWeight: 'bold' },
});
