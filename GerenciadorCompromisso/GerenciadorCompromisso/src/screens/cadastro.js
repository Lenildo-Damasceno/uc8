import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function cadastrar() {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    // Envia nome e e-mail para a tela de login por route.params.
    navigation.navigate('Login', {
      nome: nome.trim(),
      email: email.trim(),
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar conta</Text>

      <TextInput onChangeText={setNome} placeholder="Nome" style={styles.input} value={nome} />
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="E-mail"
        style={styles.input}
        value={email}
      />
      <TextInput
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
      />

      <Pressable style={styles.botao} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#F8FAFC', padding: 24 },
  titulo: { color: '#0F172A', fontSize: 32, fontWeight: '700', marginBottom: 30 },
  input: { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: 10, borderWidth: 1, fontSize: 16, marginBottom: 14, padding: 14 },
  botao: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 10, padding: 16 },
  textoBotao: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
