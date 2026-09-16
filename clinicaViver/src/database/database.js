import * as SQLite from 'expo-sqlite';

const NOME_BANCO = 'clinicaViver.db';
let promessaBanco;

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
  } catch (erro) {
    console.error('Erro ao criar tabelas:', erro);
    throw erro;
  }
}



async function abrirDB() {
  if (!promessaBanco) {
    promessaBanco = (async () => {
      const db = await SQLite.openDatabaseAsync(NOME_BANCO);
      await db.execAsync('PRAGMA journal_mode = WAL;');
      await criarTabelas(db);

      console.log('Banco de dados aberto:', db.databasePath);
      return db;
    })().catch((erro) => {
      // Permite tentar inicializar novamente caso a primeira abertura falhe.
      promessaBanco = undefined;
      throw erro;
    });
  }

  return promessaBanco;
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

export { abrirDB, criarTabelas, visualizarTabelas };
