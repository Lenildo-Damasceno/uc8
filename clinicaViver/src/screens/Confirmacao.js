import { Button, Text, View } from 'react-native';

export default function Confirmacao({ route, navigation, adicionarAgendamento }) {
  const { especialidade, medico, data, hora } = route.params;

  function confirmar() {
    adicionarAgendamento({ especialidade, medico, data, hora });
    navigation.navigate('Abas', { screen: 'Agendamentos' });
  }

  return (
    <View>
      <Text>Confira os dados da consulta</Text>
      <Text>Especialidade: {especialidade}</Text>
      <Text>Médico: {medico}</Text>
      <Text>Data: {data}</Text>
      <Text>Hora: {hora}</Text>
      <Button title="Confirmar agendamento" onPress={confirmar} />
      <Button title="Voltar e alterar" onPress={() => navigation.goBack()} />
    </View>
  );
}
