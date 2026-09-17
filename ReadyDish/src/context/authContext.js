import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { inserirUsuario, buscarUsuarioPorEmailESenha } from '../repository/RepoUsuario';

const CHAVE_SESSAO = '@readyDish:sessao';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function restaurarSessao() {
      try {
        const sessao = await AsyncStorage.getItem(CHAVE_SESSAO);
        if (sessao) setUser(JSON.parse(sessao));
      } catch (erro) {
        console.error('Não foi possível restaurar a sessão:', erro);
      } finally {
        setCarregando(false);
      }
    }
    restaurarSessao();
  }, []);

  async function cadastrar(nome, email, senha) {
    try {
      const usuario = await inserirUsuario(nome, email, senha);
      await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
      setUser(usuario);
    } catch (erro) {
      if (/UNIQUE|constraint/i.test(erro.message)) {
        throw new Error('Este e-mail já está cadastrado.');
      }
      throw erro;
    }
  }

  async function entrar(email, senha) {
    const usuario = await buscarUsuarioPorEmailESenha(email, senha);
    if (!usuario) throw new Error('E-mail ou senha inválidos.');
    await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
    setUser(usuario);
  }

  async function sair() {
    await AsyncStorage.removeItem(CHAVE_SESSAO);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, carregando, cadastrar, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return contexto;
}
