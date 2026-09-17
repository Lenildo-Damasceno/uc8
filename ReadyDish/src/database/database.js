import * as SQLite from 'expo-sqlite';

// Arquivo SQLite persistido no dispositivo pelo expo-sqlite.
const NOME_BANCO = 'readyDish.db';
// Reutiliza a mesma abertura do banco em chamadas simultaneas.
let promessaBanco;

// Cria as tabelas na primeira abertura; IF NOT EXISTS preserva os dados existentes.
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

      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
      );
    `);

    console.log('Tabelas criadas com sucesso');
  } catch (erro) {
    console.error('Erro ao criar tabelas:', erro);
    throw erro;
  }
}

// Abre o banco e garante que as tabelas existam antes de qualquer consulta.
async function abrirDB() {
  if (!promessaBanco) {
    promessaBanco = (async () => {
      const db = await SQLite.openDatabaseAsync(NOME_BANCO);
      // WAL permite leituras e escritas com menos bloqueios.
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

// Consulta as tabelas e imprime seus registros no console para depuracao.
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
      if (tabela.name === 'usuarios') continue;
      const nomeSeguro = tabela.name.replaceAll('"', '""');
      const dados = await db.getAllAsync(`SELECT * FROM "${nomeSeguro}"`);
      console.log(`Dados da tabela ${tabela.name}:`, dados);
    }
  } catch (erro) {
    console.error('Erro ao visualizar tabelas:', erro);
  }
}

export { abrirDB, criarTabelas, visualizarTabelas };
