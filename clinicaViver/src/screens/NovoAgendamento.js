import { useState } from 'react';
import { Alert, Button, Platform, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NovoAgendamento({ navigation }) {
  const [especialidade, setEspecialidade] = useState('');
  const [medico, setMedico] = useState('');
  const [data, setData] = useState(null);
  const [hora, setHora] = useState(null);
  const [seletorAberto, setSeletorAberto] = useState(null);

  const dataFormatada = data?.toLocaleDateString('pt-BR') ?? '';
  const horaFormatada = hora?.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }) ?? '';

  function alterarDataHora(_event, valorSelecionado) {
    if (Platform.OS === 'android') setSeletorAberto(null);
    if (!valorSelecionado) return;

    if (seletorAberto === 'date') {
      setData(valorSelecionado);
    } else {
      setHora(valorSelecionado);
    }
  }

  function avancar() {
    if (!especialidade || !medico || !data || !hora) {
      Alert.alert('Atenção', 'Preencha todos os dados do agendamento.');
      return;
    }

    navigation.navigate('Confirmacao', {
      especialidade,
      medico,
      data: dataFormatada,
      hora: horaFormatada,
    });
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
      <Button title={dataFormatada || 'Selecionar data'} onPress={() => setSeletorAberto('date')} />

      <Text>Hora</Text>
      <Button title={horaFormatada || 'Selecionar hora'} onPress={() => setSeletorAberto('time')} />

      {seletorAberto && (
        <DateTimePicker
          value={(seletorAberto === 'date' ? data : hora) ?? new Date()}
          mode={seletorAberto}
          display="default"
          minimumDate={seletorAberto === 'date' ? new Date() : undefined}
          is24Hour
          onValueChange={alterarDataHora}
          onDismiss={() => setSeletorAberto(null)}
        />
      )}

      {seletorAberto && Platform.OS === 'ios' && (
        <Button title="Concluir" onPress={() => setSeletorAberto(null)} />
      )}

      <Button title="Avançar" onPress={avancar} />
    </View>
  );
}
