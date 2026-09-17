import * as SQLite from 'expo-sqlite';

const NOME_BANCO = 'readyDish.db';
let promessaBanco;

async function criarTabelas(db) {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS pratos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT NOT NULL,
        preco REAL NOT NULL,
        categoria TEXT NOT NULL,
        emoji TEXT NOT NULL,
        destaque INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_cliente TEXT NOT NULL,
        itens TEXT NOT NULL,
        total REAL NOT NULL,
        status TEXT NOT NULL,
        criado_em TEXT NOT NULL
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