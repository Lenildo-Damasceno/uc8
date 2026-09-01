import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Preenche o e-mail recebido da tela de cadastro.
  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.email]);

  function entrar() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    navigation.replace('Inicial', {
      nome: route.params?.nome || email.split('@')[0],
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Entrar</Text>

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

      <Pressable style={styles.botao} onPress={entrar}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Ainda não tenho cadastro</Text>
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
  link: { color: '#2563EB', fontSize: 16, marginTop: 22, textAlign: 'center' },
});
