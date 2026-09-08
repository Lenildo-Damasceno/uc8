import { StyleSheet, Text } from 'react-native';

export default function BemVindo({ usuario }) {
  return <Text style={styles.titulo}>Bem-vindo, {usuario}!</Text>;
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
