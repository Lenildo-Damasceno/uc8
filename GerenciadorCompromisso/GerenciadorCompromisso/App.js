import { useState } from 'react';
import Tarefas from './src/screens/tarefas';
import AddTarefa from './src/screens/addtarefa';
import Login from './src/screens/login';
import Cadastro from './src/screens/cadastro';
import Inicial from './src/screens/inicial';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




const Stack = createBottomTabNavigator();
const Tab = createBottomTabNavigator(); 
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tarefas" component={Tarefas} />
      <Tab.Screen name="AddTarefa" component={AddTarefa} />
      <table.Screen name="inicial" component={Inicial} />
    </Tab.Navigator>
  );
}

const AppNavigator = ({ tarefas, aoSalvar }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Inicial" component={Inicial} options={{ title: 'Início' }} />

        <Stack.Screen name="Tarefas" options={{ title: 'Minhas tarefas' }}>
          {({ navigation }) => (
            <Tarefas
              tarefas={tarefas}
              aoAdicionar={() => navigation.navigate('AddTarefa')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddTarefa" options={{ title: 'Nova tarefa' }}>
          {({ navigation }) => (
            <AddTarefa
              aoSalvar={(novaTarefa) => {
                aoSalvar(novaTarefa);
                navigation.navigate('Tarefas');
              }}
              aoVoltar={() => navigation.goBack()}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}





// Este componente centraliza o array de tarefas para as duas páginas usarem os mesmos dados.
export default function App() {
  // Guarda qual página deve aparecer: lista ou formulário.
  // Guarda as tarefas somente na memória enquanto o aplicativo estiver aberto.
  const [tarefas, setTarefas] = useState([]);

  // Adiciona uma nova tarefa no fim do array.
  function salvarTarefa(novaTarefa) {
    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
  }

  return <AppNavigator tarefas={tarefas} aoSalvar={salvarTarefa} />;
}
