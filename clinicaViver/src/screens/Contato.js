import { Alert, Button, Linking, Text, View } from 'react-native';

export default function Contato() {
  async function abrirLink(url) {
    const podeAbrir = await Linking.canOpenURL(url);
    if (podeAbrir) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Erro', 'Não foi possível abrir este contato.');
    }
  }

  return (
    <View>
      <Text>Contato da Clínica Viver</Text>
      <Text>WhatsApp: (84) 99999-9999</Text>
      <Button title="Abrir WhatsApp" onPress={() => abrirLink('https://wa.me/5584999999999')} />
      <Text>E-mail: contato@clinicaviver.com</Text>
      <Button title="Enviar e-mail" onPress={() => abrirLink('mailto:contato@clinicaviver.com')} />
      <Text>Telefone: (84) 3333-3333</Text>
      <Button title="Ligar" onPress={() => abrirLink('tel:+558433333333')} />
    </View>
  );
}
