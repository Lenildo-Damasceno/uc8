import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import useAuth from '../context/authContext';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { entrar: autenticar } = useAuth();

  async function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    try {
      await autenticar(email, senha);
    } catch (erro) {
      Alert.alert('Não foi possível entrar', erro.message);
    }
  }

  return (
    <View>
      <Text>Clínica Viver</Text>
      <Text>Entre para acessar o aplicativo</Text>
      <Text>E-mail</Text>
      <TextInput placeholder="Digite seu e-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Text>Senha</Text>
      <TextInput placeholder="Digite sua senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Entrar" onPress={entrar} />
      <Button title="Cadastre-se" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
}
