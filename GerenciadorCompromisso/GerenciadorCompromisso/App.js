// Importa o hook usado para guardar as tarefas e controlar a página atual.
import { useState } from 'react';

// Importa as duas páginas simples do aplicativo.
import Tarefas from './src/screens/tarefas';
import AddTarefa from './src/screens/addtarefa';

// Este componente centraliza o array de tarefas para as duas páginas usarem os mesmos dados.
export default function App() {
  // Guarda qual página deve aparecer: lista ou formulário.
  const [pagina, setPagina] = useState('tarefas');

  // Guarda as tarefas somente na memória enquanto o aplicativo estiver aberto.
  const [tarefas, setTarefas] = useState([]);

  // Adiciona uma nova tarefa no fim do array.
  function salvarTarefa(novaTarefa) {
    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
    setPagina('tarefas');
  }

  // Mostra a tela de formulário quando o usuário toca em adicionar.
  if (pagina === 'adicionar') {
    return <AddTarefa aoSalvar={salvarTarefa} aoVoltar={() => setPagina('tarefas')} />;
  }

  // Mostra a tela inicial com a lista de tarefas.
  return <Tarefas tarefas={tarefas} aoAdicionar={() => setPagina('adicionar')} />;
}
