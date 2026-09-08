import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

export default function NovoAgendamento({ navigation }) {
  const [especialidade, setEspecialidade] = useState('');
  const [medico, setMedico] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  function avancar() {
    if (!especialidade || !medico || !data || !hora) {
      Alert.alert('Atenção', 'Preencha todos os dados do agendamento.');
      return;
    }
    navigation.navigate('Confirmacao', { especialidade, medico, data, hora });
  }

  return (
    <View>
      <Text>Selecione uma especialidade</Text>
      <Button title="Clínica Geral" onPress={() => setEspecialidade('Clínica Geral')} />
      <Button title="Cardiologia" onPress={() => setEspecialidade('Cardiologia')} />
      <Button title="Pediatria" onPress={() => setEspecialidade('Pediatria')} />
      <Text>Selecionada: {especialidade || 'nenhuma'}</Text>

      <Text>Selecione um médico</Text>
      <Button title="Dra. Ana" onPress={() => setMedico('Dra. Ana')} />
      <Button title="Dr. Carlos" onPress={() => setMedico('Dr. Carlos')} />
      <Button title="Dra. Beatriz" onPress={() => setMedico('Dra. Beatriz')} />
      <Text>Selecionado: {medico || 'nenhum'}</Text>

      <Text>Data</Text>
      <TextInput placeholder="Exemplo: 15/09/2026" value={data} onChangeText={setData} />
      <Text>Hora</Text>
      <TextInput placeholder="Exemplo: 14:30" value={hora} onChangeText={setHora} />
      <Button title="Avançar" onPress={avancar} />
    </View>
  );
}
