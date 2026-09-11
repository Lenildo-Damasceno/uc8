import { Button, Text, View } from 'react-native';
import BemVindo from '../components/BemVindo';
import useAuth from '../context/authContext';

export default function Inicio() {
  const { sair } = useAuth();

  return (
    <View>
      <BemVindo />
      <Text>Atendimento médico com cuidado e qualidade.</Text>
      <Text>Horário: segunda a sexta, das 8h às 18h.</Text>
      <Text>Especialidades: Clínica Geral, Cardiologia e Pediatria.</Text>
      <Button title="Sair" onPress={() => sair()} />
    </View>
  );
}
