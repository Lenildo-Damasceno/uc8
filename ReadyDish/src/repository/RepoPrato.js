import { abrirDB } from '../database/database';

// Busca os pratos gravados no SQLite; getAllAsync devolve todas as linhas.
export async function listarPratos() {
  const db = await abrirDB();

  const pratos = await db.getAllAsync(
    `SELECT id, nome, descricao, preco, categoria, emoji, destaque
     FROM pratos
     ORDER BY destaque DESC, nome ASC`
  );

  // SQLite guarda destaque como 0 ou 1; a interface usa false ou true.
  return pratos.map((prato) => ({
    ...prato,
    destaque: Boolean(prato.destaque),
  }));
}

// Recebe os dados do formulario e grava um novo registro na tabela pratos.
export async function inserirPrato(prato) {
  const db = await abrirDB();
  const nomeTratado = prato.nome.trim();
  const descricaoTratada = prato.descricao.trim();
  const categoriaTratada = prato.categoria.trim();
  const emojiTratado = prato.emoji.trim() || '🍽️';
  const destaqueTratado = prato.destaque ? 1 : 0;
  const precoTratado = Number(String(prato.preco).replace(',', '.'));

  // Os ? recebem os valores abaixo, na ordem das colunas, sem montar SQL com texto do usuario.
  const resultado = await db.runAsync(
    `INSERT INTO pratos (nome, descricao, preco, categoria, emoji, destaque)
     VALUES (?, ?, ?, ?, ?, ?)`,
    nomeTratado,
    descricaoTratada,
    precoTratado,
    categoriaTratada,
    emojiTratado,
    destaqueTratado
  );

  // O banco gera o id automaticamente; ele vem em lastInsertRowId.
  return {
    id: resultado.lastInsertRowId,
    nome: nomeTratado,
    descricao: descricaoTratada,
    preco: precoTratado,
    categoria: categoriaTratada,
    emoji: emojiTratado,
    destaque: Boolean(destaqueTratado),
  };
}

// Atualiza apenas o prato identificado pelo id.
export async function editarPrato(id, prato) {
  const db = await abrirDB();
  const nomeTratado = prato.nome.trim();
  const descricaoTratada = prato.descricao.trim();
  const categoriaTratada = prato.categoria.trim();
  const emojiTratado = prato.emoji.trim() || '🍽️';
  const destaqueTratado = prato.destaque ? 1 : 0;
  const precoTratado = Number(String(prato.preco).replace(',', '.'));

  await db.runAsync(
    `UPDATE pratos
     SET nome = ?, descricao = ?, preco = ?, categoria = ?, emoji = ?, destaque = ?
     WHERE id = ?`,
    nomeTratado,
    descricaoTratada,
    precoTratado,
    categoriaTratada,
    emojiTratado,
    destaqueTratado,
    id
  );

  return {
    id,
    nome: nomeTratado,
    descricao: descricaoTratada,
    preco: precoTratado,
    categoria: categoriaTratada,
    emoji: emojiTratado,
    destaque: Boolean(destaqueTratado),
  };
}

// Remove do banco apenas o registro com este id.
export async function deletarPrato(id) {
  const db = await abrirDB();

  await db.runAsync(
    `DELETE FROM pratos
     WHERE id = ?`,
    id
  );
}
