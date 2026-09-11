import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_SESSAO = '@clinicaViver:sessao';
const CHAVE_CONTAS = '@clinicaViver:contas';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function restaurarSessao() {
      try {
        const sessaoSalva = await AsyncStorage.getItem(CHAVE_SESSAO);
        if (sessaoSalva) setUser(JSON.parse(sessaoSalva));
      } catch (erro) {
        console.error('Não foi possível restaurar a sessão.', erro);
      } finally {
        setCarregando(false);
      }
    }

    restaurarSessao();
  }, []);

  async function cadastrar(nome, email, senha) {
    const emailNormalizado = email.trim().toLowerCase();
    const contasSalvas = await AsyncStorage.getItem(CHAVE_CONTAS);
    const contas = contasSalvas ? JSON.parse(contasSalvas) : [];

    if (contas.some((conta) => conta.email === emailNormalizado)) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const novaConta = { nome: nome.trim(), email: emailNormalizado, senha };
    const sessao = { nome: novaConta.nome, email: novaConta.email };

    await AsyncStorage.setItem(CHAVE_CONTAS, JSON.stringify([...contas, novaConta]));
    await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
    setUser(sessao);
  }

  async function entrar(email, senha) {
    const emailNormalizado = email.trim().toLowerCase();
    const contasSalvas = await AsyncStorage.getItem(CHAVE_CONTAS);
    const contas = contasSalvas ? JSON.parse(contasSalvas) : [];
    const conta = contas.find(
      (item) => item.email === emailNormalizado && item.senha === senha,
    );

    if (!conta) {
      throw new Error('E-mail ou senha inválidos.');
    }

    const sessao = { nome: conta.nome, email: conta.email };
    await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
    setUser(sessao);
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

  if (!contexto) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return contexto;
}
