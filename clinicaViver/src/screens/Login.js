import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

export default function Login({ navigation, onEntrar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    onEntrar(email.trim());
    navigation.replace('Abas');
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
    </View>
  );
}
