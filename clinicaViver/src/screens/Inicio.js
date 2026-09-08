import { Button, Text, View } from 'react-native';
import BemVindo from '../components/BemVindo';

export default function Inicio({ navigation, usuario }) {
  return (
    <View>
      <BemVindo usuario={usuario} />
      <Text>Atendimento médico com cuidado e qualidade.</Text>
      <Text>Horário: segunda a sexta, das 8h às 18h.</Text>
      <Text>Especialidades: Clínica Geral, Cardiologia e Pediatria.</Text>
      <Button title="Sair" onPress={() => navigation.getParent()?.replace('Login')} />
    </View>
  );
}
