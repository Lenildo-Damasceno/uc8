import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import useAuth from '../context/authContext';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const { cadastrar: criarConta } = useAuth();

  async function cadastrar() {
    if (!nome.trim() || !email.trim() || !senha || !confirmacaoSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Atenção', 'Digite um e-mail válido.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmacaoSenha) {
      Alert.alert('Atenção', 'As senhas não são iguais.');
      return;
    }

    try {
      await criarConta(nome, email, senha);
    } catch (erro) {
      Alert.alert('Não foi possível cadastrar', erro.message);
    }
  }

  return (
    <View>
      <Text>Crie sua conta</Text>

      <Text>Nome</Text>
      <TextInput
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />

      <Text>E-mail</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Senha</Text>
      <TextInput
        placeholder="Crie uma senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Text>Confirme a senha</Text>
      <TextInput
        placeholder="Digite a senha novamente"
        value={confirmacaoSenha}
        onChangeText={setConfirmacaoSenha}
        secureTextEntry
      />

      <Button title="Cadastrar" onPress={cadastrar} />
      <Button title="Já tenho uma conta" onPress={() => navigation.goBack()} />
    </View>
  );
}
