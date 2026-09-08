import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screens/Login';
import Inicio from './src/screens/Inicio';
import Agendamentos from './src/screens/Agendamentos';
import NovoAgendamento from './src/screens/NovoAgendamento';
import Confirmacao from './src/screens/Confirmacao';
import Contato from './src/screens/Contato';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AbasPrincipais({ agendamentos, usuario }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" options={{ title: 'Início' }}>
        {(props) => <Inicio {...props} usuario={usuario} />}
      </Tab.Screen>
      <Tab.Screen name="Agendamentos">
        {(props) => <Agendamentos {...props} agendamentos={agendamentos} />}
      </Tab.Screen>
      <Tab.Screen name="Contato" component={Contato} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [usuario, setUsuario] = useState('');

  function adicionarAgendamento(novoAgendamento) {
    setAgendamentos((listaAtual) => [...listaAtual, novoAgendamento]);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {(props) => <Login {...props} onEntrar={setUsuario} />}
        </Stack.Screen>
        <Stack.Screen name="Abas" options={{ headerShown: false }}>
          {(props) => (
            <AbasPrincipais {...props} agendamentos={agendamentos} usuario={usuario} />
          )}
        </Stack.Screen>
        <Stack.Screen name="NovoAgendamento" component={NovoAgendamento} options={{ title: 'Novo agendamento' }} />
        <Stack.Screen name="Confirmacao" options={{ title: 'Confirmação' }}>
          {(props) => <Confirmacao {...props} adicionarAgendamento={adicionarAgendamento} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
