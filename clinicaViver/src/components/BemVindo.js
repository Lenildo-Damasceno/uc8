import { StyleSheet, Text } from 'react-native';
import useAuth from '../context/authContext';

export default function BemVindo() {
  const { user } = useAuth();

  return <Text style={styles.titulo}>Bem-vindo, {user?.nome}!</Text>;
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
