import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import Inicio from './src/screens/Inicio';
import Agendamentos from './src/screens/Agendamentos';
import NovoAgendamento from './src/screens/NovoAgendamento';
import Confirmacao from './src/screens/Confirmacao';
import Contato from './src/screens/Contato';
import useAuth, { AuthProvider } from './src/context/authContext';
import {
  abrirDB,
  visualizarTabelas,
} from './src/database/database';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AbasPrincipais({ agendamentos }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={Inicio} options={{ title: 'Início' }} />
      <Tab.Screen name="Agendamentos">
        {(props) => <Agendamentos {...props} agendamentos={agendamentos} />}
      </Tab.Screen>
      <Tab.Screen name="Contato" component={Contato} />
    </Tab.Navigator>
  );
}

function Rotas() {
  const [agendamentos, setAgendamentos] = useState([]);
  const { user, carregando } = useAuth();

  function adicionarAgendamento(novoAgendamento) {
    setAgendamentos((listaAtual) => [...listaAtual, novoAgendamento]);
  }

  if (carregando) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Criar conta' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Abas" options={{ headerShown: false }}>
              {(props) => <AbasPrincipais {...props} agendamentos={agendamentos} />}
            </Stack.Screen>
            <Stack.Screen
              name="NovoAgendamento"
              component={NovoAgendamento}
              options={{ title: 'Novo agendamento' }}
            />
            <Stack.Screen name="Confirmacao" options={{ title: 'Confirmação' }}>
              {(props) => (
                <Confirmacao {...props} adicionarAgendamento={adicionarAgendamento} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    async function inicializarBanco() {
      try {
        const db = await abrirDB();
        await visualizarTabelas(db);
      } catch (erro) {
        console.error('Erro ao abrir o banco de dados:', erro);
      }
    }

    inicializarBanco();
  }, []);

  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
}
