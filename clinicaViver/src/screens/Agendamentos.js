import { Button, Text, View } from 'react-native';

export default function Agendamentos({ navigation, agendamentos }) {

  return (
    <View>
      <Text>Meus agendamentos</Text>
      {agendamentos.length === 0 && <Text>Nenhum agendamento realizado.</Text>} 
      {agendamentos.map((agendamento, indice) => (
        <View key={`${agendamento.data}-${agendamento.hora}-${indice}`}>
          <Text>Consulta {indice + 1}</Text>
          <Text>Especialidade: {agendamento.especialidade}</Text>
          <Text>Médico: {agendamento.medico}</Text>
          <Text>Data: {agendamento.data}</Text>
          <Text>Hora: {agendamento.hora}</Text>
        </View>
      ))}
      <Button title="Fazer novo agendamento" onPress={() => navigation.navigate('NovoAgendamento')} />
    </View>
  );
}
