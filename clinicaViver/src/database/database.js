import * as SQLite from 'expo-sqlite';

async function criarTabelas(db) {
  try {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      data TEXT NOT NULL,
      hora TEXT NOT NULL,
      servico TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS contatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      mensagem TEXT NOT NULL
    );  
    CREATE TABLE IF NOT EXISTS historico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      data TEXT NOT NULL,
      hora TEXT NOT NULL,
      servico TEXT NOT NULL
    );  
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      mensagem TEXT NOT NULL
    );  
    CREATE TABLE IF NOT EXISTS notificacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      mensagem TEXT NOT NULL,
      data TEXT NOT NULL
    );  

    CREATE TABLE IF NOT EXISTS configuracoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tema TEXT NOT NULL,
      notificacoes INTEGER NOT NULL
    );  

    `);

    console.log('Tabelas criadas com sucesso');
    return true;
  } catch (erro) {
    console.error('Erro ao criar tabelas:', erro);
    return false;
  }
}



async function abrirDB() {
  const db = await SQLite.openDatabaseAsync('clinicaViver.db');
  console.log('Banco de dados aberto com sucesso');

  return db;
}

async function inserirUsuario(db, nome, email, senha) {
  try {
    const resultado = await db.runAsync(
      'INSERT OR IGNORE INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      nome,
      email,
      senha
    );

    if (resultado.changes > 0) {
      console.log('Usuário inserido com sucesso. ID:', resultado.lastInsertRowId);
    } else {
      console.log('Usuário não inserido: o e-mail já está cadastrado');
    }
  } catch (erro) {
    console.error('Erro ao inserir usuário:', erro);
  }
}

async function visualizarTabelas(db) {
  try {
    const tabelas = await db.getAllAsync(`
      SELECT name
      FROM sqlite_master
      WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `);

    console.log('Tabelas existentes:', tabelas.map((tabela) => tabela.name));

    for (const tabela of tabelas) {
      const nomeSeguro = tabela.name.replaceAll('"', '""');
      const dados = await db.getAllAsync(`SELECT * FROM "${nomeSeguro}"`);
      console.log(`Dados da tabela ${tabela.name}:`, dados);
    }
  } catch (erro) {
    console.error('Erro ao visualizar tabelas:', erro);
  }
}

export { abrirDB, criarTabelas, inserirUsuario, visualizarTabelas };
